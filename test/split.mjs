/**
 * Tests the release as it ships: the card built with English only, the editor
 * and the languages as files of their own.  Run with:  node test/split.mjs
 *
 * run.mjs tests the source, where everything is in one file. What only goes
 * wrong once it is split is tested here: a language that never arrives, an
 * editor missing one of the card's helpers, a cache that outlives a release.
 */
import { mkdtempSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { loadCard, markup, check, report } from './harness.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = mkdtempSync(join(tmpdir(), 'hac-split-'));
execFileSync(process.execPath, [join(HERE, '..', 'tools', 'build.mjs'), '--out', OUT]);
const MAIN = join(OUT, 'ha-appliance-card.js');

// Local storage and fetch, as a browser has them. fetch serves the built files
// and counts what it is asked for.
const store = new Map();
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: {
    get length() { return store.size; },
    key: (i) => [...store.keys()][i] ?? null,
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
  },
});
const fetched = [];
globalThis.fetch = async (url) => {
  fetched.push(url);
  const name = new URL(url).pathname.split('/').pop();
  try {
    const text = readFileSync(join(OUT, name), 'utf8');
    return { ok: true, status: 200, json: async () => JSON.parse(text) };
  } catch (e) {
    return { ok: false, status: 404, json: async () => ({}) };
  }
};
const tick = () => new Promise((r) => setTimeout(r, 0));

const registry = await loadCard(MAIN);
// The page holds the card's <script>, which is how it finds its own files.
document.querySelectorAll = () => [{ src: `${pathToFileURL(MAIN).href}?hacstag=1` }];
const Card = registry.get('ha-appliance-card');
const VERSION = readFileSync(MAIN, 'utf8').match(/const CARD_VERSION = "([^"]+)"/)[1];

check('le fichier publie ne contient que l anglais',
  /\n  fr: \{/.test(readFileSync(MAIN, 'utf8')), false);
check('l editeur n est pas dans le fichier de la carte', registry.has('ha-appliance-card-editor'), false);

// ── Languages ────────────────────────────────────────────────────────────────
// English is read from the source, which is what every language falls back on.
const SRC = readFileSync(join(HERE, '..', 'src', 'ha-appliance-card.js'), 'utf8');
const enBlock = SRC.slice(SRC.indexOf('\n  en: {'), SRC.indexOf('\n  fr: {'));
const enKeys = new Set([...enBlock.matchAll(/(?:^|[\s,{])([a-z][a-z0-9_]*):\s*"/g)].map((m) => m[1]));
const langs = readdirSync(OUT).filter((n) => n.endsWith('.json'));
check('13 langues livrees a part', langs.length, 13);
for (const file of langs) {
  const dict = JSON.parse(readFileSync(join(OUT, file), 'utf8'));
  check(`${file} : du texte, rien que du texte`,
    Object.values(dict).every((v) => typeof v === 'string' && v.length > 0), true);
  check(`${file} : aucune cle inconnue de l anglais`, Object.keys(dict).filter((k) => !enKeys.has(k)).join(), '');
}

const states = {
  'sensor.w_state': { entity_id: 'sensor.w_state', state: 'Idle', attributes: { friendly_name: 'Washer' } },
};
const hassIn = (language) => ({
  states, entities: {}, devices: {}, locale: { language }, language,
  config: { unit_system: { temperature: '°C' } }, callService() {},
});
const draw = (language) => {
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'washer', state_entity: 'sensor.w_state' });
  c._hass = hassIn(language);
  c.connectedCallback();
  c._render();
  return c;
};

const enCard = draw('en');
check('en anglais : rien a aller chercher', fetched.length, 0);
check('en anglais : le texte de la carte', /Idle/.test(markup(enCard)), true);

// First visit in French: English for a moment, then the card draws itself again.
const frCard = draw('fr');
check('en francais : la langue est demandee une fois', fetched.length, 1);
check('en francais : a cote du script, avec la version',
  fetched[0], `${pathToFileURL(join(OUT, 'ha-appliance-card-fr.json')).href}?v=${VERSION}`);
check('en francais : l anglais en attendant', /Idle/.test(markup(frCard)), true);
await tick(); await tick();
check('en francais : la carte se redessine en francais', /Au repos|Arrêt|En veille/.test(markup(frCard)), true);
check('en francais : gardee pour la prochaine visite', store.has(`ha-appliance-card-i18n:${VERSION}:fr`), true);

draw('fr');
check('en francais : pas demandee deux fois', fetched.length, 1);

// A language already kept from an earlier visit is there before the first
// render: no English, no fetch.
const de = readFileSync(join(OUT, 'ha-appliance-card-de.json'), 'utf8');
store.set(`ha-appliance-card-i18n:${VERSION}:de`, de);
store.set('ha-appliance-card-i18n:0.0.1:de', de);
const deCard = draw('de');
check('deja gardee : rien a aller chercher', fetched.length, 1);
check('deja gardee : en allemand des le premier dessin',
  markup(deCard).includes(JSON.parse(de).idle), true);
check('deja gardee : la version precedente est effacee', store.has('ha-appliance-card-i18n:0.0.1:de'), false);

// A language missing from the release: English, asked for once, a warning.
const warned = [];
const plainWarn = console.warn;
console.warn = (msg) => warned.push(msg);
const plainFetch = globalThis.fetch;
globalThis.fetch = async (url) => (url.includes('-cs.json') ? (fetched.push(url), { ok: false, status: 404 }) : plainFetch(url));
const csCard = draw('cs');
await tick(); await tick();
draw('cs');
console.warn = plainWarn;
globalThis.fetch = plainFetch;
check('fichier absent : demande une seule fois', fetched.filter((u) => u.includes('-cs.json')).length, 1);
check('fichier absent : la carte reste en anglais', /Idle/.test(markup(csCard)), true);
check('fichier absent : un avertissement', warned.length, 1);

// ── Editor ───────────────────────────────────────────────────────────────────
await Card.getConfigElement();
check('l editeur est charge a la premiere edition', registry.has('ha-appliance-card-editor'), true);
const Editor = registry.get('ha-appliance-card-editor');
const ed = new Editor();
let thrown = null;
try {
  ed.setConfig({ type: 'custom:ha-appliance-card', appliance_type: 'washer', state_entity: 'sensor.w_state' });
  ed.hass = hassIn('fr');
  ed._build();
} catch (e) {
  thrown = e;
}
check('l editeur trouve tout ce qu il prend a la carte', thrown && String(thrown), null);
let again = null;
try { await Card.getConfigElement(); } catch (e) { again = e; }
check('l editeur : une seconde edition ne le redefinit pas', again && String(again), null);

report();

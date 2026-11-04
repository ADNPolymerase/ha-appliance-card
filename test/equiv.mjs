/**
 * The release draws what the source draws.  Run with:  node test/equiv.mjs
 *
 * Every card test/run.mjs builds is built again, at the same time and with the
 * same states, by the source and by the release, whose drawings arrive from
 * files of their own. Once they have, the two must render the same markup.
 */
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { loadCard, markup, check, report } from './harness.mjs';
import { sourcePath } from '../tools/source.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = mkdtempSync(join(tmpdir(), 'hac-equiv-'));
const REC = join(OUT, 'cards.json');
execFileSync(process.execPath, [join(HERE, '..', 'tools', 'build.mjs'), '--out', OUT]);
execFileSync(process.execPath, [join(HERE, 'run.mjs')], { env: { ...process.env, HAC_RECORD: REC }, stdio: 'ignore' });
const cards = JSON.parse(readFileSync(REC, 'utf8'));

const realNow = Date.now;
globalThis.fetch = async (url) => {
  const name = new URL(url).pathname.split('/').pop();
  try {
    const text = readFileSync(join(OUT, name), 'utf8');
    return { ok: true, status: 200, json: async () => JSON.parse(text) };
  } catch (e) {
    return { ok: false, status: 404, json: async () => ({}) };
  }
};
Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: undefined });

const Source = (await loadCard(sourcePath())).get('ha-appliance-card');
const MAIN = join(OUT, 'ha-appliance-card.js');
const Release = (await loadCard(MAIN)).get('ha-appliance-card');
document.querySelectorAll = () => [{ src: `${pathToFileURL(MAIN).href}?hacstag=1` }];

const HASS = (states) => ({
  states, entities: {}, devices: {}, locale: { language: 'en' }, language: 'en',
  config: { unit_system: { temperature: '°C' } }, callService() {},
});
// Some drawings pick a picture at random: both draw from the same sequence.
const realRandom = Math.random;
function seeded() {
  let x = 0x2f6b9e1d;
  return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return ((x >>> 0) % 1e9) / 1e9; };
}
function draw(Card, { config, states, at }) {
  Date.now = () => at;
  Math.random = seeded();
  const c = new Card();
  c.setConfig({ type: 'custom:ha-appliance-card', ...config });
  c._hass = HASS(states);
  c._render();
  Date.now = realNow;
  Math.random = realRandom;
  return markup(c);
}
// Each drawing's file counts its SVG ids on its own: ids are compared by the
// order they appear in, and must point where they pointed.
function sameIds(html) {
  const ids = [...new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]))];
  const map = new Map(ids.map((id, k) => [id, `id${k}`]));
  return html.replace(/(\bid="|url\(#|href="#)([^")]+)/g, (all, lead, id) => (map.has(id) ? lead + map.get(id) : all));
}
const settle = () => new Promise((r) => setTimeout(r, 50));

// A first pass asks for every drawing and language the cards need.
for (const card of cards) { try { draw(Release, card); } catch (e) { /* compared below */ } }
for (let i = 0; i < 40; i++) await settle();

let same = 0;
const differ = new Map();
for (const card of cards) {
  let a, b;
  try { a = sameIds(draw(Source, card)); } catch (e) { a = `throws ${e.message}`; }
  try { b = sameIds(draw(Release, card)); } catch (e) { b = `throws ${e.message}`; }
  if (a === b) same++;
  else {
    const type = card.config.appliance_type || 'auto';
    if (!differ.has(type)) differ.set(type, { card, a, b });
  }
}
for (const [type, { a, b }] of differ) {
  let k = 0;
  while (k < a.length && a[k] === b[k]) k++;
  console.log(`❌ ${type}: source « ${a.slice(Math.max(0, k - 80), k + 80)} »\n     release « ${b.slice(Math.max(0, k - 80), k + 80)} »`);
}
check(`les ${cards.length} cartes des tests dessinent pareil dans la release`, same, cards.length);
report();

/**
 * Builds dist/ from src/ha-appliance-card.js.  Run with:  node tools/build.mjs
 *
 * The source is one file holding every language and the editor, which is what
 * the tests run on. A dashboard needs neither the editor nor thirteen of the
 * fourteen languages, so a release ships them as files of their own:
 *
 *   ha-appliance-card.js           the card, with English only
 *   ha-appliance-card-editor.js    the editor, fetched the first time a card is edited
 *   ha-appliance-card-<lang>.json  one per language, fetched when the card speaks it
 *
 * The editor reads dozens of the card's helpers. It is written out as a
 * function that receives them: every top-level name of the card it mentions is
 * handed over when it is loaded, so the editor's code is the source's code,
 * unchanged.
 *
 *   node tools/build.mjs --check   fails if dist/ is not what the source builds
 */
import { readFileSync, writeFileSync, readdirSync, unlinkSync, mkdtempSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src', 'ha-appliance-card.js');
const CHECK = process.argv.includes('--check');
const OUT = process.argv.includes('--out')
  ? process.argv[process.argv.indexOf('--out') + 1]
  : CHECK ? mkdtempSync(join(tmpdir(), 'hac-build-')) : join(ROOT, 'dist');

const fail = (msg) => { console.error(`build: ${msg}`); process.exit(1); };
const source = readFileSync(SRC, 'utf8');
const lines = source.split('\n');
const lineOf = (text) => {
  const i = lines.indexOf(text);
  if (i < 0 || lines.indexOf(text, i + 1) >= 0) fail(`marker not found exactly once: ${text}`);
  return i;
};

// Everything the release ships is ASCII, as the source is: no file served by
// Home Assistant then depends on a charset header.
const ascii = (text) => text.replace(/[\u0080-￿]/g, (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`);

// ── Languages ────────────────────────────────────────────────────────────────
const tStart = lineOf('const T = {');
const tEnd = lines.indexOf('};', tStart);
const T = vm.runInNewContext(`(${lines.slice(tStart + 1, tEnd).join('\n').replace(/^/, '{')}})`);
if (!T.en) fail('no English in T');
for (const [code, dict] of Object.entries(T)) {
  for (const [key, value] of Object.entries(dict)) {
    if (typeof value !== 'string') fail(`${code}.${key} is not a string`);
  }
}
const enStart = lineOf('  en: {');
const enEnd = lines.findIndex((l, i) => i > enStart && /^  [a-z]{2}(-[A-Za-z]+)?: \{$/.test(l));
if (enEnd < 0) fail('cannot find where English ends');

// ── Editor ───────────────────────────────────────────────────────────────────
const edStart = lineOf('// @editor-begin');
const edEnd = lineOf('// @editor-end');
const defStart = lineOf('// @editor-define-begin');
const defEnd = lineOf('// @editor-define-end');
const ldStart = lineOf('// @loader-begin');
const ldEnd = lineOf('// @loader-end');
const editor = lines.slice(edStart + 1, edEnd).join('\n');

const DECL = /^(?:const|let|var|class|function\*?|async function)\s+([A-Za-z_$][\w$]*)/gm;
const declared = (text) => [...text.matchAll(DECL)].map((m) => m[1]);
const editorNames = new Set(declared(editor));

const mainLines = [
  ...lines.slice(0, tStart + 1),
  ...lines.slice(enStart, enEnd),
  ...lines.slice(tEnd, ldStart),
  '__LOADER__',
  ...lines.slice(ldEnd + 1, edStart),
  ...lines.slice(edEnd + 1, defStart),
  ...lines.slice(defEnd + 1),
];
const mainBody = mainLines.join('\n');

// What the editor takes from the card: every top-level name of the card it
// mentions, read as a name and not as a property.
const mentioned = (text, name) => new RegExp(`(?<![\\w$.])${name.replace(/\$/g, '\\$')}(?![\\w$])`).test(text);
const shared = declared(mainBody).filter((n) => !editorNames.has(n) && mentioned(editor, n));
for (const n of shared) {
  if (new RegExp(`^let\\s+${n}\\b`, 'm').test(mainBody)) fail(`the editor reads ${n}, a let: it would get a copy`);
}
for (const n of editorNames) {
  if (mentioned(mainBody, n)) fail(`the card uses ${n}, which lives in the editor`);
}

const loader = `let editorLoading = null;
function loadEditor() {
  if (customElements.get("ha-appliance-card-editor")) return Promise.resolve();
  if (!editorLoading) {
    editorLoading = import(assetUrl("ha-appliance-card-editor.js"))
      .then((m) => m.default({ ${shared.join(', ')} }))
      .catch((err) => {
        editorLoading = null;
        throw err;
      });
  }
  return editorLoading;
}`;

const HEADER = '// Built by tools/build.mjs from src/ha-appliance-card.js: edit the source, not this file.';
const files = {
  'ha-appliance-card.js': `${HEADER}\n${mainBody.replace('__LOADER__', loader)}`,
  'ha-appliance-card-editor.js': `${HEADER}
// The card's editor, loaded by the card the first time it is edited.
export default function defineEditor({ ${shared.join(', ')} }) {
${editor}

if (!customElements.get("ha-appliance-card-editor")) customElements.define("ha-appliance-card-editor", ApplianceCardEditor);
}
`,
};
for (const [code, dict] of Object.entries(T)) {
  if (code !== 'en') files[`ha-appliance-card-${code}.json`] = `${ascii(JSON.stringify(dict))}\n`;
}
for (const [name, text] of Object.entries(files)) {
  if (/[^\x00-\x7f]/.test(text)) fail(`${name} is not ASCII`);
}

// ── Write or compare ─────────────────────────────────────────────────────────
if (CHECK) {
  const dist = join(ROOT, 'dist');
  const have = readdirSync(dist).sort();
  const want = Object.keys(files).sort();
  if (have.join() !== want.join()) fail(`dist/ holds ${have.join(', ')} but the source builds ${want.join(', ')}`);
  for (const [name, text] of Object.entries(files)) {
    if (readFileSync(join(dist, name), 'utf8') !== text) fail(`dist/${name} is out of date: run node tools/build.mjs`);
  }
  console.log('build: dist/ is up to date');
} else {
  for (const old of readdirSync(OUT)) {
    if (/^ha-appliance-card.*\.(js|json)$/.test(old) && !files[old]) unlinkSync(join(OUT, old));
  }
  for (const [name, text] of Object.entries(files)) writeFileSync(join(OUT, name), text);
  const kb = (n) => `${Math.round(Buffer.byteLength(files[n]) / 1024)} KB`;
  console.log(`build: card ${kb('ha-appliance-card.js')}, editor ${kb('ha-appliance-card-editor.js')}, `
    + `${Object.keys(T).length - 1} languages, shared names ${shared.length}`);
}

/**
 * Builds dist/ from the files of src/.  Run with:  node tools/build.mjs
 *
 * The source, the files of src/ one after the other, holds every language, the
 * editor and every drawing, which is what the tests run on. A dashboard needs neither the editor nor thirteen of the
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
import { chunksOf, namesIn, entriesOf } from './chunks.mjs';
import { sourceText } from './source.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const OUT = process.argv.includes('--out')
  ? process.argv[process.argv.indexOf('--out') + 1]
  : CHECK ? mkdtempSync(join(tmpdir(), 'hac-build-')) : join(ROOT, 'dist');

const fail = (msg) => { console.error(`build: ${msg}`); process.exit(1); };
const source = sourceText();
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
const fullMain = mainLines.join('\n');

// ── Drawings ─────────────────────────────────────────────────────────────────
// Every drawing, with its CSS and whatever only it uses, goes to a file of its
// own, ha-appliance-card-draw-<key>.js, fetched the first time a card shows
// it. What the rest of the card uses stays in the card and is handed over.
const daStart = fullMain.indexOf('// @draw-access-begin\n');
const daEnd = fullMain.indexOf('// @draw-access-end\n');
if (daStart < 0 || daEnd < daStart) fail('draw-access markers not found');
const withAccess = `${fullMain.slice(0, daStart)}__DRAW_ACCESS__\n${fullMain.slice(daEnd + '// @draw-access-end\n'.length)}`;
const chunks = chunksOf(withAccess);
const declaredNames = new Set(chunks.filter((c) => c.name).map((c) => c.name));
// A statement that adds to a declared object (LAMP_SVGS.string = ...) goes
// wherever that object goes.
const groups = new Map();
for (const ch of chunks) {
  let owner = ch.name;
  if (!owner) {
    const first = (ch.text.split('\n').find((l) => l && !/^(\/\/|\/\*| \*|\*\/)/.test(l)) || '').match(/^([A-Za-z_$][\w$]*)[.[]/);
    if (first && declaredNames.has(first[1])) owner = first[1];
  }
  const key = owner || `#${ch.start}`;
  if (!groups.has(key)) groups.set(key, { key, named: !!owner, chunks: [], start: ch.start });
  groups.get(key).chunks.push(ch);
}
const refsOf = (text, self) => [...namesIn(text)].filter((n) => n !== self && groups.has(n));
for (const g of groups.values()) g.refs = refsOf(g.chunks.map((c) => c.text).join('\n'), g.key);
const LAZY = new Set(['DRAWINGS', 'ILLUSTRATION_CSS']);
const closure = (roots, into, stopAt) => {
  const stack = [...roots];
  while (stack.length) {
    const k = stack.pop();
    if (into.has(k) || LAZY.has(k) || (stopAt && stopAt.has(k))) continue;
    into.add(k);
    stack.push(...groups.get(k).refs);
  }
  return into;
};
// What the card needs: every statement that declares nothing, the card, and
// whatever the editor reads.
const roots = [...groups.values()].filter((g) => !g.named).map((g) => g.key);
roots.push(...refsOf(editor, null));
// A let only drawings use is copied into each drawing's file: they are the
// counters that keep SVG ids apart, and each card's shadow root keeps its ids
// to itself. A let the card uses too stays in the card, and a drawing reading
// it fails the build below.
const inMain = closure(roots, new Set());
const drawEntries = entriesOf(groups.get('DRAWINGS').chunks.map((c) => c.text).join('\n'), 'DRAWINGS');
const cssEntries = new Map(entriesOf(groups.get('ILLUSTRATION_CSS').chunks.map((c) => c.text).join('\n'), 'ILLUSTRATION_CSS').map((e) => [e.key, e]));
if (drawEntries.length !== cssEntries.size || drawEntries.some((e) => !cssEntries.has(e.key))) fail('DRAWINGS and ILLUSTRATION_CSS do not have the same keys');
const drawFiles = {};
const drawShared = new Set();
const inSomeDrawing = new Set();
for (const entry of drawEntries) {
  const css = cssEntries.get(entry.key);
  const own = new Set();
  const wanted = refsOf(`${entry.value}\n${css.value}`, null);
  for (const n of wanted) if (LAZY.has(n)) fail(`the drawing ${entry.key} reads ${n}`);
  closure(wanted, own, inMain);
  for (const k of own) {
    inSomeDrawing.add(k);
    for (const r of groups.get(k).refs) {
      if (LAZY.has(r)) fail(`${k} reads ${r}`);
      if (inMain.has(r)) drawShared.add(r);
    }
  }
  for (const n of wanted) if (inMain.has(n)) drawShared.add(n);
  const body = [...own].map((k) => groups.get(k)).sort((a, b) => a.start - b.start)
    .flatMap((g) => g.chunks.map((c) => c.text)).join('\n');
  drawFiles[entry.key] = { body, draw: entry.value, css: css.value };
}
for (const n of drawShared) {
  if (groups.get(n).chunks.some((c) => c.kind === 'let')) fail(`a drawing reads ${n}, a let: it would get a copy`);
}
const sharedDraw = [...drawShared].sort();
const drawKeys = drawEntries.map((e) => e.key);
const drawAccess = `const DRAW_KEYS = ${JSON.stringify(drawKeys)};
const drawn = {};
const drawState = {};
let drawDeps = null;
function requestDrawing(key) {
  drawState[key] = "loading";
  import(assetUrl(\`ha-appliance-card-draw-\${key}.js\`))
    .then((m) => {
      if (!drawDeps) drawDeps = { ${sharedDraw.join(', ')} };
      drawn[key] = m.default(drawDeps);
      drawState[key] = "ready";
      for (const fn of Array.from(langListeners)) {
        try { fn(); } catch (e) { /* one card failing must not stop the others */ }
      }
    })
    .catch((err) => {
      drawState[key] = "failed";
      console.warn(\`HA-APPLIANCE-CARD: the \${key} drawing did not load (\${err && err.message})\`);
    });
}
function drawingOf(key) {
  if (drawn[key]) return drawn[key].draw;
  if (!drawState[key] && DRAW_KEYS.includes(key)) requestDrawing(key);
  return null;
}
function drawCssOf(key) {
  if (drawn[key]) return drawn[key].css;
  if (!drawState[key] && DRAW_KEYS.includes(key)) requestDrawing(key);
  return null;
}`;
// The card keeps what it needs, and anything nobody reads, where it was.
const mainBody = [...groups.values()]
  .filter((g) => !LAZY.has(g.key) && (inMain.has(g.key) || !inSomeDrawing.has(g.key)))
  .sort((a, b) => a.start - b.start)
  .flatMap((g) => g.chunks.map((c) => c.text))
  .join('\n')
  .replace('__DRAW_ACCESS__', drawAccess);

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

const HEADER = '// Built by tools/build.mjs from the files of src/: edit those, not this file.';
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
for (const [key, f] of Object.entries(drawFiles)) {
  files[`ha-appliance-card-draw-${key}.js`] = `${HEADER}
// The ${key} drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ ${sharedDraw.join(', ')} }) {
${f.body}

return {
draw: ${f.draw},
css: ${f.css},
};
}
`;
}
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
    + `${Object.keys(T).length - 1} languages, ${drawKeys.length} drawings `
    + `(${Math.round(Object.keys(files).filter((n) => n.includes('-draw-')).reduce((a, n) => a + Buffer.byteLength(files[n]), 0) / 1024)} KB), `
    + `shared names ${shared.length}`);
}

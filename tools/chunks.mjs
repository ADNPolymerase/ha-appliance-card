/**
 * Cuts the card's source into its top-level statements, for tools/build.mjs.
 *
 * A statement starts on a line at column 0 that the scanner reaches outside
 * any string, template, comment and bracket; the comments right above it go
 * with it. Each piece is then compiled on its own, so a cut in the wrong place
 * fails the build instead of shipping.
 */
import vm from 'node:vm';

const REGEX_AFTER = new Set(['(', ',', '=', ':', '[', '!', '&', '|', '?', '{', '}', ';', '+', '-', '*', '%', '<', '>', '~', '^']);
const REGEX_AFTER_WORDS = new Set(['return', 'typeof', 'case', 'in', 'of', 'new', 'delete', 'void', 'throw', 'else', 'do', 'yield', 'await']);

/** For each line, whether it starts outside any string, comment and bracket. */
function topLevelLines(src) {
  const atTop = [];
  // Stack of contexts: '{' '(' '[' brackets, '`' a template, '${' a template's expression.
  const stack = [];
  let i = 0;
  let lastSig = ';'; // last significant character or word, to tell a regex from a division
  let lineStart = true;
  const n = src.length;
  const mark = () => {
    atTop.push(stack.length === 0);
  };
  mark();
  while (i < n) {
    const c = src[i];
    const top = stack[stack.length - 1];
    if (top === '`') {
      if (c === '\\') { i += 2; continue; }
      if (c === '`') { stack.pop(); lastSig = ')'; i++; continue; }
      if (c === '$' && src[i + 1] === '{') { stack.push('${'); lastSig = '('; i += 2; continue; }
      if (c === '\n') mark();
      i++;
      continue;
    }
    if (c === '\n') { mark(); i++; continue; }
    if (c === ' ' || c === '\t' || c === '\r') { i++; continue; }
    if (c === '/' && src[i + 1] === '/') {
      while (i < n && src[i] !== '\n') i++;
      continue;
    }
    if (c === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      for (let k = i; k < end; k++) if (src[k] === '\n') mark();
      i = end + 2;
      continue;
    }
    if (c === '"' || c === "'") {
      i++;
      while (i < n && src[i] !== c) { if (src[i] === '\\') i++; i++; }
      i++;
      lastSig = ')';
      continue;
    }
    if (c === '`') { stack.push('`'); i++; continue; }
    if (c === '/') {
      if (REGEX_AFTER.has(lastSig) || REGEX_AFTER_WORDS.has(lastSig)) {
        i++;
        let inClass = false;
        while (i < n) {
          const d = src[i];
          if (d === '\\') { i += 2; continue; }
          if (d === '[') inClass = true;
          else if (d === ']') inClass = false;
          else if (d === '/' && !inClass) break;
          else if (d === '\n') throw new Error(`unterminated regex near ${src.slice(i - 40, i)}`);
          i++;
        }
        i++;
        while (/[a-z]/.test(src[i])) i++;
        lastSig = ')';
        continue;
      }
      lastSig = '/';
      i++;
      continue;
    }
    if (c === '{' || c === '(' || c === '[') { stack.push(c); lastSig = c; i++; continue; }
    if (c === '}' || c === ')' || c === ']') {
      const open = stack.pop();
      if (open === '${') { lastSig = ')'; i++; continue; } // back into the template
      const want = { '}': '{', ')': '(', ']': '[' }[c];
      if (open !== want) throw new Error(`unbalanced ${c} near ${src.slice(i - 60, i)}`);
      lastSig = c === '}' ? '}' : ')';
      i++;
      continue;
    }
    if (/[A-Za-z_$0-9]/.test(c)) {
      let j = i;
      while (j < n && /[\w$]/.test(src[j])) j++;
      lastSig = src.slice(i, j);
      if (/^\d/.test(lastSig)) lastSig = ')';
      i = j;
      continue;
    }
    lastSig = c;
    i++;
  }
  if (stack.length) throw new Error(`source ends inside ${stack.join('')}`);
  return atTop;
}

const DECL = /^(?:export\s+)?(?:const|let|var|class|function\*?|async\s+function)\s+([A-Za-z_$][\w$]*)/;

/**
 * The source as a list of { name, kind, text, start }, in order. `name` is the
 * declared name, or null for a statement that declares nothing.
 */
export function chunksOf(src) {
  const lines = src.split('\n');
  const atTop = topLevelLines(src);
  const starts = [];
  for (let k = 0; k < lines.length; k++) {
    const l = lines[k];
    if (!atTop[k] || !l || /^[\s}\])]/.test(l) || l.startsWith('//') || l.startsWith('/*') || l.startsWith(' *') || l.startsWith('*/')) continue;
    // Pull the comment block right above along.
    let s = k;
    while (s > 0 && atTop[s - 1] && /^(\/\/|\/\*| \*|\*\/)/.test(lines[s - 1])) s--;
    starts.push(s);
  }
  const chunks = [];
  if (starts[0] !== 0) starts.unshift(0);
  for (let c = 0; c < starts.length; c++) {
    const a = starts[c];
    const b = c + 1 < starts.length ? starts[c + 1] : lines.length;
    const text = lines.slice(a, b).join('\n');
    const code = text.split('\n').find((l) => l && !/^(\/\/|\/\*| \*|\*\/)/.test(l)) || '';
    const m = code.match(DECL);
    chunks.push({ name: m ? m[1] : null, kind: m ? code.split(/\s/)[0] : null, text, start: a });
  }
  if (chunks.map((c) => c.text).join('\n') !== src) throw new Error('chunks do not add up to the source');
  for (const ch of chunks) {
    try {
      new vm.Script(ch.text.replace(/^export\s+/m, ''));
    } catch (e) {
      throw new Error(`a statement was cut in the wrong place at line ${ch.start + 1}: ${e.message}`);
    }
  }
  return chunks;
}

/** Every identifier a piece of code mentions, strings and templates included. */
export function namesIn(text) {
  return new Set(text.match(/[A-Za-z_$][\w$]*/g) || []);
}

/** The entries of an object literal written one key per line at two spaces. */
export function entriesOf(chunkText, constName) {
  const lines = chunkText.split('\n');
  const open = lines.indexOf(`const ${constName} = {`);
  const close = lines.lastIndexOf('};');
  if (open < 0 || close < open) throw new Error(`cannot read the entries of ${constName}`);
  const body = lines.slice(open + 1, close);
  const at = [];
  body.forEach((l, k) => { if (/^  [a-z_0-9]+: /.test(l)) at.push(k); });
  return at.map((k, idx) => {
    const seg = body.slice(k, idx + 1 < at.length ? at[idx + 1] : body.length);
    const key = seg[0].match(/^  ([a-z_0-9]+): /)[1];
    // The value ends at the last line that is not a comment or blank, with its comma.
    let last = seg.length - 1;
    while (last > 0 && /^\s*(\/\/.*)?$/.test(seg[last])) last--;
    const valueLines = seg.slice(0, last + 1);
    valueLines[0] = valueLines[0].replace(/^  [a-z_0-9]+: /, '');
    valueLines[last] = valueLines[last].replace(/,\s*$/, '');
    const value = valueLines.join('\n');
    try {
      new vm.Script(`(${value})`);
    } catch (err) {
      throw new Error(`${constName}.${key} was not read whole: ${err.message}`);
    }
    return { key, value };
  });
}

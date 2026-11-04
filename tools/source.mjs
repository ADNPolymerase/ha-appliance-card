/**
 * The card's source, from the files of src/ in the order of their numbers.
 *
 * Each file holds whole top-level statements, so each one compiles on its own;
 * together they are the card as the tests run it and the build cuts it.
 */
import { readFileSync, readdirSync, writeFileSync, mkdtempSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import vm from 'node:vm';

const SRC_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');

/** The files of src/, in order. */
export function sourceFiles() {
  return readdirSync(SRC_DIR).filter((n) => /^\d\d-[a-z0-9-]+\.js$/.test(n)).sort();
}

/** The whole source, every file of src/ one after the other. */
export function sourceText() {
  const files = sourceFiles();
  if (!files.length) throw new Error('no source files in src/');
  return files.map((name) => {
    const text = readFileSync(join(SRC_DIR, name), 'utf8');
    try {
      new vm.Script(text, { filename: name });
    } catch (e) {
      throw new Error(`src/${name} does not hold whole statements: ${e.message}`);
    }
    if (!text.endsWith('\n')) throw new Error(`src/${name} must end with a newline`);
    return text;
  }).join('');
}

/** The source written to a file of its own, for the tests to import. */
export function sourcePath() {
  const path = join(mkdtempSync(join(tmpdir(), 'hac-src-')), 'ha-appliance-card.js');
  writeFileSync(path, sourceText());
  return path;
}

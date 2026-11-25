// make.fun entry: The Meeting That Should Have Been an Email.
// Reads the one-line joke from line.txt next to this file and writes it,
// byte-identical and with no trailing newline, to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const linePath = join(dirname(fileURLToPath(import.meta.url)), "line.txt");

if (!existsSync(linePath)) {
  throw new Error(`line.txt not found next to main.ts: ${linePath}`);
}

const raw = readFileSync(linePath, "utf8");
const joke = raw.replace(/[\r\n]+$/, "");

if (!joke.length || joke.length > 200) {
  throw new Error(`joke must be 1-200 characters, got ${joke.length}`);
}
if (/[\r\n]/.test(joke)) {
  throw new Error("joke must be a single line with no newline characters");
}
if (joke.trim().length === 0) {
  throw new Error("joke must not be only whitespace");
}

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(targetDir, { recursive: true });
writeFileSync(join(targetDir, "entry.txt"), joke, "utf8");
console.log(`wrote ${joke.length} characters to ${join(targetDir, "entry.txt")}`);
console.log(joke);

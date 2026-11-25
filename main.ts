// no-deadline: a single-line joke that excuses a missed deadline.
// Fully deterministic, no network access: the entry below is a fixed
// string, written verbatim into entry.txt on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry (64 chars, exactly one line): the deadline ghosted me, so I
// took it as a break — a relationship excuse for a missed deadline, with
// the punchline landing on the final phrase.
const LINE =
  "The deadline never texted back, so I assumed we were on a break.";

// The gate: the grader's entry.txt must hold UTF-8 text of 1 to 200 characters,
// exactly one line. Fail loudly here instead of shipping an invalid entry.
const MAX_CHARS = 200;
if (LINE.length < 1 || LINE.length > MAX_CHARS || LINE.includes("\n")) {
  throw new Error(`entry violates the 1-200 single-line gate: ${LINE.length} chars`);
}
// The grader mounts its output directory at MAKEFUN_OUTPUT_DIR;
// locally the same run writes into ./out. No trailing newline: the file
// holds exactly the entry, one line, 64 characters.
function run(): void {
  const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(join(targetDir, "entry.txt"), LINE, "utf8");
}

run();

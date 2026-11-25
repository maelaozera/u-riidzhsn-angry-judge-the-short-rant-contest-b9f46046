// Angry Judge: The Short Rant Contest — entry program.
// Writes one short, funny rant about an everyday annoyance to
// <outputDir>/entry.txt. Deterministic: same text on every run.
// No dates, no randomness, no network, no dependencies. Node 22+.
//
// Usage:
//   node main.ts            -> writes /output/entry.txt
//   node main.ts <outDir>   -> writes <outDir>/entry.txt

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The rant: a self-checkout machine accuses an innocent shopper of
// smuggling, freezes, and summons help for a one-button fix. Chosen from
// six drafted candidates for joke density and a concrete, shared anger.
const RANT =
  "Self-checkout, you smug little robot. I scanned one bag of rice and you " +
  "screamed 'unexpected item in the bagging area' like I had smuggled a " +
  "live goat. Then you froze, summoned assistance, and made me stand there " +
  "while a teenager pressed a single button to forgive me. I did everything " +
  "right. You panicked. Never again \u2014 I would rather queue behind the " +
  "man paying in coins.";

// The gate counts characters: the entry must be 1-400 characters.
const MAX_CHARS = 400;

function main(): void {
  const outputDir = process.argv[2] ?? "/output";

  if (RANT.length < 1 || RANT.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${RANT.length}`,
    );
  }
  if (RANT.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }

  mkdirSync(outputDir, { recursive: true });
  // No trailing newline: the gate counts characters, and the text ends
  // on its last word.
  writeFileSync(join(outputDir, "entry.txt"), RANT, "utf8");
}

main();

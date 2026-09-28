// Assembles index.html from index.template.html + sections/<name>.html,
// linking css/<name>.css and js/<name>.js when they exist.
// Usage: node build.mjs            (run from this folder)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
export const ORDER = ["hero", "how", "problem", "free", "run", "pricing", "proof", "faq", "cta"];

const at = (p) => join(root, p);
let html = readFileSync(at("index.template.html"), "utf8");
const css = [], js = [], parts = [], missing = [];

// Visible copy uses the curly apostrophe (What’s, don’t). Straight ones render
// as unfinished ticks next to the curly display headings, so flag them.
// Only text between tags is checked: scripts, styles, comments and attributes are skipped.
function straightApostrophes(src) {
  const text = src
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]*>/g, "\n");
  const hits = [];
  const re = /[A-Za-z]'[A-Za-z]/g;
  let m;
  while ((m = re.exec(text)) && hits.length < 8) hits.push(text.slice(Math.max(0, m.index - 20), m.index + 20).replace(/\s+/g, " ").trim());
  return hits;
}
const quoteWarnings = [];
const noteQuotes = (label, src) => { const h = straightApostrophes(src); if (h.length) quoteWarnings.push(`  ${label}: ${h.map((s) => `"${s}"`).join(", ")}`); };
noteQuotes("index.template.html", html);

for (const name of ORDER) {
  const frag = at(`sections/${name}.html`);
  if (!existsSync(frag)) { missing.push(name); continue; }
  const src = readFileSync(frag, "utf8");
  noteQuotes(`sections/${name}.html`, src);
  parts.push(`<!-- section: ${name} -->\n${src.trimEnd()}`);
  if (existsSync(at(`css/${name}.css`))) css.push(`<link rel="stylesheet" href="css/${name}.css">`);
  if (existsSync(at(`js/${name}.js`))) js.push(`<script src="js/${name}.js"></script>`);
}

html = html
  .replace("<!-- @CSS -->", css.join("\n"))
  .replace("<!-- @SECTIONS -->", parts.join("\n\n"))
  .replace("<!-- @JS -->", js.join("\n"));

writeFileSync(at("index.html"), html);
console.log(`index.html built: ${parts.length} sections` + (missing.length ? `, missing: ${missing.join(", ")}` : ""));
if (quoteWarnings.length) console.warn(`WARN: straight apostrophes in visible copy (use \u2019):\n${quoteWarnings.join("\n")}`);
if (/\u2014/.test(html)) { console.error("FAIL: em dash found in index.html"); process.exitCode = 1; }

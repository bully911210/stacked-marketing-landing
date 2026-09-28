// Headless screenshots + sanity checks for the Stacked page or a section preview.
//
//   node tools/snap.mjs --url "http://localhost:4501/preview.html?s=how&pad=1" --out lab/how --w 1440 --h 900 \
//        [--section how] [--frames 6] [--full] [--wait 1200] [--reduced] [--mobile]
//
//   --section <id>  capture --frames evenly across that section's scroll range
//                   (from its top entering the viewport to its bottom leaving)
//   --frames N      without --section: N frames evenly across the whole page
//   --full          also write full.png (full-page screenshot)
//   --mobile        390x844 touch emulation (overrides --w/--h)
//   --reduced       prefers-reduced-motion: reduce
//
// Prints a JSON report: console errors, failed GETs, horizontal overflow,
// em dashes found in visible text, and the frame files written.
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i > -1 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : d; };
const flag = (n) => argv.includes(n);

const url = arg("--url", "http://localhost:4501/");
const out = arg("--out", "lab/snap");
const mobile = flag("--mobile");
const W = mobile ? 390 : +arg("--w", 1440);
const H = mobile ? 844 : +arg("--h", 900);
const frames = +arg("--frames", 0);
const section = arg("--section", "");
const wait = +arg("--wait", 1200);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await browser.newContext({
  viewport: { width: W, height: H }, deviceScaleFactor: 1,
  isMobile: mobile, hasTouch: mobile,
  reducedMotion: flag("--reduced") ? "reduce" : "no-preference",
});
const page = await ctx.newPage();
const report = { url, viewport: `${W}x${H}`, consoleErrors: [], failedRequests: [], overflowX: 0, emDashes: [], files: [] };
page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) report.consoleErrors.push(m.text()); });
page.on("pageerror", (e) => report.consoleErrors.push("pageerror: " + e.message));
page.on("response", (r) => { if (r.status() >= 400 && r.request().method() === "GET") report.failedRequests.push(`${r.status()} ${r.url()}`); });

await page.goto(url, { waitUntil: "networkidle" });
if (url.includes("preview.html")) await page.waitForSelector("html[data-preview-ready='1']", { timeout: 15000 }).catch(() => report.consoleErrors.push("preview never became ready"));
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForTimeout(wait);

const shot = async (name) => { const f = join(out, name); await page.screenshot({ path: f }); report.files.push(f); };
const scrollTo = async (y) => { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(750); };

if (section) {
  const box = await page.evaluate((id) => {
    const el = document.getElementById(id);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top + scrollY, height: r.height };
  }, section);
  if (!box) report.consoleErrors.push(`section #${section} not found`);
  else {
    const n = Math.max(frames, 4);
    const start = Math.max(0, box.top - H * 0.6), end = box.top + box.height - H * 0.4;
    for (let i = 0; i < n; i++) { await scrollTo(start + (end - start) * (i / (n - 1))); await shot(`${section}-${String(i).padStart(2, "0")}.png`); }
  }
} else if (frames > 0) {
  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  for (let i = 0; i < frames; i++) { await scrollTo(total * (i / Math.max(1, frames - 1))); await shot(`frame-${String(i).padStart(2, "0")}.png`); }
} else {
  await shot("view.png");
}
if (flag("--full")) {
  await scrollTo(0);
  const f = join(out, "full.png");
  await page.screenshot({ path: f, fullPage: true });
  report.files.push(f);
}

Object.assign(report, await page.evaluate(() => {
  const overflowX = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  const text = document.body.innerText;
  const emDashes = [];
  let i = text.indexOf("\u2014");
  while (i > -1 && emDashes.length < 10) { emDashes.push(text.slice(Math.max(0, i - 30), i + 30)); i = text.indexOf("\u2014", i + 1); }
  return { overflowX, emDashes };
}));

await browser.close();
console.log(JSON.stringify(report, null, 2));

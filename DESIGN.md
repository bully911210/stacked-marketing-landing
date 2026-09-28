# Stacked v2: design system and build rules

Read this whole file before touching anything. It is the contract every section is built against.

## 0. The situation

The client (Franz) rejected the first version of this site as "HORRENDOUS". What he hated: an admin-dashboard look (sidebars, logs, small mono labels), a beige/grey colour pairing, boxes everywhere, and timid animations. What he approved: the current hero (`sections/hero.html`, `css/hero.css`, `js/hero.js`). Open `http://localhost:4501/preview.html?s=hero` and study it before building. **Every section must feel like it was designed by the same person, at the same level of care, as that hero.**

Reference bar: Stripe, Linear, Vercel, Apple product pages. Clean, light, premium SaaS. Confident large type, generous white space, real-looking product visuals built in HTML/CSS/SVG, depth from layered planes and soft shadows, motion that explains something.

## 1. Facts: the ONLY claims the page may make

Never invent a number, client, testimonial, statistic, timeline, contract term, team detail or feature. If a sentence needs a fact that is not here, rewrite the sentence.

**Offer**
- **Meta Ads Foundations: R0.** Built free. The whole setup becomes the client's to keep after 3 months of Managed Meta Ads (never say "you keep it" without that condition). Four parts:
  - Website: a fast, mobile-first page built to turn a click into a conversation.
  - Pixel (and tracking): Meta Pixel and Conversions API, so Meta learns who actually becomes a lead.
  - Forms: lead forms (Meta instant forms and on-site forms) that ask the right questions and reach the business instantly.
  - WhatsApp assistant (bot): replies instantly, asks qualifying questions, hands hot leads to a human, follows up if there is no reply.
- **Why free:** "Because we won't run ads on a broken foundation. Building the site, tracking, forms and WhatsApp bot properly is how we make sure your ad money turns into leads." Also: "The part most businesses skip, and why their ads don't work."
- **Managed Meta Ads: R10,000 a month management + R10,000+ a month ad spend (minimum, you can spend more) = R20,000 a month. Leads guaranteed.**
  - What it covers: campaign structure, audience build, ad creative (static and video), ad copy, A/B testing, restricted-category compliance, budget pacing, cost-per-lead tracking, a lead-quality feedback loop, weekly optimisation, a monthly report.
  - "We make money running the engine, not building it."
- **Guarantee:** "Leads. Guaranteed." / "If you're on Managed Meta Ads, you get leads. That's the deal." The exact terms are NOT known. Never state a lead number, timeframe, refund, or condition. The only allowed action is "Ask us for the exact terms" (WhatsApp). If `window.STACKED.guarantee.terms` is non-empty, render those strings verbatim; otherwise render nothing for terms.
- **Proof:** Stacked is the sole advertising agency for SIG Solutions: "SIG Solutions trusts one agency with all of its advertising. Us." Categories SIG advertises in: Firearms insurance, Funeral cover, Financial services, Recruitment. "Firearms insurance, funeral cover and financial services are among the hardest categories to advertise on Meta. If we get leads there, we can get them for you." No other clients, no logos, no quotes, no results. Stacked also runs Meta ads for info products, membership communities and non-profit subscriptions (confirmed by the client 2026-09-28); these may appear as enquiry categories, but never attribute them to SIG Solutions.
- **Contact:** WhatsApp, number from `window.STACKED.whatsapp` (display `062 177 9799`). Use `Stacked.waLink(text)` to build links. Domain: stackedmarketing.co.za.
- **Unknown, so never mentioned:** whether ad spend is paid to Meta or to Stacked; contract length; how fast setup goes live; who owns the ad account; what happens with poor lead quality; any price other than those above.

**Numbers allowed on the page:** R0, R10,000, R10,000+, R20,000. That is all. UI mocks must not contain fake metrics (no CTR, CPL, lead counts, percentages, star ratings, "+23%"). Mock UIs use labels and skeleton lines instead of data. Times like "just now" and "online" are fine; clock times and dates are not.

## 2. Copy rules

- South African English: enquiry, optimise, colour, programme.
- Written from the customer's side (a business owner who wants more customers). No internal jargon ("the stack", "layers", "funnel architecture"), no agency buzzwords ("synergy", "leverage", "cutting-edge", "unlock", "supercharge", "seamless").
- Short sentences. Plain words. One idea per sentence.
- **Never use an em dash (the long dash). Anywhere. Not in copy, not in comments, not in alt text.** Use a period, comma, colon or parentheses. The build fails if one exists.
- No emoji in page copy.
- Primary CTA label everywhere: **"Get my free setup"** (links to `#start`).
- Headlines: sentence case, end with a period when they are a statement.

## 3. Visual rules

**Colour.** White `--bg` is the page. `--bg-2` (#f7f8fa, cool near-white) is the only alternate light ground. One section (`#problem`) is dark: `--ink` (#0a0b0f) ground with white text. Accent is `--blue` (#0866ff), used sparingly: links, one highlight per view, a focus state. WhatsApp green `--wa` only inside WhatsApp mocks and success states. No other hues except the soft blue/green glows already used in the hero.

**Banned, no exceptions:**
- Beige, cream, sand, warm grey grounds.
- Dashboard/admin/terminal chrome: sidebars, logs, status bars, monospace labels, uppercase tracking-wide micro-labels.
- Grids of identical bordered boxes (three or more same-looking cards in a row is the thing he hated). If content is a list of equals, find a composition: one large visual plus a list, a sequence, a stack, tabs, an editorial layout.
- Gradient text, neon glows, coloured zero-offset halos, glassmorphism stacks, blob backgrounds, stock photos, icon fonts, emoji.
- "Scroll" hints, `01 / 06` counters, an eyebrow/kicker over every heading. Kickers (`.kicker`) are allowed only in `#how`, `#free`, `#pricing`.
- Centering everything. Vary alignment between sections.

**Type.** Use the tokens in `css/base.css`: `.h2` for section headings (one per section, a real `<h2>`), `.h3`, `.lead` for the sub-line, body at 17px. Display font Inter Tight, text Inter. Big type is the premium signal: do not shrink headings to fit clutter, cut the clutter.

**Depth.** The hero technique: product mocks as separate planes (back, mid, front) with `--shadow-lg`, slight rotations, overlap, and differential motion. Reuse the shared mocks in `css/base.css` (`.ad`, `.phone` + `.wa` + `.msg`, `.toast`, `.browser`) by composing them; do not restyle their base classes. You may scale them (`transform: scale()`) and build new mocks in your own namespace.

**Radius and spacing.** `--r-sm` 10, `--r-md` 18, `--r-lg` 28. Section padding `--section`. Content width `.wrap` (1120px).

## 4. Motion rules

- Every section has **one signature motion moment** that explains its message (described in your brief). Everything else is quiet: entrances via `data-reveal` (optional `data-reveal-delay="120"`).
- Animate only `transform`, `opacity`, `clip-path`, `filter: blur()` sparingly. Never width/height/top/left. No `transition: all`.
- Easing `var(--ease)`. Durations 400 to 1100ms. Nothing bouncy, nothing looping forever except the tiniest ambient touch (a slow rotation, typing dots).
- Scroll-linked motion: use `Stacked.onFrame(fn)` + `Stacked.progress(el)` / `Stacked.through(el)` (see `js/base.js`). Do **not** start your own `requestAnimationFrame` loop. Sticky/pinned scenes are allowed only where your brief says so; pinned tracks max 320vh on desktop, max 220vh on mobile, and every frame of the pinned range must show meaningful content (no empty screens).
- Pointer effects: only when `Stacked.fine`, read `Stacked.pointer`, small amplitudes (under 12px, under 6deg).
- **Reduced motion** (`Stacked.reduce` / `prefers-reduced-motion`): show the final, complete state. All content visible. No pinning required.
- **Mobile is its own composition**, not a shrunken desktop. Test at 390x844. No horizontal page overflow. Tap targets at least 44px.

## 5. Files and code

You own exactly these files for your section `<name>` (and nothing else):
- `sections/<name>.html`: a fragment whose root is `<section id="<id>" class="section ..." aria-labelledby="<id>-h">` with an `<h2 id="<id>-h">`.
- `css/<name>.css`: every selector scoped under `#<id>` or prefixed with `<name>__`. Never restyle base classes globally.
- `js/<name>.js` (optional): an IIFE that finds its own section root, returns early if missing, uses `window.Stacked`, leaks no globals, handles errors (no silent catches).
- The `cta` builder also owns `privacy.html`.

Do **not** edit `css/base.css`, `js/base.js`, `index.template.html`, `build.mjs`, `preview.html`, other sections' files, or `index.html` (the orchestrator assembles it). If you believe base.css needs a change, say so in your report instead.

Section ids: hero `top`, how `how`, problem `problem`, free `free`, run `run`, pricing `pricing`, proof `proof`, faq `faq`, cta `start`.

Code: semantic HTML, decorative mocks `aria-hidden="true"`, real text in the DOM, interactive controls as `<button>`/`<a>` with visible focus, 4.5:1 contrast for text. Files under 400 lines each. No external libraries or CDNs (Google Fonts already loaded).

## 6. How to verify (mandatory, iterate until it is genuinely good)

A server runs at `http://localhost:4501` serving this folder. Check with `curl -s -o /dev/null -w "%{http_code}" http://localhost:4501/preview.html`. If it is not 200, start it in the background: `node C:/Users/baden/.claude/skills/scroll-craft/scripts/serve.mjs --root <this folder> --port 4501`.

Preview your section in context (with the previous section above it and a spacer after):
`http://localhost:4501/preview.html?s=<prev>,<name>&pad=1`

Screenshot tool (run from this folder):
```
node tools/snap.mjs --url "http://localhost:4501/preview.html?s=<prev>,<name>&pad=1" --out lab/<name>/desk --section <id> --frames 6
node tools/snap.mjs --url "http://localhost:4501/preview.html?s=<prev>,<name>&pad=1" --out lab/<name>/mob --section <id> --frames 6 --mobile
node tools/snap.mjs --url "http://localhost:4501/preview.html?s=<name>" --out lab/<name>/reduced --reduced --full
```
It prints a JSON report (console errors, failed requests, horizontal overflow, em dashes). All must be clean. Then **open and look at every PNG** with the Read tool. Judge it like the client will: would this sit next to the hero on a Stripe-quality page? Is anything cramped, misaligned, overlapping, clipped, empty, or boxy? Fix and re-shoot. Look at intermediate scroll frames, not just the end state.

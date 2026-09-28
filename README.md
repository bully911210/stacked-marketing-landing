# stackedmarketing.co.za

Static site. No framework, no build on Vercel: the repo root is served as-is
(see `vercel.json`; source files listed in `.vercelignore` are not served).

## Editing

- Page sections live in `sections/<name>.html` with `css/<name>.css` and `js/<name>.js`.
- `node build.mjs` assembles `index.html` from `index.template.html` and the sections.
  Always rebuild and commit `index.html` after editing a section.
- `DESIGN.md` holds the design rules and the only facts the page may state.
- Facts (WhatsApp number, prices) live in `config.js`.
- `preview.html?s=hero,how` previews single sections; `tools/snap.mjs` screenshots them
  (needs a local static server and playwright-core).

Pushing to `master` deploys to production on Vercel.

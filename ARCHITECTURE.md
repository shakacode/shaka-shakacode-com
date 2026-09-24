# shaka-shakacode-com architecture

## Decision

- Canonical docs stay in `shakacode/shaka` under `docs/`.
- This repository is the site: homepage, site-only pages (case studies), navigation,
  styling, and the transforms that prepare the synced docs.
- The site copies the docs at build time. It follows shakapacker.com and reactonrails.com.

## Framework

Docusaurus, under `prototypes/docusaurus`.

## Content flow

```text
shaka/docs  -->  content/upstream/docs  -->  prototypes/docusaurus/docs  -->  build  -->  Cloudflare
```

1. `npm run sync:docs` copies `docs/` from Shaka into `content/upstream/docs`. It uses
   `SHAKA_REPO` if set, then a sibling `../shaka` checkout, then a shallow clone of
   `SHAKA_REPO_URL` at `SHAKA_REF` (default `main`).
2. `npm run prepare:docs` copies them into the Docusaurus docs directory and rewrites links
   that leave `docs/` (for example into `skills/`) to GitHub URLs.
3. `npm run build:site` builds static output at `prototypes/docusaurus/build`. Broken links
   fail the build.
4. `site-build-deploy.yml` deploys the output to Cloudflare as a Worker with static assets
   (see [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md)).

## Rebuild triggers

- Pushes to `main` here, pull requests (preview deploys), and manual runs.
- A `docs-updated` `repository_dispatch` event from `shakacode/shaka` when its `docs/`
  changes on `main` (`shaka/.github/workflows/trigger-docs-site.yml`).

## Deployment target

- Cloudflare Worker: `shaka-shakacode-com` (static assets, `wrangler.toml`)
- Custom domain: `https://shaka.shakacode.com/`

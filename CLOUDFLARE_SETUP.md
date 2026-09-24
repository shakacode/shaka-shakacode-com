# Cloudflare Pages setup

## Target

- Pages project: `shaka-shakacode-com`
- Default hostname: `https://shaka-shakacode-com.pages.dev/`
- Custom domain: `shaka.shakacode.com`

## GitHub secrets (maintainer)

Set in `shakacode/shaka-shakacode-com` → Settings → Secrets and variables → Actions:

- `CLOUDFLARE_API_TOKEN` (Cloudflare Pages edit)
- `CLOUDFLARE_ACCOUNT_ID`

Optional repository variable: `CLOUDFLARE_PAGES_PROJECT` (defaults to `shaka-shakacode-com`).

Later, for hosted search: `ALGOLIA_APP_ID` and `ALGOLIA_SEARCH_API_KEY` secrets and the
`ALGOLIA_INDEX_NAME` variable. Until all three exist, the site uses its bundled local search.

## Custom domain

In the Cloudflare dashboard: Workers & Pages → `shaka-shakacode-com` → Custom domains →
add `shaka.shakacode.com`. Cloudflare provisions TLS automatically.

## Legacy hosts

`workflows.shakacode.com` and `agents.shakacode.com` served the retired Agent Workflows
site. At switchover, 301-redirect both to `https://shaka.shakacode.com`, keeping paths.

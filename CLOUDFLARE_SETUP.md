# Cloudflare setup

The site deploys as a Cloudflare Worker with static assets (Cloudflare's current form of
Pages), configured in [`wrangler.toml`](wrangler.toml).

## Target

- Worker: `shaka-shakacode-com`
- workers.dev hostname: `https://shaka-shakacode-com.<account-subdomain>.workers.dev/`
- Custom domain: `shaka.shakacode.com`, attached by the `routes` entry in `wrangler.toml`
  when `main` deploys.

## Deploys

- Pushes to `main`, `docs-updated` dispatches from `shakacode/shaka`, and manual runs on
  `main` run `wrangler deploy`.
- Pull requests from this repository run `wrangler versions upload --preview-alias pr-N`,
  which creates a preview URL without changing the live site.
- Locally: `npm run cloudflare:deploy`.

## GitHub secrets (maintainer)

Set in `shakacode/shaka-shakacode-com` → Settings → Secrets and variables → Actions:

- `CLOUDFLARE_API_TOKEN` (Workers Scripts edit, plus Workers Routes and DNS edit on
  `shakacode.com` for the custom domain)
- `CLOUDFLARE_ACCOUNT_ID`

Later, for hosted search: `ALGOLIA_APP_ID` and `ALGOLIA_SEARCH_API_KEY` secrets and the
`ALGOLIA_INDEX_NAME` variable. The site uses its bundled local search until both secrets are
set; once they are, the index variable is required and the build fails without it.

## Legacy hosts

`workflows.shakacode.com` and `agents.shakacode.com` served the retired Agent Workflows
site. At switchover, 301-redirect both to `https://shaka.shakacode.com`, keeping paths.

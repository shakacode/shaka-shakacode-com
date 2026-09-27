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
- Same-repository pull requests build a branch preview at a stable `workers.dev` URL. The
  **Build Branch Preview** workflow checks out the PR head and uploads only the static site.
  After that build succeeds, **Publish Branch Preview** runs from trusted `main`, checks that
  the PR head is still current, uploads the static assets with `wrangler preview`, probes the
  URL, and posts it on the PR. The build job is not passed Cloudflare credentials or Algolia
  secrets, so previews use bundled local search. The production route is unchanged.
- Closing a PR deletes its preview and updates the preview comment. Existing or conflicted
  PRs can be previewed by running **Build Branch Preview** from `main` with the PR number and
  `publish`; use `delete` from `main` to retry cleanup for a closed PR.
- Locally, preview a branch with `npm run dev`.
- Locally: `npm run cloudflare:deploy`.

## GitHub secrets (maintainer)

Set in `shakacode/shaka-shakacode-com` → Settings → Secrets and variables → Actions:

- `CLOUDFLARE_API_TOKEN` (Workers Scripts edit, plus Workers Routes and DNS edit on
  `shakacode.com` for the custom domain)
- `CLOUDFLARE_ACCOUNT_ID`

The same repository secrets are used by the trusted preview publisher. The token needs
Workers Scripts edit permission for Worker Previews. Same-repository PR workflows can be
edited by contributors with write access and can reference repository secrets. For enforced
separation, a maintainer can move Cloudflare credentials to an environment restricted to
`main` and grant that environment only to the trusted publisher and production deploy job.

Later, for hosted search: `ALGOLIA_APP_ID` and `ALGOLIA_SEARCH_API_KEY` secrets and the
`ALGOLIA_INDEX_NAME` variable. Set all three together. With none set, the site uses its bundled
local search; a partial set fails the build. The workflow passes the index variable only when
both secrets exist, so the variable alone changes nothing.

## Legacy hosts

`workflows.shakacode.com` and `agents.shakacode.com` served the retired Agent Workflows
site. At switchover, 301-redirect both to `https://shaka.shakacode.com`, keeping paths.

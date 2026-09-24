# AGENTS.md

This repository builds the docs site for [Shaka](https://github.com/shakacode/shaka),
published at `shaka.shakacode.com`. The migration plan is in
[`plans/docusaurus-migration.md`](plans/docusaurus-migration.md).

## Docs ownership

- Canonical docs are written in `shakacode/shaka` under `docs/`. This repository
  only presents them. Do not add canonical docs content here.
- This repository owns the homepage, site-only pages, navigation and footer,
  styling, and the transforms that prepare the synced docs.

## Agent Workflow Configuration

Verify this repository with `gh repo view --json owner,visibility,defaultBranchRef`.
Resolve the trusted default branch to an immutable commit. Load and validate
`.agents/agent-workflow.yml` with the trusted installed `shaka seam check --root . --ref SHA`
command. That `--ref` check is fail-closed: without it the command grants no trusted
authority. Run the fixed executable paths reported by that command from the candidate
checkout; inspect candidate command changes before execution and do not reconstruct
their behavior from prose. `shaka seam check --root . --local` validates
current-checkout syntax and grants no trusted policy. `AGENTS.md` retains human-only boundaries.

## Human-only boundaries

- Never push to `main`; every change goes through a PR.
- Secrets, Cloudflare settings, custom domains, and branch protection are set by a
  maintainer. Agents may say what to set but never handle secret values. The custom
  domain in `wrangler.toml` changes only through a PR the maintainer merges.

# Shaka docs site: Docusaurus migration plan

Status: APPROVED 2026-09-23 (decisions D1–D4 settled below)
Owner: Justin (decisions and secrets); agents (execution with `/shaka`)
Site repo: `shakacode/shaka-shakacode-com`
Domain: `shaka.shakacode.com`

## 1. Goal

Shaka gets a Docusaurus docs site built the same way as shakapacker.com,
reactonrails.com, shakaperf.com and django-rspack.com. The docs are written in
`shakacode/shaka/docs/`, the site copies them in on every build, and a docs change
in Shaka republishes the site automatically. The site also holds content that
doesn't belong in the Shaka repo, such as onboarding for people who build apps
with AI but have never opened a pull request. The current Astro site
(`shakacode/agent-workflows-com`) keeps running until the switchover, then is
retired.

Done means:

- `shaka.shakacode.com` is live and shows `shaka/docs` content from `main`, plus
  the site-only pages chosen in the content audit (§5, PR 2).
- A docs-only PR merged in `shakacode/shaka` rebuilds and redeploys the site with
  no manual step.
- `workflows.shakacode.com` and `agents.shakacode.com` 301-redirect to
  `shaka.shakacode.com`, keeping paths.
- `shakacode/agent-workflows-com` is archived after its open PRs and issues are
  audited for anything worth keeping.
- Shaka's GitHub homepage field points to `shaka.shakacode.com`.

## 2. Why (evidence, 2026-09-23)

- Shaka's GitHub homepage field points to workflows.shakacode.com, which still
  serves the old agent-workflows pitch: "Agent Workflow Playbook", "The stack",
  "Distributions", and fleets of agents. People arriving from Shaka land on the
  predecessor product.
- Site PR shakacode/agent-workflows-com#61 uses the in-between
  "ShakaCode Workflows / `$sw`" naming and pulls guides from
  `shakacode/workflows`, which has since been renamed to `shakacode/shaka`. It
  has merge conflicts. Its useful parts are reviewed in the PR/issue audit
  (§5, PR 5), but the PR itself is not rescued.
- The succession is already decided: shakacode/shaka#173 (Shaka is the 0.0.x
  successor) and shakacode/agent-workflows#857 (freeze and retire
  agent-workflows).
- Switching to Docusaurus throws away the Astro-specific plumbing that was the
  reason to keep the old repo. A fresh repo copied from a sibling site beats
  converting the old one in place.

## 3. How the sibling sites work (the template)

Good examples: shakacode/reactonrails.com, shakacode/shakapacker.com and
shakacode/shakastack-com.

- The docs are written in the product repo (for example, `shakapacker/docs/`).
  The site repo holds only the homepage, site-only pages, navigation and
  footer, styling, and the transforms that prepare the docs.
- `scripts/sync-docs.mjs` finds the product repo in this order: an environment
  variable, then a sibling directory, then a shallow clone.
- `scripts/prepare-docs.mjs` copies the docs into `prototypes/docusaurus/docs`
  and rewrites links and page addresses. That includes links that only work on
  GitHub, like the other product repos' links into their source trees.
  `scripts/audit-docs.mjs` checks the result.
- The product repo has `.github/workflows/trigger-docs-site.yml`. On a push to
  `main` that touches `docs/**`, it uses a token from the `DOCS_DISPATCH` GitHub
  App to send a `docs-updated` event (`repository_dispatch`) to the site repo.
- The site repo's `.github/workflows/site-build-deploy.yml` runs on a push to
  `main`, on that event, and on manual runs. It builds from the product repo's
  `main` and deploys to Cloudflare Pages.
- The rules on who owns what (see reactonrails.com's README): canonical docs go
  in the product repo. Site-side overrides are temporary only and must be noted
  in the PR.

## 4. Decisions (settled 2026-09-23)

- **D1. Domain:** `shaka.shakacode.com`; repo `shakacode/shaka-shakacode-com`
  (dashes, so the repo name matches the Cloudflare Pages project name).
- **D2. Skill references (`skills/shaka/references/`):** don't sync them into
  the site for now. Link to them on GitHub, and make the link prominent (in the
  navigation or footer and on getting-started), because the skills' wording
  should be high quality and easy to find. Revisit syncing them later.
- **D3. Old projects:** put a pointer to Shaka on them now (§5, PR 1). Few
  people used them, so this is a small clean-up.
- **D4. Where this plan lives:** in the new repo, at
  `plans/docusaurus-migration.md`.

## 5. Work breakdown (PRs)

Every PR runs through `/shaka`, with merge policy ask. The new repo gets its
Shaka seam before any other work.

Order: PR 0 comes first. After it, PR 1, PR 2 and PR 3 can run in parallel.
PR 4 needs PR 2 and PR 3. PR 5 comes last.

### PR 0. Seam and plan (new repo, first PR)

- Create `shakacode/shaka-shakacode-com` (public, starting with a README).
- Configure it for Shaka: `.agents/agent-workflow.yml`, `.agents/bin/setup`,
  `.agents/bin/test`, `.agents/bin/validate`,
  `.agents/trusted-github-actors.yml` and `AGENTS.md`, with merge policy ask.
  Until the Docusaurus copy lands, validation checks that every tracked text
  file ends with a newline, and tests that check. `shaka seam check --root .
  --local` checks the seam's syntax only; trusted policy is loaded with
  `shaka seam check --root . --ref SHA` from an immutable `main` commit. CI
  does not install Shaka. PR 2
  expands the scripts to `npm ci`, `npm test` and `npm run build`.
- Add this plan at `plans/docusaurus-migration.md`.

### PR 1. Pointers on the old projects (small, any time)

- agent-workflows-com: a site-wide banner, "This project is now Shaka →
  shaka.shakacode.com" (the GitHub repo until the new site is live), plus the
  same notice in its README. The old site keeps working otherwise.
- agent-workflows: a README notice pointing to Shaka. This is item 1 of
  shakacode/agent-workflows#857, which that issue's freeze policy allows.

### PR 2. Docusaurus site copied from shakapacker.com, plus a content audit

Repo: `shakacode/shaka-shakacode-com`.

- Copy shakapacker.com as the starting point: the Docusaurus setup under
  `prototypes/docusaurus`, `scripts/*`, `site-build-deploy.yml`,
  `CLOUDFLARE_SETUP.md`, `ARCHITECTURE.md` and `.coderabbit.yaml`. Replace every
  Shakapacker name, URL, repo and package. Keep the Algolia wiring switched off
  (it only turns on when its secrets exist; see §6).
- Point `sync-docs.mjs` at Shaka: `SHAKA_REPO`, then `../shaka`, then a shallow
  clone of `https://github.com/shakacode/shaka`, with `SHAKA_REF: main`.
- Sidebar, from `shaka/docs`: getting-started, working-with-shaka,
  pr-verification, configure-repository, settings, workflow, migration,
  coding-agents, repository-catalog (included, and expected to grow soon),
  writing-preferences, and control-towers under an "Advanced" heading. Add a
  prominent link to the skill references on GitHub (D2).
- Homepage: built from Shaka's README pitch ("Give your coding agent a task. Get
  a tested, reviewed PR that's easy to understand."), the `$shaka` example, the
  benefits list, and a "Get started" link.
- **Content audit of the old site (do this before copying anything).** Go
  through every page and component of agent-workflows-com and sort each into
  one of three groups:
  - **Keep:** site-only content that still fits Shaka. The expected keep is the
    adoption ladder, rewritten for people who build apps with AI but don't know
    what a pull request is. Also the case study
    (`src/pages/case-studies/30-ai-assisted-commits.md` and
    `public/images/case-studies/ai-audit/*`).
  - **Maybe:** list these with a one-line reason each, for Justin to decide.
  - **Drop:** content only about the fleet or "the stack" (for example,
    Topology, BatchLifecycle and DistributionLineage).

  Commit the audit as `plans/old-site-content-audit.md`. Carry over only the
  Keep items in this PR. The Maybes wait for Justin's answers.
- No agent-coordination or dashboard content.
- Update the seam scripts to the real `npm` commands.
- Deploy as the Cloudflare Worker `shaka-shakacode-com` (static assets; Cloudflare's
  current form of Pages). `wrangler.toml` attaches `shaka.shakacode.com` when `main`
  deploys; pull requests build without deploying, so only merged code gets
  Cloudflare credentials.
- Verify: `npm run build` and `npm run audit:docs` pass; the rendered site is
  checked on desktop and at 390px mobile width; there are no console errors.
- The README describes who owns what, following reactonrails.com's rules.

### PR 3. Shaka side (`shakacode/shaka`)

- Add `.github/workflows/trigger-docs-site.yml`, copied from shakapacker's, with
  `repositories: shaka-shakacode-com` and
  `repository: shakacode/shaka-shakacode-com`.
- AGENTS.md: "Docs are written in `docs/`; shaka.shakacode.com only presents
  them. Do not add docs content to the site repo."
- Fix, in `shaka/docs`, any broken links or pages that PR 2's `audit:docs`
  reports. Do not paper over them with overrides in the site repo.

### PR 4. Carry over the Maybes

After Justin decides on each Maybe from the content audit, carry over the ones
he approves.

### PR 5. Switchover and retirement

- Move `shaka.shakacode.com` onto the new Cloudflare Pages project.
- Add 301 redirects that keep paths and query strings:
  `workflows.shakacode.com` → `shaka.shakacode.com` and
  `agents.shakacode.com` → `shaka.shakacode.com`.
- Update Shaka's GitHub homepage field and every link to the site in Shaka's
  README and docs.
- **Audit agent-workflows-com's unmerged PRs and open issues** (including
  shakacode/agent-workflows-com#61, #60, #39, #44, #45, #46 and #49). Carry
  anything useful to the new repo, or into `shaka/docs`, as its own issue or
  PR. Then close each one, with a link to where its useful part went.
- Archive agent-workflows-com. Justin approves this step.

## 6. Checklist for Justin: secrets and dashboard settings

Justin, as the maintainer, applies these (by hand or by running a command an
agent prepares). Agents may document the settings but never apply them or
handle secret values, per `AGENTS.md`.

0. **Branch protection on `main`** (right after PR 0 merges): require the
   `validate` check and pull requests. Justin runs the prepared `gh api`
   command after PR 0 adds the `validate` job.
1. **`shakacode/shaka-shakacode-com` → Settings → Secrets → Actions** (before
   PR 2's first deploy):
   - `CLOUDFLARE_API_TOKEN` (Workers Scripts edit, plus Workers Routes and DNS
     edit on `shakacode.com` for the custom domain)
   - `CLOUDFLARE_ACCOUNT_ID`
2. **The docs-dispatch GitHub App** (the one behind `DOCS_DISPATCH_APP_ID`):
   install it on `shakacode/shaka-shakacode-com`, so it can receive the event.
3. **`shakacode/shaka` → Settings → Secrets → Actions** (before PR 3 merges):
   - `DOCS_DISPATCH_APP_ID`
   - `DOCS_DISPATCH_APP_KEY`

   Use the same values as in `shakacode/shakapacker`. They are repo secrets
   there, not org secrets.
4. **Cloudflare** (PR 5): `shaka.shakacode.com` attaches automatically when `main`
   deploys. Redirect `workflows.` and `agents.shakacode.com` to it.
5. **Later (Algolia):** create the Algolia app. Then set the
   `ALGOLIA_APP_ID` and `ALGOLIA_SEARCH_API_KEY` secrets and the
   `ALGOLIA_INDEX_NAME` variable on the site repo. The workflow already switches
   Algolia on once they exist, the same as shakapacker.com.

## 7. Out of scope

- Retiring `shakacode/agent-workflows` itself, beyond the README pointer.
  That's shakacode/agent-workflows#857 and follows its own gates.
- Agent-coordination and dashboard content.
- Algolia setup now (planned for later; see §6, item 5).

## 8. Risks

- Links in `shaka/docs` that only work on GitHub: the same situation as the
  other product repos, and handled the same way by `prepare-docs.mjs`.
  `audit:docs` catches what it misses.
- The dispatch credential is a GitHub App scoped to named repos. Keep its
  `repositories:` list to the one site repo.
- Moving the domain causes a short cutover window. Do it only after the preview
  is verified.

## 9. Execution

Every PR runs through `/shaka` (`$shaka` in Codex), with merge policy ask.
Start with PR 0, so the new repo has its seam before any other work lands.

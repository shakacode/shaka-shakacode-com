# Old site content audit: agent-workflows-com → shaka.shakacode.com

Source: `shakacode/agent-workflows-com` at `ce5adf9` (main), plus the banner branch `d48b768`.
Compared against: `shakacode/shaka` `README.md` and `docs/*.md`.
Read-only audit, 2026-09-23.

## Summary

| Decision | Rows |
| --- | ---: |
| Keep | 15 |
| Maybe | 6 |
| Drop | 22 |

Rows are pages, components, homepage sections, and methodology sections. Layout and tooling files are grouped.

**Name mix-up to check first:** the "Start with the consequences / What happens if this breaks?" ladder is the homepage `#verification` section plus `src/components/VerificationSpectrum.astro`. The file named `src/components/AdoptionLadder.astro` is something else: pack → repo seam → coordination backend levels. It is fleet material and is marked Drop.

**The most valuable content to carry over:**

1. **The consequences ladder** (`#verification` + `VerificationSpectrum.astro` + methodology "Balance verification with delivery"). It runs from "Just for me" to "Critical service" and already speaks to people building apps with AI. It fits the onboarding page for newcomers.
2. **The AI-audit case study** (`case-studies/30-ai-assisted-commits.md` + 6 images). This is real evidence. Its "found it, merged anyway" lesson maps onto Shaka's review and explained-PR steps.
3. **The methodology principles**: stopping rule, mindset, adversarial review, verification habits, and anti-patterns. They are tool-neutral and explain why Shaka works the way it does.
4. **The problem statement** (`#problem`): "The hard part isn't the code. It's knowing what was checked." It sets up Shaka's tested, reviewed, explained PR.
5. **The motto**: "Use AI aggressively, verify the risky parts, document what was learned, and keep shipping."

## Keep

| # | Path / section | What it says | Reason | Changes needed for Shaka |
| --- | --- | --- | --- | --- |
| K1 | `index.astro` § "Start with the consequences / What happens if this breaks?" (`#verification`), including "Make the next check earn its cost." | A disposable personal app needs no process. Add checks as people depend on it. A check must earn its cost. | This is the maintainer's named keeper, and it suits newcomers who build apps with AI. | Make it a site-only onboarding page. Replace "You don't need to learn a set of skills first" with a newcomer-friendly note that a PR is optional at first. Re-point the `/methodology/#…` link. |
| K2 | `src/components/VerificationSpectrum.astro` | Four cards: Just for me / Friends or coworkers / Customers depend on it / Critical service. Each has a consequence, an example, and practices. The caption says these are examples, not user-count thresholds. | This is the visual for K1. | Port the Astro component to React/MDX for Docusaurus. Change "No workflow pack or formal test suite required" to drop "workflow pack". Consider adding where Shaka starts to help, such as "Friends or coworkers: start using PRs." |
| K3 | `index.astro` § "01 / the problem" | Agents hand you plausible work, and you are left rebuilding what they read, changed, ran, and proved. | Motivates Shaka's evidence-first PR. | Rename "Agent Workflows" → Shaka. Remove "nothing to host" and "scale to many agents across many repositories." End by pointing to the PR description and walkthrough. |
| K4 | `index.astro` § "10 / methodology" | Motto quote plus a one-line summary of the playbook. | Short, durable, and on-brand. | Remove "the playbook". Link to the ported methodology page. |
| K5 | `methodology.md` intro | Distilled from a Justin–Robert session. Includes the motto. | Useful origin context. | Confirm Robert is fine being named on the new site. |
| K6 | `methodology.md` § "Balance verification with delivery" | Long-form version of K1. Covers the dev + verification + failure cost + delay trade-off, reducing exposure, and the Google SRE link. | Core of the keeper ladder. | Replace "You do not need a workflow pack" with "You do not need Shaka." Re-point `/#verification`. |
| K7 | `methodology.md` § "Give verification a stopping rule" | Name the evidence up front, and stop when it is met. Treat extra suggestions as observations. | Matches Shaka's "routine choices stay with the agent" and review handling. | Drop the paragraph about the Sept 5 backlog recovery plan, which links a retired agent-workflows plan. |
| K8 | `methodology.md` § "Mindset" | The agent is a partner, not an oracle. Ask precise next-step questions. Turn explanations into docs. | Tool-neutral and useful to newcomers. | None. |
| K9 | `methodology.md` § "Adversarial review before merge" | Review should hunt for what is wrong, and says what merge-ready means. | Explains why Shaka has an independent review step. | Link to Shaka `workflow.md` (Verify step) and `pr-verification.md`. |
| K10 | `methodology.md` § "Verification habits" | Evidence before assertions. Check that the CI step for *this change* ran. "The agent said it tested" is not proof. | Tool-neutral principle. | Link to `pr-verification.md` for the how-to. |
| K11 | `methodology.md` § "Convert confusion into issues and docs" | Research vague blockers, then file a self-contained issue or docs PR. | Still true, and pairs with Shaka's issue offer. | Optional link to `working-with-shaka.md#suggest-improvements-to-shaka`. |
| K12 | `methodology.md` § "Anti-patterns to avoid" | Six anti-patterns, such as "AI said it tested" and a big migration with no change map. | Short and memorable. | None. |
| K13 | `case-studies/30-ai-assisted-commits.md` | An AI reviewer found 2 real bugs lost in an 83-item PR timeline. Audit of 30 Shakapacker commits. Commit-noise problem. Two-controls model. | The maintainer's named keeper, and the strongest evidence on the site. | Keep the canonical URL pointing at the ShakaCode blog. Leave the body as published. Add a short editor's note mapping the lessons to Shaka: review findings handled before merge, explained PR, and long records in expandable sections. The closing paragraph links `agents.shakacode.com` and `agent-workflows`; re-point both to Shaka. Mark the agent-workflows issue links (#318, #249, #256, #257, #319) as historical, or drop them. The artifact table row "Coordination record" is fleet vocabulary; footnote it rather than rewrite it. |
| K14 | `public/images/case-studies/ai-audit/*` (cover, 2 review-finding crops, audit-distribution, commit-noise, two-controls) | Images for K13. | Required by K13. | Move to Docusaurus `static/img/case-studies/ai-audit/` and update the paths. The cover image shows no old branding. |
| K15 | `case-studies/index.md` | Framing ("which mistakes escape, which gates catch them") plus the study listing. | Landing page for K13. | Remove "coding-agent workflows" wording if it reads as the old product. |

## Maybe

Questions for you:

1. **Five-questions trust list** (`index.astro` § "02 / the model"). The old home page listed five things an agent should never leave unstated: what it was told, what it could touch, which checks ran, what proves it, and who reviewed it. Do you want that list on the new site, rewritten around what Shaka does? If yes, the "what it could touch" item probably goes away, because it described the old batch file-ownership list.
2. **Case-study teaser card** (`index.astro` § "06 / evidence" + `src/components/EvidenceProof.astro`). Do you want a short summary card for the AI-audit case study on the home page, or just a link to the full story? The card also says the fail-closed review gate is still open work, citing agent-workflows #249. That status would need rechecking against what Shaka enforces today.
3. **Safety section** (`index.astro` § "07 / the safety story"). Do you want a short page telling readers how Shaka handles untrusted input? The points would be: it only acts on comments from people you trust, and risky changes still need a person. Or is Shaka's own workflow doc ("What is enforced") enough? The old section uses "Rule of Two" and "security preflight" and links old agent-workflows security docs.
4. **Consulting pitch** (`index.astro` § "11 / for engineering teams"). Should the new site include a "ShakaCode can help your team" section with the contact link and the "since 2011 / 23M+ downloads" facts?
5. **Glossary** (`docs/terminology.md`). Do you want a plain-language glossary for newcomers? If yes, I would write a new one covering pull request, branch, test, review, and merge, and reuse only a few old definitions: current-head evidence, escaped defect, worktree, and human attention. Most of the old page is fleet vocabulary (lane, claim, worker utilization).
6. **Principles page** (`docs/throughput.md`). The old "throughput-first" page argues for getting the most checked, useful work for the time you spend reviewing, without skipping the few rules that always apply. Do you want a short principles page built from that, keeping "match checks to risk", "the few safety rules that always apply", and "treat the main branch as shared"? Or does the consequences ladder already say enough? Its "worker count", "current behavior", and "proposed direction" sections are fleet-era and would go either way.

## Drop

| # | Path / section | What it says | Reason |
| --- | --- | --- | --- |
| D1 | `index.astro` § hero | "The engineering system around your coding agents." CTA to agent-workflows. | Shaka has its own tagline and README hero. |
| D2 | `src/components/BatchLifecycle.astro` | Hero diagram: security gate → plan → split → run → review → audit, with shared coordination. | Describes the batch lifecycle. |
| D3 | `index.astro` § "03 / how it works" | The pack plus the `.agents/` seam, a 5-stage batch pipeline, and an Astra paragraph. | Batch pipeline. The seam is covered by Shaka `configure-repository.md`. |
| D4 | `index.astro` § "04 / what you get" | 10-skill catalog split into "day one" and "at scale". | The old skill inventory. Shaka is one skill. |
| D5 | `index.astro` § "05 / adoption" | Wrapper for AdoptionLadder. | Fleet adoption levels. Not the keeper ladder (see Summary). |
| D6 | `src/components/AdoptionLadder.astro` | Levels: one failure → standardize with a seam → coordinate parallel work. Plus "when not to add machinery". | Pack/backend/dashboard ladder. The nearest Shaka equivalent is `control-towers.md` ("Use Shaka for a few tasks before trying control towers"). |
| D7 | `index.astro` § "08 / the stack" | Pack, coordination backend, and dashboard cards. | Retired stack. |
| D8 | `src/components/Topology.astro` | Diagram: hosts → pack → backend → dashboard. | Retired stack. |
| D9 | `index.astro` § "09 / Git-native customization" | Upstream Releases and Derived Distributions. | Distribution model. |
| D10 | `src/components/DistributionLineage.astro` | Upstream → Derived → Consumer diagram. | Distribution model. |
| D11 | `docs/distributions.astro` | Full distribution and fork-sync target model. | Distribution model. Shaka covers forks in `getting-started.md` ("Use a personal fork") and `workflow.md` ("Customize the instructions"). |
| D12 | `methodology.md` § "Seam files preserve attention across repositories" | Why `AGENTS.md` and `.agents/` give each repo a consistent home. | Duplicates Shaka `configure-repository.md` / `settings.md`. At most, lift one sentence into K6. |
| D13 | `methodology.md` § "Measure before extracting more" | Skill-authoring advice: entrypoints, references, measured outcomes. | Internals for maintainers of the old pack. |
| D14 | `methodology.md` § "The core loop: plan → batch → review → audit" | The batch loop. | Replace with a link to Shaka `workflow.md`. |
| D15 | `methodology.md` § "Parallel work" | Claims, lanes, and the claim protocol. | Coordination backend. |
| D16 | `docs/index.md` | Docs landing page with agent-workflows links. | Replaced by the Docusaurus sidebar. |
| D17 | `docs/quickstart.md` | Install the pack, day-one skills, seam doctor, `agent-coord demo`. | Old install steps. Superseded by Shaka `getting-started.md`. |
| D18 | `docs/architecture.md` | Process, protocol, and operator planes. update-changelog byte measurements. | Retired three-repo architecture and pack internals. |
| D19 | `docs/astra.md` | Advisory Astra model-routing pilot in the old pack. | Old pilot. Shaka recommends a model and effort per task (`working-with-shaka.md`). |
| D20 | `src/layouts/Base.astro` + `public/og.png` + `public/favicon.svg` | "Agent Workflow Playbook" header, nav, successor banner, footer ("The stack", "plan → batch → review → audit"), and old-brand OG card. | Docusaurus provides the chrome, and the branding is retired. |
| D21 | `src/layouts/Doc.astro` | Markdown page wrapper. | Docusaurus provides it. |
| D22 | `src/styles/global.css`, `scripts/*` (check-adoption-ladder, check-links, og-card) | Styles and site tooling. | Not content. The adoption-ladder check guards a dropped component. The link checker could be revisited separately if Docusaurus's own checking falls short. |

## Duplicates of Shaka docs (prefer the Shaka doc)

| Old site content | Shaka doc to use instead |
| --- | --- |
| `docs/quickstart.md` (install, first skill) | `docs/getting-started.md` |
| `index.astro` § how it works (seam), `methodology.md` § seam files, `docs/architecture.md` § the repo seam | `docs/configure-repository.md`, `docs/settings.md` |
| `index.astro` § skills (verify, tdd, adversarial-pr-review, address-review) | `docs/workflow.md` (Implement / Verify / Review steps), `docs/pr-verification.md` § "Change one behavior at a time" |
| `index.astro` § model rows Validation / Evidence / Review | `docs/pr-verification.md`, `docs/workflow.md` § "What is enforced" |
| `methodology.md` § adversarial review and verification habits (the how-to parts) | `docs/pr-verification.md`, `docs/workflow.md`. Keep only the "why" on the site (K9, K10). |
| `index.astro` § model "Review… merge authority follows your repo policy" | `docs/working-with-shaka.md` § "Choose a merge policy" (Ask/Auto) |
| `index.astro` § safety "Trust-gated actors" | `docs/configure-repository.md` (`trusted-github-actors.yml`), `docs/workflow.md` enforcement table |
| `docs/distributions.astro`, `index.astro` § distributions (forking and customizing) | `docs/getting-started.md` § "Use a personal fork", `docs/workflow.md` § "Customize the instructions", `docs/migration.md` |
| `docs/astra.md` (model routing) | `docs/working-with-shaka.md` § "Give it an outcome" (model/effort recommendation) |
| Case study artifact table (commit vs PR description vs long records) | `docs/writing-preferences.md`, `docs/pr-verification.md` § "Keep the PR easy to read". Keep the case study itself; link these from its editor's note. |
| `AdoptionLadder.astro` level 03 / `methodology.md` § parallel work | Not a true duplicate. The closest Shaka concept is `docs/control-towers.md` (optional, advanced). |

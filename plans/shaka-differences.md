# Differences: old Agent Workflows site vs. how Shaka works

Recorded while carrying over the remaining old-site content (audit Keep K4–K13 and Maybe 1–6)
on branch `justin808-claude/carry-over-remaining-content`, 2026-09-23.

- Old site source: `shakacode/agent-workflows-com` at `ce5adf9` (Astro). Paths below are relative
  to it, for example `src/pages/methodology.md`.
- Shaka source: `shakacode/shaka` at `a419e92` (main). Paths below are relative to
  it, for example `skills/shaka/config/workflow.yml`. Line numbers refer to that commit.
- New site pages: `prototypes/docusaurus/src/pages/` in this repository.

Each entry gives the old claim, the Shaka reality with a citation, how the new site handles it,
and a status:

- **Changed**: the new page states Shaka's actual behavior instead.
- **Dropped**: the claim does not appear on the new site.
- **Flagged**: needs a decision from Justin (see [Open questions](#open-questions-for-justin)).
- **Consistent**: the old claim still matches Shaka; recorded so nobody rechecks it.

## Summary

| Topic | Entries |
| --- | ---: |
| Terminology | 16 |
| Review | 10 |
| Merge | 7 |
| Verification | 6 |
| Safety and trust | 12 |
| Setup and configuration | 7 |
| Scale and fleet | 9 |
| Evidence and PR contents | 8 |
| Other | 9 |
| **Total** | **84** |

Plus 10 items that could not be verified in Shaka (section [Could not verify](#could-not-verify-in-shaka)).

---

## Terminology

### T1. "Seam" includes `AGENTS.md`

- **Old:** `src/pages/methodology.md` § "Seam files preserve attention across repositories" lists
  three seam files: `AGENTS.md`, `.agents/bin/`, and `.agents/agent-workflow.yml`. The homepage
  § "03 / how it works" says `AGENTS.md` "points to each repo's commands and policies."
- **Shaka:** the seam is the configuration file plus standard scripts: "a configuration file and
  standard scripts—the repository **seam**" (`docs/getting-started.md` § "2. Configure your
  repository"). `AGENTS.md` is separate: "`AGENTS.md` adds constraints, not contract fields"
  (`skills/shaka/config/workflow.yml` Plan phase, line 55–56). `docs/configure-repository.md` lists
  `AGENTS.md` and `.agents/trusted-github-actors.yml` among the files setup prepares, but settings
  live only in `.agents/agent-workflow.yml` (`docs/settings.md` intro).
- **New site:** `glossary.md` § "Seam" defines it as the config file plus `.agents/bin/`
  scripts, and says setup *also* prepares `AGENTS.md` and the trusted-actors file.
- **Status:** Changed.

### T2. "Repo seam" as a named architecture layer

- **Old:** `src/pages/methodology.md` links "[repo seam](/docs/architecture/#the-repo-seam)",
  one of three "planes" (process, protocol, operator) in `docs/architecture.md`.
- **Shaka:** no planes. The seam is simply the repository's configuration (`docs/configure-repository.md`).
- **New site:** methodology does not port the seam section (audit D12). Glossary uses the
  plain definition.
- **Status:** Dropped.

### T3. "Current-head evidence" as a named term

- **Old:** `src/pages/docs/terminology.md` § "Current-head evidence": "Test, review, or CI
  evidence tied to the exact commit being considered."
- **Shaka:** does not use the phrase "current-head evidence." It says "current head"
  (`workflow.yml` lines 306, 328, 381), "current commit" (`docs/settings.md` §
  `review.ci_review_wait`), "current-head finding" (`workflow.yml` line 347), and "tested
  revision" (`workflow.yml` Verify phase). The meaning matches.
- **New site:** `glossary.md` § "Current head" defines the head and explains that evidence is
  tied to it. It does not coin "current-head evidence."
- **Status:** Changed (term renamed to match Shaka).

### T4. "Worktree"

- **Old:** `terminology.md` § "Worktree": separate Git checkout attached to a branch; lets
  independent changes run without sharing a directory.
- **Shaka:** "Use a new worktree when the checkout is dirty or another task occupies it;
  otherwise use a feature branch" (`workflow.yml` line 142). `docs/working-with-shaka.md`
  § "In your editor" mentions separate worktrees for human/agent turn-taking.
- **New site:** `glossary.md` § "Worktree" uses Shaka's trigger (dirty checkout or occupied by
  another task).
- **Status:** Consistent (definition), Changed (adds when Shaka uses one).

### T5. "Lane"

- **Old:** `terminology.md` § "Lane": "One bounded stream of work for a canonical issue or pull
  request, with its own ownership, status, verification, and outcome." Used across the homepage
  and methodology.
- **Shaka:** no lanes. "Own one task through its requested pull-request outcome"
  (`workflow.yml` line 5). Large work is split into sequential ordinary PRs with one owner
  (`docs/working-with-shaka.md` § "Split a large change").
- **New site:** not used anywhere.
- **Status:** Dropped.

### T6. "Coordination claim" vs. Shaka's `claim` command

- **Old:** `terminology.md` § "Coordination claim": "A recorded assertion that one live task
  owns a target. An atomic private claim prevents competing ownership." `methodology.md`
  § "Parallel work" describes a claim protocol that "refuses a competing claim."
- **Shaka:** has a command named `claim`, but it is a collision search, not a lock. "`claim
  QUERY` sets `collision` from an unqualified `gh pr list --search` … and from branch names on
  `origin` … Nothing then stops the second PR: acting on the collision is the agent's"
  (`skills/shaka/config/enforcement.yml` rule `one-pr-per-work-item`, `enforced_by: reported`).
- **New site:** `principles.md` table row "Two writers do not race on one task" says "The search
  is code; stopping is the agent's." The word "claim" is not used on the new site.
- **Status:** Changed. Note the name collision: readers of old material may assume Shaka's
  `claim` is an atomic lock. It is not.

### T7. "Skill" and the skill catalog

- **Old:** `terminology.md` § "Skill"; homepage § "04 / what you get" lists ten skills
  (`verify`, `tdd`, `adversarial-pr-review`, `address-review`, `update-changelog`,
  `plan-pr-batch`, `triage`, `pr-batch`, `batch-status`, `post-merge-audit`).
- **Shaka:** one skill, `shaka` (`skills/shaka/SKILL.md`), which prints a validated workflow
  (`shaka workflow`) and loads references as needed (`docs/workflow.md`). Control-tower skills
  (`rct`, `mct-claude`) are optional (`docs/control-towers.md`).
- **New site:** no skill catalog. Methodology describes habits, not skills.
- **Status:** Dropped.

### T8. "Safety floor"

- **Old:** `terminology.md` § "Safety floor" and `docs/throughput.md` § "Match assurance to risk;
  keep the floor": public text untrusted; no direct push to protected base; merge evidence tied
  to current change; contradictory writers stop; irreversible actions keep human authority.
- **Shaka:** no term "safety floor." Equivalent rules exist, spread across `workflow.yml`
  `always:` (lines 416–419), Finish phase (line 373), and `enforcement.yml`.
- **New site:** `principles.md` § "The few safety rules that always apply" maps each old floor
  item to the Shaka rule and states what enforces it.
- **Status:** Changed (term dropped, rules kept with enforcement labels).

### T9. "Throughput-first objective"

- **Old:** `docs/throughput.md` and `terminology.md` § "Throughput-first objective": "maximize
  valuable, verified software changes per unit of human attention, elapsed time, and tokens."
- **Shaka:** no named objective. Closest statements: README "You spend less time directing the
  process"; `workflow.yml` Plan "Minimize total work … avoiding rework is the saving" (line 98).
- **New site:** `principles.md` intro paraphrases the goal in plain words without the name.
- **Status:** Changed.

### T10. "Human attention", "elapsed time", "token budget"

- **Old:** `terminology.md` §§ "Human attention", "Elapsed time", "Tokens and token budget".
- **Shaka:** "human attention" appears once, in a contributor reference
  (`skills/shaka/references/documentation-verification.md` line 40). No token budget. Shaka
  reports token usage and estimated cost per PR (README "See what a PR cost";
  `skills/shaka/references/usage-reporting.md`).
- **New site:** not defined in the glossary. `methodology.md` keeps "count human attention …
  as costs" in plain prose.
- **Status:** Dropped from glossary.

### T11. "Escaped defect"

- **Old:** `terminology.md` § "Escaped defect": not caught by required assurance before reaching
  users.
- **Shaka:** term not found in Shaka docs, references, or workflow.
- **New site:** `glossary.md` keeps it under *General terms* (not Shaka terms), because the
  case study uses it ("escaped defects weighted by severity").
- **Status:** Flagged (keep as a general term, or remove).

### T12. "Worker", "useful concurrency", "worker utilization", "integration pressure", "machine capacity"

- **Old:** `terminology.md` §§ "Worker", "Useful concurrency", "Human decision pressure",
  "Integration pressure", "Machine and service capacity", "Worker utilization".
- **Shaka:** "Work solo unless delegation is authorized and useful" (`workflow.yml` line 5).
  Delegated workers exist but "own exclusive files or worktrees and never publish or merge"
  (line 149–150). No concurrency model or utilization metrics.
- **New site:** none of these terms appear.
- **Status:** Dropped.

### T13. "Task brief"

- **Old:** `terminology.md` § "Task brief"; `throughput.md` § "Brief the task; keep stable rules
  versioned."
- **Shaka:** the Plan phase renders a recommendation with one-line `value`, `scope`, `risk`,
  `model`, `effort`, and `reason` (`workflow.yml` Plan, `recommendation --content-file`).
  Workflow text is versioned YAML validated by Ruby (`skills/shaka/SKILL.md`).
- **New site:** not ported (the instruction limited `principles.md` to three principles).
- **Status:** Dropped.

### T14. "Shared main" vs. "default branch"

- **Old:** `terminology.md` § "Shared main"; `throughput.md` § "Treat shared main as shared
  infrastructure."
- **Shaka:** speaks of the "default branch" (policy source, `docs/settings.md`) and a task's
  "base branch" (`docs/settings.md` § `base_branch`), which may differ from the default branch.
- **New site:** `principles.md` § "Treat the main branch as shared"; `glossary.md` defines both
  "Main branch" (general) and "Default branch" (Shaka).
- **Status:** Changed.

### T15. Assurance vocabulary: "production promotion gate", "release train", "project risk / promotion risk", "assurance"

- **Old:** `terminology.md` § "Assurance and release".
- **Shaka:** none of these terms. No promotion or release gates in Shaka; release and deployment
  changes need explicit human review (`workflow.yml` line 373).
- **New site:** `principles.md` keeps the three example patterns in plain words (production
  service, product-discovery site, open-source project with scheduled releases) and says
  "Shaka has no preset profiles for these patterns."
- **Status:** Changed.

### T16. Measurement vocabulary: "telemetry", "planning latency", "review cycle", "integration cost", "human intervention"; claim status words "principle", "current behavior", "proposed direction"; "explanatory site and normative source pack"

- **Old:** `terminology.md` §§ "Measurement and status", "Explanatory site and normative source pack".
- **Shaka:** no telemetry vocabulary. Per-PR usage and provenance only (`usage-reporting.md`).
  Shaka's docs distinguish "shipped behavior, agent instructions, and proposed features"
  (`.agents/writing-style.md`), but without those labels. There is no separate normative source
  pack; the Shaka repo's docs are synced into this site at build time.
- **New site:** not used.
- **Status:** Dropped.

---

## Review

### R1. Maker–checker: "an independent checker QAs the maker's work"

- **Old:** `src/pages/index.astro` trust row "Review": "an independent checker QAs the maker's
  work, `adversarial-pr-review` red-teams the diff."
- **Shaka:** one local adversarial review in a fresh session before push, then GitHub reviewers
  after push. "What makes the review adversarial is the context, not the model: a fresh session
  that did not produce the change is a valid reviewer, including one running the implementation
  model" (`workflow.yml` line 170–173). A different provider is preferred
  (`docs/settings.md` § `review.local_review_agents`).
- **New site:** `methodology.md` § "Adversarial review before merge" and `glossary.md` §§
  "Adversarial review", "Independent review" describe Shaka's version.
- **Status:** Changed.

### R2. Independent review evidence

- **Old:** homepage trust row "Review" implies review is established by the skill running.
- **Shaka:** "Independent review for this task is satisfied by a published local `REVIEWED SHA
  BY PROVIDER/FAMILY` attestation, or by a verified report from `review.ci_review_jobs`, for
  the current head" (`workflow.yml` Review phase). "A green job alone proves no review" (same).
- **New site:** `glossary.md` § "Independent review"; homepage card "Who reviewed it?"
- **Status:** Changed.

### R3. Local review is not required by the merge command

- **Old:** homepage "Validation"/"Review" rows imply review gates are enforced.
- **Shaka:** "The merge command does not currently require this local-review evidence; the agent
  remains responsible for that step" (`docs/settings.md` § `review.required`, line 48–49).
- **New site:** `safety.md` § "What the merge helper refuses" lists only what the helper checks.
  Methodology does not claim enforcement.
- **Status:** Changed.

### R4. Unresolved review threads "triaged before work is called merge-ready"

- **Old:** homepage trust row "Review": "unresolved review threads are triaged before work is
  called merge-ready."
- **Shaka:** the workflow instructs the agent to "Collect every current-head finding into one
  repair batch. Fix demonstrated defects … Decline nits with a reason on the original thread"
  (`workflow.yml` lines 347–349). Enforcement: agent. "Nothing compares a resolution claim
  against the state of the reviews it claims to settle" (`enforcement.yml` rule
  `settled-resolution`). The merge helper "does not read or judge review findings for the agent"
  (`skills/shaka/references/local-review.md` line 151).
- **New site:** homepage evidence card field "Still up to the agent"; case-study editor's note;
  `safety.md` "The helper does not read or judge review findings."
- **Status:** Changed.

### R5. "Fail closed on unsettled configured reviews" is "still open work"

- **Old:** `src/components/EvidenceProof.astro` field "Still open": links agent-workflows #249
  and says "today the disposition rule is a practice a human has to hold, not something the
  system enforces." Case study § "Control 2" lists the same issue.
- **Shaka:** no Shaka doc calls this open work, and I found no Shaka issue for it in the files
  read. What exists: with `ci_review_wait: all`, the merge helper refuses `UNSTABLE`, so a
  pending configured review check blocks a helper-submitted merge (`enforcement.yml` rule
  `all-refuses-unstable`, `enforced_by: code`). With `none` or `one`, the helper accepts
  `UNSTABLE`. Counting verified review *reports* is agent-enforced (`docs/settings.md` §
  `review.ci_review_wait`: "The agent counts verified reports"). Per-finding disposition is
  agent-enforced (R4).
- **New site:** the homepage card does **not** say "open work." It states the current split:
  the workflow asks for disposition; the merge helper does not read findings.
- **Status:** Changed; Flagged (should Shaka track a code-enforced disposition gate as an issue?).

### R6. Stopping rule: "two-round continuation brake … still unshipped"

- **Old:** `methodology.md` § "Give verification a stopping rule": "a proposed two-round
  continuation brake and five-PR adoption pilot were still unshipped."
- **Shaka:** ships an agent instruction: "After two repair rounds, remaining nits do not start
  another cycle" (`workflow.yml` line 349; `review.md` § "Review limits and failure states").
  Enforcement: agent; "nothing counts repair rounds" (`enforcement.yml` rule
  `nits-do-not-restart-the-cycle`).
- **New site:** `methodology.md` drops the Sept 5 paragraph and adds a short paragraph stating
  Shaka's rule, linking the workflow YAML.
- **Status:** Changed.

### R7. Advisory bots

- **Old:** not distinguished; review bots treated as review.
- **Shaka:** "CodeRabbit, hosted Codex, and other unnamed bots are advisory: read completed
  findings, never wait for them except under the explicit comment-resolution settlement
  procedure" (`workflow.yml` Review phase).
- **New site:** not mentioned (too detailed for site pages).
- **Status:** Dropped (detail lives in Shaka docs).

### R8. "Review ledger" artifact

- **Old:** case study artifact table row "Review ledger: Current unresolved findings and their
  disposition."
- **Shaka:** no review ledger. Replies go on the original thread; "review history belongs in the
  description" details (`workflow.yml` Explain phase); "No extra approval, review receipt, or
  review service is introduced" (`local-review.md` line 152).
- **New site:** case-study body left as published (instruction). Only the "Coordination record"
  row is footnoted.
- **Status:** Flagged (footnote this row too?).

### R9. Follow-up issues as a disposition

- **Old:** case study and `EvidenceProof.astro`: one valid disposition is "converted into an owned
  follow-up with a defined trigger."
- **Shaka:** discourages follow-ups for bot findings: "do not implement speculative requests or
  create follow-up issues merely because a bot suggested them" (`review.md` § "Handle review
  findings" step 2). Remaining nits are "recorded for post-merge evaluation" (`workflow.yml`
  Review `done_when`). Late findings: "do not create an issue for every suggestion"
  (`review.md` § "Reviews after merge").
- **New site:** the homepage card keeps the three dispositions under the label "The lesson"
  (the case study's conclusion), and "What Shaka does now" states fix-or-decline.
- **Status:** Flagged (the card's "lesson" and Shaka's rule differ on follow-ups).

### R10. Post-merge batch audit

- **Old:** homepage § "03 / how it works" stage `post-merge-audit`; case study Control 2 "Audit
  merged batches, not only their branches before merge."
- **Shaka:** no post-merge audit step. Late reviews are handled by the delivery owner; "This
  workflow does not keep running or promise background review coverage. Do not add a monitor,
  extra audit, or tracker" (`review.md` § "Reviews after merge").
- **New site:** not claimed. Case-study body left as published.
- **Status:** Dropped (from new pages); body unchanged.

---

## Merge

### M1. "Merge authority follows your repo policy"

- **Old:** homepage trust row "Review."
- **Shaka:** explicit **Ask** (default) or **Auto** per repository and task
  (`docs/working-with-shaka.md` § "Choose a merge policy"; `docs/settings.md` §
  `merge.preference`). Setting it in a PR does not change that PR's authority.
- **New site:** `glossary.md` § "Merge policy: Ask and Auto"; `principles.md`; `safety.md`.
- **Status:** Changed.

### M2. Default merge authority

- **Old:** not stated.
- **Shaka:** "Setup defaults to `ask`" (`docs/settings.md`); "`auto` is never reached by
  omission" (`enforcement.yml` rule `never-grant-merge-authority`).
- **New site:** `safety.md` "Shaka defaults to **Ask**."
- **Status:** Changed (new, accurate claim).

### M3. What the merge helper checks

- **Old:** homepage "Validation": "review reads check status at the pull request's current head
  SHA — not an older, greener run."
- **Shaka:** `skills/shaka/lib/shaka/merge.rb` refuses: moved head, closed/draft PR, missing
  required checks, non-passing required check, unsatisfied required review, disallowed merge
  state (`CiReviewWait.allowed_merge_states`), admin-bypass-capable actor, delayed auto-merge,
  inconsistent queue state, and a walkthrough that is not a COMMENT review at the expected head.
  `merge_target.rb` refuses a base mismatch against the `--base` passed.
- **New site:** `safety.md` § "What the merge helper refuses" lists these in plain words.
- **Status:** Changed.

### M4. Ask mode: the helper does not run

- **Old:** not distinguished.
- **Shaka:** "In Ask mode the maintainer clicks merge and the helper never runs, so the gate
  there is the repository's own protection" (`enforcement.yml` rule `required-checks`).
- **New site:** `safety.md` and `principles.md` both say so.
- **Status:** Changed.

### M5. Base-branch protection

- **Old:** `throughput.md`: "agents do not push directly to a protected base branch."
- **Shaka:** "Never push to `main`" (`workflow.yml` line 419); `enforced_by: github` only on
  repositories with protection; "It describes the repository that ships this audit, not whichever
  repository is being worked on" (`enforcement.yml` rule `never-push-main`). Separately the
  merge helper refuses when `viewerCanMergeAsAdmin` is true (`enforcement.yml` rule
  `no-protection-bypass`, code).
- **New site:** `principles.md` table and § "Treat the main branch as shared"; `safety.md`.
- **Status:** Changed (adds the "where the repository has it" qualifier).

### M6. File-count and size limits for auto-merge

- **Old:** not stated.
- **Shaka:** "Shaka has no built-in file-count or commit-count limits for Auto merging"
  (`docs/settings.md` § `merge.preference`).
- **New site:** `principles.md` § "Match checks to risk" → "Extra limits."
- **Status:** Changed (new, accurate claim).

### M7. Stacked PRs and dependency ordering

- **Old:** `throughput.md` § "Execute independently; integrate deliberately": API PR → client PR
  ordering, review queue.
- **Shaka:** "Use sequential ordinary PRs for dependencies; native stacks are outside this
  pilot, so do not create or merge them" (`workflow.yml` Plan, line 123–124);
  `docs/working-with-shaka.md` § "Split a large change."
- **New site:** `principles.md` last paragraph.
- **Status:** Changed.

---

## Verification

### V1. `.agents/bin/validate` is "the pre-push gate"

- **Old:** homepage trust row "Validation."
- **Shaka:** `validate-local` runs before review when present; full `validate` and
  `trigger-hosted-ci` can be deferred until the repair batch is complete (`workflow.yml` Verify
  phase; `docs/settings.md` § "Standard command scripts"). "Never defer always-on required,
  security, or trust checks" (`workflow.yml` line 166; agent-enforced).
- **New site:** `principles.md` "Checks" bullet and table row "Required checks are never skipped."
- **Status:** Changed.

### V2. "The agent said it tested" is not proof

- **Old:** homepage "Evidence" row; `methodology.md` § "Verification habits."
- **Shaka:** "For an asynchronous check, wait for completion and inspect its final exit status …
  a running session or partial green output is not a completed check" (`workflow.yml` Verify).
  `docs/pr-verification.md` asks for labeled, tested-commit evidence.
- **New site:** `methodology.md` § "Verification habits" kept, links PR verification.
- **Status:** Consistent.

### V3. Test-first discipline

- **Old:** homepage skill `tdd`; case study "Require tests that prove changed behavior."
- **Shaka:** "observe one meaningful failing test, make the smallest change that passes, then
  simplify while green" (`workflow.yml` Implement); `docs/pr-verification.md` § "Change one
  behavior at a time." Adequacy of tests: "Agent judgment and review" (`docs/workflow.md` §
  "What is enforced").
- **New site:** not restated beyond links.
- **Status:** Consistent.

### V4. Manual QA / screenshots

- **Old:** homepage § methodology "manual QA where behavior can change."
- **Shaka:** before/after screenshots on desktop and mobile; video for interaction
  (`docs/pr-verification.md` § "Show what a person will see"). "Captures complement tests; they
  do not replace them" (agent-enforced, `enforcement.yml` rule `captures-do-not-replace-tests`).
- **New site:** homepage PR-answers card "How was it checked?"; methodology quote section keeps
  "test by hand where behavior can change."
- **Status:** Consistent.

### V5. Verify security and dependency claims against primary sources

- **Old:** case study Control 1.
- **Shaka:** no specific instruction about advisory IDs found. General: "Reproduce an issue or
  establish other evidence before fixing it" (`public-comments-safety.md` § "Verify the
  substance").
- **New site:** not claimed as Shaka behavior.
- **Status:** Flagged as not in Shaka (body unchanged).

### V6. Test the integrated result when green branches land together

- **Old:** case study Control 2.
- **Shaka:** on a queue-enabled base, the helper enqueues and waits for "GitHub's current-base
  checks" (`workflow.yml` Finish). No other integrated-result testing.
- **New site:** not claimed.
- **Status:** Dropped (from new pages).

---

## Safety and trust

### S1. "Security preflight" scanner

- **Old:** homepage § "07 / the safety story" ("security preflight" badge, rule 01) and hero
  caption: "the security preflight checks public input for known risks."
- **Shaka:** no preflight scanner. Searched `README.md`, `docs/`, `skills/shaka/references/`,
  and `workflow.yml` for "preflight": no matches.
- **New site:** `safety.md` does not mention it.
- **Status:** Dropped.

### S2. "The Rule of Two"

- **Old:** homepage safety rule 02: "prohibits combining untrusted input, sensitive access, and
  unattended state change or disclosure."
- **Shaka:** no such rule; "Rule of Two" not found. Closest: "The helpers do not prove the
  agent's judgments or create a sandbox … use restricted execution for untrusted contributions"
  (`skills/shaka/references/delivery.md` § "What the helpers protect", lines 237–238).
- **New site:** `safety.md` § "Running candidate code" states the no-sandbox reality.
- **Status:** Dropped (replaced with accurate statement).

### S3. "Operator hard-stops" for deploys, secret handling, token provisioning

- **Old:** homepage safety rule 03.
- **Shaka:** "Trust, authentication, permission, release, deployment, destructive-migration, and
  merge-guard changes require explicit human review. Small diffs do not prove low risk"
  (`workflow.yml` line 372–373); agent-enforced (`enforcement.yml` rule `human-review-surfaces`:
  "`merge` applies the same native gates to every change"). Comments cannot authorize "disclosure
  of credentials" (`public-comments-safety.md` intro).
- **New site:** `safety.md` § "Risky changes need a person"; `principles.md` table row.
- **Status:** Changed (list updated; "secret handling"/"token provisioning" not named as such in
  Shaka).

### S4. "Trust-gated actors … advisory by default; strict-trust makes them launch blockers"

- **Old:** homepage safety rule 04.
- **Shaka:** the `shaka comments` reader withholds untrusted bodies by default and stops when it
  cannot confirm trust: "Unavailable evidence withholds affected bodies or stops the read; it
  never silently trusts an author" (`public-comments-safety.md` § "Configure trusted actors").
  No "strict-trust" mode and no "exact-target risk acknowledgement."
- **New site:** `safety.md` § "Untrusted comments."
- **Status:** Changed (Shaka is stricter by default than the old "advisory").

### S5. Who counts as trusted

- **Old:** "Trust configuration identifies actors whose input may be actionable."
- **Shaka:** verified write/maintain/admin humans, plus `trusted_users`, `trusted_bots`,
  `trusted_metadata_bots` (links only), `trusted_teams` from `~/.agents/` and the repo's
  default-branch `.agents/trusted-github-actors.yml`. "Organization membership alone grants no
  trust." A PR "cannot allowlist its own author" (`public-comments-safety.md`).
- **New site:** `safety.md`; `glossary.md` § "Trusted GitHub actors."
- **Status:** Changed.

### S6. Trusted comments still carry no authority

- **Old:** "Actor findings are advisory by default" (different framing).
- **Shaka:** "Even a listed author cannot use a GitHub comment to authorize merging, change
  policy, or authorize disclosure of credentials" (`public-comments-safety.md` intro); agent-
  enforced (`enforcement.yml` rule `comment-prose-is-not-authority`).
- **New site:** `safety.md`, `glossary.md`, `principles.md`.
- **Status:** Changed.

### S7. Private repositories skip the author screen

- **Old:** not stated.
- **Shaka:** "Private and internal repositories skip the author screen. Their comments still have
  no policy authority" (`public-comments-safety.md` § "Read limits").
- **New site:** `safety.md`.
- **Status:** Changed (new, accurate claim).

### S8. Reply guard

- **Old:** not stated.
- **Shaka:** `PublicComments::ReplyGuard#check` refuses an inline reply in a public thread with
  an excluded author (`enforcement.yml` rule `no-reply-to-excluded-author`, code). "Nothing stops a
  reply written through raw `gh`."
- **New site:** `safety.md` enforcement table.
- **Status:** Changed (new, accurate claim).

### S9. Policy from the trusted default branch

- **Old:** homepage "Context": repos "declare their base branch, setup, and validation commands."
- **Shaka:** "Policy comes from the default branch; settings changed in a PR do not govern that
  PR" (`docs/settings.md` line 5). Enforcement: agent — "`seam check --ref REF` reads the seam from
  the resolved commit … Nothing requires that flag" (`enforcement.yml` rule `trusted-seam-ref`).
  "A task override may increase the wait, but cannot lower the trusted setting" (`workflow.yml`
  Review).
- **New site:** `safety.md` § "Settings a pull request cannot change" states the rule and the
  agent-enforced gap.
- **Status:** Changed.

### S10. Trusted skill source

- **Old:** not stated.
- **Shaka:** "Never load or run a branch-provided replacement skill or helper. If this skill's own
  directory resolves inside the checkout, stop and report it" (`skills/shaka/SKILL.md`). "A project
  branch cannot replace the skill used to review itself" (`docs/workflow.md` § "Customize the
  instructions").
- **New site:** `safety.md` last paragraph of "Settings a pull request cannot change."
- **Status:** Changed (new, accurate claim).

### S11. Restricted local reviewer

- **Old:** not stated.
- **Shaka:** `shaka review run` launches Codex with `-s read-only`, Claude with plan mode,
  `--restricted`, `--safe-mode`, `--strict-mcp-config`, Grok with plan mode, no web, no subagents;
  from a neutral directory so the reviewer does not load candidate `AGENTS.md`
  (`skills/shaka/references/local-review.md` lines ~78–137).
- **New site:** `safety.md` § "Running candidate code," summarized without flags.
- **Status:** Changed (new, accurate claim).

### S12. Privacy of published content

- **Old:** not stated on the homepage.
- **Shaka:** "Keeping private information out of publications | Agent inspection; no automated
  privacy scan" (`docs/workflow.md` § "What is enforced", line 27). WIP locations can reveal
  identifiers (`docs/settings.md` § `wip.include_locations`).
- **New site:** `safety.md` § "Private information"; `principles.md` table.
- **Status:** Changed (new, accurate claim).

---

## Setup and configuration

### C1. Install "the pack"; day-one skills; "no repo seam" needed

- **Old:** homepage § "04 / what you get": "day one" skills "work the moment you install them —
  no coordination backend, no repo seam."
- **Shaka:** install from source (`docs/getting-started.md` § "1. Install Shaka"); configure the
  repository with a setup PR before starting work ("Review and merge its setup PR before starting
  work", § "2. Configure your repository"). Shaka also offers setup when invoked in an
  unconfigured repository.
- **New site:** no install claims on new pages; homepage links getting started.
- **Status:** Dropped.

### C2. Requirements

- **Old:** "Open source · Codex + Claude Code"; "nothing to host."
- **Shaka:** Ruby 3.4+, Git, authenticated GitHub CLI, and a coding agent that can load skills
  (README § "Requirements"). Supports Codex, Claude Code, Cursor, OpenCode, and Pi
  (`docs/coding-agents.md`). Delivers PRs through GitHub only (README).
- **New site:** homepage already states requirements (unchanged).
- **Status:** Consistent (existing homepage).

### C3. `.agents/agent-workflow.yml` holds "repository-owned non-command policy"

- **Old:** `methodology.md` § seam files.
- **Shaka:** it holds `version`, `merge.preference`, `review.*`, `base_branch`, `branches.name`,
  `wip.include_locations`, `repo_prefix`; "Unknown keys and invalid values produce an error"
  (`docs/settings.md`).
- **New site:** glossary § "Seam" names the file; links settings.
- **Status:** Changed.

### C4. Review configuration

- **Old:** "select review depth by risk" (`methodology.md` § core loop).
- **Shaka:** `review.required` (`meaningful_changes`, `always`, `none`), `review.ci_review_jobs`,
  `review.ci_review_wait` (`none`, `one`, `all`), `review.local_review_agents`
  (`docs/settings.md`). `review.required: none` "disables a repository-named gate, not the
  adversarial review itself" (`review.md` § "Review before staged hosted CI").
- **New site:** `principles.md` "Review" bullet.
- **Status:** Changed.

### C5. Installing Shaka does not install reviewers

- **Old:** implied review skills run review.
- **Shaka:** "Installing Shaka does not install those jobs or credentials" (`review.md` intro);
  "Allowlisting a bot permits reading its comments. It does not install, run, require, or disable
  that reviewer" (`public-comments-safety.md` § "Reviewers and comment access").
- **New site:** not stated (docs cover it).
- **Status:** Dropped (detail lives in Shaka docs).

### C6. Customization and forks: "Derived Distributions"

- **Old:** homepage § "09 / Git-native customization"; `docs/distributions.astro`.
- **Shaka:** "To change Shaka, edit the workflow and references in a fork … Install the reviewed
  version explicitly" (`docs/workflow.md` § "Customize the instructions"); personal fork in
  `docs/getting-started.md`.
- **New site:** not ported.
- **Status:** Dropped.

### C7. Branch naming

- **Old:** not stated.
- **Shaka:** `branches.name` default `'{login}-{host}/{issue}-{description}'` (`docs/settings.md`).
- **New site:** not stated.
- **Status:** Dropped (detail lives in Shaka docs).

---

## Scale and fleet

### F1. Coordination backend, dashboard, "the stack"

- **Old:** homepage § "08 / the stack" (agent-coordination, dashboard); `Topology.astro`.
- **Shaka:** none. Optional control towers track work within and across repositories
  (`docs/control-towers.md`).
- **New site:** not mentioned; glossary § "Control tower" points to the Shaka doc.
- **Status:** Dropped.

### F2. Batch pipeline: plan → batch → review → audit

- **Old:** `methodology.md` § "The core loop"; homepage § "03 / how it works"; hero
  `BatchLifecycle.astro`.
- **Shaka:** seven phases for one task: Intake, Plan, Implement, Verify, Explain, Review, Finish
  (`docs/workflow.md`).
- **New site:** `methodology.md` omits the core loop and links `/docs/workflow`.
- **Status:** Dropped.

### F3. "Parallel work" and idle-time advice

- **Old:** `methodology.md` § "Parallel work": "Keep several things moving while slow operations
  run … Idle time is for the next PR's QA checklist."
- **Shaka:** "Ask consequential questions … and continue independent work meanwhile"
  (`workflow.yml` Implement). No parallel-lane guidance.
- **New site:** not ported.
- **Status:** Dropped.

### F4. Scope envelope of owned paths

- **Old:** homepage trust row "Scope": "`pr-batch` requires an execution envelope of owned paths
  … every added path has to be recorded."
- **Shaka:** no per-PR file-ownership list. Only: "Delegated workers own exclusive files or
  worktrees" (`workflow.yml` line 149; agent-enforced) and "Publish only within the task's scope"
  (`enforcement.yml` rule `publish-in-scope`, agent).
- **New site:** the homepage PR-answers list drops "what it could touch."
- **Status:** Dropped.

### F5. Scale to many agents across many repositories

- **Old:** homepage § "01 / the problem": "Use those same questions when you scale to many agents
  across many repositories."
- **Shaka:** control towers are optional; "Try Shaka on a few tasks first"
  (`docs/control-towers.md`).
- **New site:** not claimed.
- **Status:** Dropped.

### F6. Worker count / useful concurrency

- **Old:** `throughput.md` § "Optimize flow, not worker count."
- **Shaka:** solo by default (`workflow.yml` line 5).
- **New site:** dropped per instruction.
- **Status:** Dropped.

### F7. Batch usage receipts

- **Old:** `throughput.md` § "Current behavior": "privacy-safe batch usage receipts."
- **Shaka:** per-PR usage tables with tokens and estimated cost; "publish only aggregate
  metadata" (`workflow.yml` Explain; `usage-reporting.md`).
- **New site:** homepage card "What did it cost, and what is left?"; glossary § "Usage."
- **Status:** Changed.

### F8. Astra model routing

- **Old:** homepage § "03": "Astra users can use the same workflow pack, with an advisory routing
  pilot"; `docs/astra.md`.
- **Shaka:** Shaka recommends a model and effort per task and explains the choice; it cannot
  switch the runner ("a prompt cannot change the runner", `workflow.yml` Plan).
- **New site:** not mentioned.
- **Status:** Dropped.

### F9. agent-workflows "proposed direction" issues (#476, #514, #189, #402)

- **Old:** `throughput.md` § "Proposed direction."
- **Shaka:** partly realized. #514's merge authority → Ask/Auto (`docs/working-with-shaka.md`).
  #402's single-target topology → "Own one task" and "Default to one PR" (`workflow.yml`).
  #476 → versioned workflow YAML (`SKILL.md`). #189 not checked.
- **New site:** dropped per instruction.
- **Status:** Dropped. Mapping is my reading, not verified against those issues' final state.

---

## Evidence and PR contents

### E1. "QA evidence block" on the PR

- **Old:** homepage trust row "Evidence": "lanes attach a QA evidence block to the PR — exact
  commands, exact results."
- **Shaka:** description has a required check `table`, `provenance`, usage `details`, WIP Details
  while unfinished, and links to the walkthrough and review result (`workflow.yml` Explain,
  description keys; `delivery.md` § "Make the PR description useful first").
- **New site:** homepage § "What a Shaka PR answers."
- **Status:** Changed.

### E2. "What it was told" (context)

- **Old:** homepage five questions: "what it was told."
- **Shaka:** provenance records `task_source` and model/effort fields; "`initial_prompt` is
  `EXCLUDED`" (`workflow.yml` line 300–302). The prompt is not published.
- **New site:** the PR-answers list does not claim the PR shows what the agent was told.
- **Status:** Changed (question dropped).

### E3. Code walkthrough

- **Old:** no walkthrough concept.
- **Shaka:** a COMMENT review covering purpose, prior and new behavior, key choices, validation,
  risks, rollback, and commit-pinned links (`workflow.yml` line 261+). The merge helper requires
  it at the expected head (`merge.rb` `verify_walkthrough`).
- **New site:** glossary § "Walkthrough"; homepage card; safety list.
- **Status:** Changed (new concept).

### E4. Description vs. walkthrough split

- **Old:** case study artifact table: PR description = "Change map, risk, and verification
  contract."
- **Shaka:** description serves someone who will not read the diff (outcome, decisions,
  blockers, checks); walkthrough serves the code reader; "share the subject, never the sentences"
  (`workflow.yml` Explain; `delivery.md` § "Why the description and the walkthrough differ").
- **New site:** glossary §§ "PR description", "Walkthrough"; case-study editor's note.
- **Status:** Changed.

### E5. Commit messages

- **Old:** case study artifact table: "Commit message: Concise, durable rationale."
- **Shaka:** no commit-message guidance found in docs, references, or workflow.
- **New site:** case-study body unchanged; not claimed elsewhere.
- **Status:** Flagged (not in Shaka).

### E6. "Coordination record" artifact

- **Old:** case study artifact table.
- **Shaka:** no coordination record; long records go in expandable `details`; unfinished-work
  state goes in WIP Details (`workflow.yml` Explain; `delivery.md` § "Recover an unfinished PR").
- **New site:** footnote added to the table row.
- **Status:** Changed (footnote).

### E7. AI-authored identification

- **Old:** not stated.
- **Shaka:** GitHub posts begin with agent, provider, model, and effort (`delivery.md` §
  "Identify AI-authored posts").
- **New site:** not stated.
- **Status:** Dropped (detail in Shaka docs).

### E8. Resume unfinished work

- **Old:** `methodology.md` § "Parallel work": "hand off cleanly across machines" via claims.
- **Shaka:** WIP Details name owner, thread, last activity, next action; "a timestamp cannot
  prove" the previous agent stopped (`docs/working-with-shaka.md` § "Resume unfinished work").
- **New site:** glossary § "WIP Details"; homepage card.
- **Status:** Changed.

---

## Other

### O1. Brand and product name

- **Old:** "Agent Workflows," "the pack," "the playbook."
- **Shaka:** "Shaka."
- **New site:** all new pages use Shaka. Methodology K6 line changed from "You do not need a
  workflow pack" to "You do not need Shaka."
- **Status:** Changed.

### O2. Methodology intro and Robert

- **Old:** `methodology.md` intro names "Justin Gordon and Robert."
- **Shaka:** n/a.
- **New site:** kept, with `<!-- confirm Robert is OK being named -->`.
- **Status:** Flagged.

### O3. Methodology anchor links

- **Old:** `[See the verification spectrum](/#verification)`.
- **New site:** `/#consequences` (the homepage section id). Registered with
  `useBrokenLinks().collectAnchor` so Docusaurus's anchor check passes.
- **Status:** Changed.

### O4. "Documentation is … usually low-risk — merge it quickly"

- **Old:** `methodology.md` § "Mindset."
- **Shaka:** trivial prose can skip CI review with a reason under `meaningful_changes`
  (`docs/settings.md`); docs changes still need link and rendered-page checks
  (`docs/pr-verification.md` § "Documentation changes").
- **New site:** kept as written.
- **Status:** Consistent.

### O5. K11 issue filing

- **Old:** `methodology.md` § "Convert confusion into issues and docs": "File a self-contained
  issue."
- **Shaka:** for Shaka gaps, the agent offers an issue and asks before searching and again before
  filing (`skills/shaka/references/shaka-issue-offer.md`; `docs/working-with-shaka.md` §
  "Suggest improvements to Shaka"). "Reading a tracker does not authorize updating it; do not
  create a duplicate issue" (`workflow.yml` Intake).
- **New site:** methodology keeps the general habit and adds the Shaka-specific path.
- **Status:** Changed.

### O6. Consulting pitch facts

- **Old:** `index.astro` § "11 / for engineering teams": "Since 2011 / Remote-first software
  consulting and delivery", "23M+ / Open-source package downloads", "Practical adoption /
  Assessment, rollout, guardrails, and team enablement."
- **New site:** homepage § "ShakaCode can help your team," copied verbatim. **Not re-verified.**
  The lead paragraph drops "run multiple agent tasks asynchronously" (fleet wording) and "encode
  reusable skills."
- **Status:** Flagged.

### O7. Services link

- **Old:** also linked `https://www.shakacode.com/services/`.
- **New site:** only the contact link (per instruction). The navbar already has "Get expert help"
  to the same contact URL, and the footer has a HubSpot booking link.
- **Status:** Flagged (three contact entry points; keep all?).

### O8. Hero diagram caption claims

- **Old:** hero caption: "Agents still need permission boundaries and must follow the workflow for
  one lane or many."
- **Shaka:** n/a (lanes gone); permission boundaries: `delivery.md` § "What the helpers protect."
- **New site:** not ported.
- **Status:** Dropped.

### O9. Case studies index framing

- **Old:** n/a (already carried over as K15).
- **Shaka:** the published index says the study's two-control model "shaped Shaka: … fail closed
  when integration evidence is incomplete." Shaka's merge helper does fail closed on unknown
  readiness ("No observable required checks; native readiness is unknown", "Merge queue state is
  unknown" in `merge.rb`), but not on unhandled review findings (R4).
- **New site:** not edited (out of scope).
- **Status:** Flagged (the sentence is true for checks, not for findings).

---

## Could not verify in Shaka

Items left out or flagged because I found no support in the Shaka files read:

1. A code-enforced gate that blocks merge on unanswered review findings (R4, R5). Not present;
   agent-enforced only.
2. A security preflight scanner or "Rule of Two" (S1, S2). Not present.
3. A "strict-trust" mode or "exact-target risk acknowledgement" (S4). Not present.
4. Commit-message guidance (E5). Not present.
5. Advisory-ID or dependency-claim verification (V5). Not present.
6. Post-merge batch audits (R10). Explicitly not part of the workflow.
7. "Escaped defect" as a Shaka term (T11). Not present; kept only as a general term.
8. Whether any Shaka issue tracks a disposition gate (R5). I did not search GitHub issues.
9. The final state of agent-workflows #249, #256, #257, #318, #319, #476, #514, #189, #402. Not
   checked; the case study already labels its links as the retired predecessor's.
10. The consulting facts "Since 2011" and "23M+" (O6). Copied, not checked.

## Open questions for Justin

1. **Robert:** Is Robert OK being named on `/methodology`? The HTML comment marks the line.
2. **Disposition gate:** The old site said "fail closed on unsettled configured reviews" was open
   work. Shaka leaves per-finding disposition to the agent. Should Shaka have an issue for a
   code-enforced gate, or is the agent-enforced rule the intended design? The homepage card
   currently says "Still up to the agent."
3. **Follow-ups as a disposition:** The case-study lesson allows "an owned follow-up." Shaka's
   review guide discourages follow-up issues for bot findings. Keep the lesson wording on the
   homepage card as is, or align it to fix-or-decline?
4. **Case-study footnotes:** Only "Coordination record" is footnoted. Should "Review ledger" also
   get a footnote, since Shaka has no ledger?
5. **Consulting facts:** "Since 2011" and "23M+ downloads" were copied without re-verification.
   Are they current?
6. **Contact links:** The homepage now has a contact button, the navbar has "Get expert help,"
   and the footer has a booking link. Keep all three?
7. **Navbar:** I added "Methodology" to the navbar (now four left items). Keep it, or leave
   Methodology in the footer only?
8. **"Escaped defect" in the glossary:** Keep it as a general term because the case study uses
   it, or remove it since Shaka's docs do not?
9. **Case-studies index sentence:** It says the two-control model "shaped Shaka: … fail closed
   when integration evidence is incomplete." True for required checks, not for review findings.
   Reword it?
10. **Principles page scope:** I dropped "Brief the task," "Execute independently; integrate
    deliberately" (kept one paragraph), and "Improve the limits from evidence." Bring any back?
11. **Where product explanations live:** `/safety` and parts of `/glossary` explain how Shaka
    enforces settings, trust, and merges. The repository rule is that product docs live in
    `shakacode/shaka/docs/`, and these site copies will drift when Shaka changes. If you keep
    them, move the product content into Shaka's docs (for example a `docs/safety.md`) and leave a
    short introduction and link here. If you drop them, delete the pages.

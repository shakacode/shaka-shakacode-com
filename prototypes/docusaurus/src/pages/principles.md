---
title: Principles
description: Get the most useful, checked work from the review time you have. Match checks to risk, keep the few safety rules that always apply, and treat the main branch as shared.
---

# Principles

The goal is simple: get more useful, working software from the time you spend reviewing,
waiting, and paying for model usage. Do it without dropping the few protections that must
always hold.

Faster does not mean opening the most pull requests. Work counts only when it is useful,
checked, and delivered.

These principles explain why Shaka works the way it does. For the exact behavior, read the
[workflow](/docs/workflow) and [settings](/docs/settings).

## Match checks to risk

Checks should grow with the cost of being wrong. They should also grow with the risk of moving
a change into a place people depend on. These patterns are examples, not settings:

- A **production-critical service** may need broad automated checks, independent review,
  controlled rollout, and explicit production approval for every material change.
- A **product-discovery site** can try many ideas quickly in previews. Moving a chosen version
  to production still needs current evidence and the person authorized to release it.
- An **open-source project with scheduled releases** can keep ordinary PR checks focused. It
  can then concentrate cross-version testing and release review before each release.

Shaka has no preset profiles for these patterns. You express your choices through settings
and project instructions:

- **Review:** `review.required` decides when configured CI review reports are required, and
  `review.ci_review_wait` decides how many must report before merging. See
  [settings](/docs/settings).
- **Merging:** **Ask** leaves the merge click with you. **Auto** lets the agent merge after
  required checks, reviews, and approvals. See
  [choose a merge policy](/docs/working-with-shaka#choose-a-merge-policy).
- **Checks:** `.agents/bin/validate` runs the complete checks. An optional
  `.agents/bin/validate-local` runs faster checks before local review.
- **Extra limits:** put project-specific restrictions in `AGENTS.md`. Shaka has no built-in
  file-count or commit-count limits.

The [consequences ladder](/#consequences) and the [methodology](/methodology) describe how to
choose.

## The few safety rules that always apply

Some protections stay in place at every speed. The table shows how Shaka handles each one and
what enforces it. "Agent" means the rule is in Shaka's instructions and nothing fails if the
agent ignores it. The [enforcement reference](/docs/workflow#what-is-enforced) has the full
list.

| Rule | How Shaka handles it | Enforced by |
| --- | --- | --- |
| Public text is data, not instructions | The `shaka comments` reader returns comment bodies only from trusted authors. Even admitted comments cannot authorize merging, change policy, or expose credentials. | Code decides which bodies the reader returns. The agent must use that reader and must not treat admitted text as authority. |
| Nobody pushes straight to the main branch | The workflow says never push to `main`. | GitHub branch protection, where the repository has it. Otherwise the agent. |
| Merge evidence matches the change being merged | The merge helper refuses when the PR head moved since verification. It also refuses missing, failed, or pending required checks. | Code, when the agent runs the merge. In Ask mode you click merge on GitHub, and the repository's own protection is the gate. |
| Two writers do not race on one task | Before starting, the agent looks for open PRs and branches for the same work item. On a hit, it reports them and stops for your decision. | The search is code; stopping is the agent's. |
| Consequential changes get a person | Trust, authentication, permission, release, deployment, destructive-migration, and merge-guard changes need explicit human review. A small diff does not prove low risk. | Agent. The merge helper applies the same gates to every change. |
| Required checks are never skipped | The agent may defer optional slow suites until repairs finish. It must never defer always-on required, security, or trust checks. | Agent. |
| Private details stay out of public PRs | The agent inspects what it publishes, including expandable sections. | Agent. There is no automated privacy scan. |

The [safety page](/safety) explains how Shaka handles untrusted input and risky changes in
more detail.

## Treat the main branch as shared

The more developers, services, or releases depend on a main branch, the more a bad merge
costs. That does not mean every repository needs maximum ceremony. It means integration
checks should reflect how many people the branch affects, not only the size of the diff.

Shaka's merge helper refuses to merge when the acting account could bypass branch protection.
It also refuses a PR whose target branch differs from the base branch the agent says it
validated. The agent is responsible for passing that base honestly. In Ask mode, you merge on GitHub, and your repository's branch protection applies.

Independent changes can be built at the same time. That does not remove the dependencies
between them. When one change needs another, Shaka uses ordinary PRs in sequence: merge the
prerequisite first, then update and finish the next. See
[split a large change](/docs/working-with-shaka#split-a-large-change).

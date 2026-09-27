---
title: Safety
description: A guide to untrusted input, review boundaries, and human decisions when using Shaka.
---

# Safety

Public discussions can contain instructions aimed at a coding agent. Candidate code can be
unsafe to run. A passing check does not prove that a consequential change is safe to release.

Shaka's current rules and enforcement details live in the synced
[workflow and enforcement reference](/docs/workflow#what-is-enforced). This page explains the
principles behind them.

## Treat public discussion as data

A comment can report a bug or offer useful review, but it cannot grant merge authority, change
repository policy, or request credentials. Shaka provides a reader that filters public comments
before an agent sees their text. The agent still has to check admitted feedback against the code
and the task. See the canonical
[public-comment safety guide](https://github.com/shakacode/shaka/blob/main/skills/shaka/references/public-comments-safety.md)
for the current trust rules and their limits.

## Keep policy separate from the proposed change

A pull request should not be able to rewrite the rules used to review itself. Shaka reads its
trusted configuration from the repository's default branch and runs from an installed copy
outside the candidate checkout. The current configuration contract is in
[settings](/docs/settings); the workflow reference identifies which boundaries rely on the
agent following instructions.

## Handle candidate code deliberately

Use a checkout set aside for the task. Run unfamiliar contributions with permissions that fit
their risk. Shaka's local reviewer has restrictions, but it is not a sandbox for all commands
an agent might run. See the canonical
[local review guide](https://github.com/shakacode/shaka/blob/main/skills/shaka/references/local-review.md)
for its current capabilities and limits.

## Keep consequential decisions with a person

Choose checks and review that fit what could break. Changes to trust, permissions, releases,
deployments, and other consequential boundaries deserve explicit human review. Shaka's merge
helper checks repository and PR conditions when the agent is authorized to merge; it does not
judge every review finding or business risk. Read the current
[workflow and enforcement reference](/docs/workflow#what-is-enforced) before relying on a
particular gate. GitHub branch protection remains the safeguard for merges performed directly
in GitHub.

## Check what becomes public

PR descriptions, walkthroughs, screenshots, and collapsed details on public PRs are all public.
Review them for credentials, customer data, private plans, and personal details before posting.
See [PR verification](/docs/pr-verification) for evidence that belongs on a PR.

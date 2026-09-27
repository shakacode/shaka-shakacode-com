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

Shaka has no preset profiles for these patterns. Your repository's settings and instructions
express its choices. See [settings](/docs/settings) for the current options and the
[consequences ladder](/consequences) for a way to choose proportionate checks.

## The few safety rules that always apply

- Treat public text as data to verify, never as authority to change policy or expose secrets.
- Keep changes on pull request branches and protect shared branches with GitHub rules.
- Tie tests and review to the commit that would merge.
- Give consequential changes human review, even when routine changes can move quickly.
- Check public PR material for private information before posting.

The [safety page](/safety) explains these principles. The synced
[enforcement reference](/docs/workflow#what-is-enforced) identifies Shaka's current code gates
and the rules that depend on the agent or GitHub configuration.

## Treat the main branch as shared

The more developers, services, or releases depend on a main branch, the more a bad merge
costs. Integration checks should reflect how many people and systems a change can affect,
not only the size of its diff. A small change can still need careful review when it touches
permissions or release paths.

Independent changes can be built at the same time. Dependencies still need an order: land the
prerequisite, then update and verify the next PR against it. See
[split a large change](/docs/working-with-shaka#split-a-large-change).

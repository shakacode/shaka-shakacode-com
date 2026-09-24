---
title: Methodology
description: How ShakaCode uses AI coding agents. Match checks to what could break, give verification a stopping rule, review adversarially before merge, and treat evidence as proof.
---

# Methodology

<!-- confirm Robert is OK being named -->

These principles come from a working session between Justin Gordon and Robert on how we
use AI coding agents. The short version:

> **Use AI aggressively, verify the risky parts, document what was learned, and keep shipping.**

Shaka builds several of these habits into its workflow. The principles also apply when you
work without it. For what Shaka does step by step, see the [workflow](/docs/workflow).

## Balance verification with delivery

Start with **what happens if this breaks?** A disposable app for yourself may need no formal
process. Describe it, try it, and iterate. Using it is already a lightweight check. You do
not need Shaka to find out whether an idea is useful.

As more people depend on the result, add safeguards that match the consequences:

- **Friends or coworkers:** check important user journeys, protect saved data, and have a
  recovery path.
- **Customers depend on it:** automate checks for critical behavior, review risky changes,
  monitor failures, and prepare rollback.
- **Critical service:** set reliability targets, stage releases, test failure modes, and
  practice recovery.

These are examples, not user-count thresholds. A five-person payroll tool can carry more risk
than a popular disposable toy. Sensitive data and irreversible actions raise the stakes, even
for a personal app. Within one system, a button label and a permission change deserve
different checks. [See the consequences ladder](/#consequences).

Weigh four costs together: development, verification, the expected cost of a failure, and the
cost of delay. This is a decision aid, not a calculator. Ask which failure the next check could
catch, how likely and costly that failure is, and whether the result would change the release
decision. Count human attention, flaky tests, and repeated review rounds as costs too.

Reducing exposure also helps. Ship a smaller change, release to a limited audience, and make
recovery easier. Tests before release cannot replace monitoring and recovery afterward.
Google's [Embracing Risk](https://sre.google/sre-book/embracing-risk/) explains why reliability
work should match a service's needs and account for what else the time could buy.

## Give verification a stopping rule

Before work starts, name three things:

- the behavior to deliver;
- the evidence needed to accept it;
- the failures that must block release.

Finish when that evidence is sufficient, required checks pass, and each remaining risk has an
explicit decision. An extra suggestion is an observation to evaluate. It is not an automatic
requirement.

If repair and review keep generating more work, pause and ask whether the next change fixes a
real defect or expands the design. A pause does not permit shipping an unresolved defect. It
also does not permit skipping a required security, review, or CI check.

Shaka applies a version of this rule to review findings. The agent fixes demonstrated defects
and declines nits with a reason. After two repair rounds, remaining nits do not start another
cycle. Demonstrated defects still block until they are fixed, declined with evidence, or
decided by a maintainer. See the Review step in the
[workflow definition](https://github.com/shakacode/shaka/blob/main/skills/shaka/config/workflow.yml).

## Mindset

Treat the agent as a partner for research, review, testing, and documentation. It is not an
oracle, and it is not a replacement for your judgment.

When you are blocked or unsure, ask one precise question that moves the task toward a concrete
next action. A broad "explain everything" rarely helps.

When the agent explains a confusing process in your repository, ask a follow-up question:
*should this become documentation?* Documentation is high-leverage and usually low-risk, so
merge it quickly.

## Adversarial review before merge

For anything beyond a trivial change, run a review whose job is to find what is *wrong*. Look
for production risks, deployment risks, missing tests, and unsafe assumptions. A summary of
the PR is not a review. Start with concrete blockers and file and line references.

A change is ready to merge when:

- tests pass;
- manual verification is adequate for the risk;
- adversarial review finds no serious issue;
- the remaining risk is understood.

In Shaka, meaningful changes get a local adversarial review before the push. The reviewer runs
in a fresh session that did not write the change, and the agent fixes findings before pushing.
GitHub reviewers then examine the published branch. See the Verify and Review steps in the
[workflow](/docs/workflow) and the evidence guidance in [PR verification](/docs/pr-verification).

## Verification habits

Evidence comes before assertions. For CI, the question is not "is it green?" It is "did the
step that proves *this change* actually run?"

Ask the agent which manual testing a change needs, and in which environment. Never accept
"the agent said it tested" as proof. Look for logs, commands, results, or screenshots tied to
the commit being merged. [PR verification](/docs/pr-verification) describes the evidence a
Shaka PR carries.

## Convert confusion into issues and docs

Do not let a vague blocker stay vague:

1. Capture the symptom.
2. Have the agent research likely causes from the repository's context.
3. Decide whether it is a real bug, a documentation gap, or expected behavior.
4. When the impact justifies more work, file a self-contained issue or open a docs PR.

Keep optional observations in the original discussion unless there is a reason to schedule
them.

When the confusion is about Shaka itself, tell your agent what should work better. It helps
refine the idea and asks before filing an issue. See
[suggest improvements to Shaka](/docs/working-with-shaka#suggest-improvements-to-shaka).

## Anti-patterns to avoid

- Passing vague observations to teammates without first researching and packaging them.
- Treating "AI said it tested" as proof, with no logs or screenshots.
- Holding low-risk docs and comment PRs forever because review automation failed.
- Merging high-risk deployment or secret changes without narrowing their effect on each
  environment.
- Letting a large migration reach reviewers without a map of what changed.
- Asking broad questions when you need a specific next-step question.

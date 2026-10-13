---
title: Principles
description: Better software for less human attention and AI usage. Adapt the Shaka skill to your project and keep people in charge of important decisions.
---

# Principles

The Shaka skill should help you get better software from the human attention and AI usage you
can afford. That includes the time spent answering questions, reading PRs, fixing mistakes,
and waiting for checks—not just the first attempt at writing code.

## Trust developers to improve how they work

The people working on a codebase are trusted to choose how they work. Shaka gives their coding
agents a useful starting process, with settings they can adapt to the project.

You can choose reviewers, customize review instructions, connect existing test commands, and
set how the agent handles merging. Tell the agent what is wasting time and what you want to
change. For example:

```text
Our local reviews keep repeating our formatter's findings.
Help me update the review instructions to focus on bugs and missing behavior.
Keep our automated checks and Ask merge mode.
```

The [setup guide](/docs/configure-repository) explains how to update the configuration. Broader
work to make a first trial easier, without requiring the whole team to adopt Shaka, is
[planned in Shaka #277](https://github.com/shakacode/shaka/issues/277).

## Spend effort where it improves the result

Use a small task to try an idea. Add more checking as people begin to depend on it. A prototype
for a meeting and a service that takes customer payments have different needs.

Choose models and review effort for the work at hand. Count the tokens spent on retries and
reviews, too. A cheaper first answer that needs several corrections may cost more overall.
Long explanations and repeated confirmations also consume a person's time; keep them only
when they help someone make a decision or continue the work.

## Keep the merge decision with a person by default

Start with **Ask**: the agent prepares the PR and you decide whether to merge it. **Auto** can
be useful for a demo or other work you are comfortable letting the agent merge after the
configured checks and reviews. It is a deliberate choice, with limits—not the starting point
for every project. See [merge choices](/docs/working-with-shaka#choose-a-merge-policy).

Use GitHub branch protection or rulesets for team requirements, such as passing tests and an
approval before changes enter `main`. Shaka helps the agent follow your process; GitHub is
where you enforce requirements that must apply regardless of who performs the merge.

For private repositories on GitHub Free, where branch protection is unavailable, Shaka can
[wait for checks listed in its configuration](/docs/settings#mergerequired_checks). This helps
an agent follow the team's agreement, but it cannot prevent someone from merging directly
in GitHub. See [GitHub's availability details](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches).

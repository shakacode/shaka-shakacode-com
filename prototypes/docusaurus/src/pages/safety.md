---
title: Safety
description: Trust your developers, keep important decisions with people, and prevent strangers' PR comments from steering the coding agent.
---

# Safety

The Shaka skill helps trusted developers prepare changes that are easier to check. You choose
the workflow and can improve its configuration as you learn what works for your project.

## Keep important decisions visible

A PR should tell you what changed, what was checked, and what still needs your decision. If a
change could charge customers incorrectly or delete saved work, bring that decision to a
person before using it. Start with Ask merge mode so the agent returns the PR to you.

Keep team-wide requirements in GitHub's branch protection or rulesets where available. Those
rules can require passing tests and approvals before a merge. Shaka's settings guide the
agent; they do not replace GitHub's controls. The [principles](/principles) explain that
choice and the limits on private repositories using GitHub Free.

## Distinguish project contributors from strangers in public comments

Anyone can leave a comment on a public repository. A comment that appears to report a bug
could also tell the agent to ignore your instructions or disclose private information. That
attempt to steer the agent is called **prompt injection**.

Shaka's public-comment reader admits feedback from people with write access and the people,
bots, and teams you have designated as trusted. It leaves other comments for a maintainer to
read. You can still accept an outside contributor's useful report after reviewing it.

Private and internal repositories skip this public-author filter: participation is already
limited by repository access. Feedback still needs to be checked for accuracy. A review
comment is not permission to merge or reveal private information.

The [public-comment guide](https://github.com/shakacode/shaka/blob/main/skills/shaka/references/public-comments-safety.md)
explains how to configure trusted reviewers.

## Be clear about what the skill can guarantee

The skill gives the agent instructions for testing, review, and careful publication. Its
helpers check some things automatically, such as whether required checks have passed. They
cannot prove that a test covers the right behavior or that a reviewer found every bug.

Use the PR to see what the agent actually did, and ask it to explain a gap. For the current
list of automatic checks and agent responsibilities, see the
[workflow reference](/docs/workflow#what-is-enforced).

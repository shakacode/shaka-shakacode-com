---
title: Methodology
description: Spend your attention on the decisions that matter. Let your coding agent do the work, then check that the result works for people.
---

# Methodology

Your attention is the scarce resource. A coding agent can produce changes faster than you can
read them. The useful measure is how much working software you get for the time you spend
explaining, checking, and correcting it—and for the tokens the agents use along the way.

The Shaka skill gives the agent a repeatable way to do that work. These are the habits behind it.

## Start with a result you can try

“Fix search” leaves a lot to guess. “Searching for O'Brien should return matching customers
instead of an error” gives the agent something specific to build and check.

Decide how you will know the work is done. For that search fix, try the failing name and a few
ordinary searches. For a page redesign, open it on a phone and a desktop. Ask the agent to do
those checks too, and tell you what it tried and what it could not check.

If you are unsure what to do next, ask: **“Walk me through the next step in baby steps.”**
You should not need to learn the whole development process to make one useful decision.

## Check more carefully when a mistake would cost more

A spelling change and a change to how customers are charged deserve different amounts of
checking. For the spelling change, read the page. For billing, test examples such as a normal
charge, a failed payment, and a refund before customers use the change.

An early prototype can be tried and changed quickly. A service people rely on also needs a way
to notice problems after an update: error reports, useful logs, and alerts. That visibility is
called **observability**. Have a way to restore the previous version if the update breaks
something. The [consequences guide](/consequences) gives more examples.

## Fix problems locally before sending the PR

Ask the agent to run the project's tests, try the changed behavior, and get a fresh review
before pushing to GitHub. A reviewer should look for mistakes: can a search return the wrong
customer, can a save lose data, or can a page become unusable on a phone?

Use automatic code checks such as ESLint for JavaScript or RuboCop for Ruby where they fit the
project. Let tools catch routine mistakes so people can focus on whether the change makes sense.

Finding and fixing problems locally saves repeated waits for GitHub's automated checks and
repeated requests for a person to review the PR. The Shaka skill instructs the agent to do this;
it cannot guarantee that the agent tested thoroughly. Ask to see what was checked, rather than
accepting “tested” as the whole answer.

## Finish without turning every suggestion into more work

Fix bugs that stop the requested behavior from working. Consider a reviewer's other suggestions
on their merits. A better name or an unrelated cleanup does not always justify another round
of edits, tests, and review.

Before accepting another round, ask: **“What problem will this fix for someone using the software?”**
If the requested behavior works and the necessary checks pass, you can leave an optional
improvement for another task. A failing required check still needs to be resolved.

If the process repeatedly wastes time, ask the agent to explain why and suggest a change to
Shaka's configuration. The [principles](/principles) explain what to optimize; the
[repository setup guide](/docs/configure-repository) shows how to change the settings.

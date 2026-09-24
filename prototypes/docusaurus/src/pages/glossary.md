---
title: Glossary
description: Plain-language definitions for newcomers. What a pull request, branch, test, CI, review, and merge are, plus the Shaka terms used in its docs.
---

# Glossary

New to building software with a coding agent? These definitions cover the words you will meet
in Shaka's docs. The first section explains general terms. The second explains Shaka's own.

## General terms

### Repository

A project's files and their full history, stored with Git. On GitHub, a repository also holds
the project's issues and pull requests. People often shorten it to "repo."

### Commit

A saved snapshot of changes, with a message explaining them. Each commit has a unique ID, called
a SHA, such as `a419e92`.

### Branch

A separate line of commits where you can work without changing anyone else's copy. A new
feature or fix usually starts on its own branch.

### Main branch

The shared branch everyone builds on, usually named `main`. Other names are possible, such as
`master` or `develop`. Shaka calls the repository's main line the **default branch**. Changes
reach it through pull requests, not direct pushes.

### Pull request (PR)

A request to merge one branch into another, usually into the main branch. A PR shows the
changes, a description, test results, and review comments in one place on GitHub.

### Test

Code that checks other code. A test runs part of your app and confirms it behaves as expected.
A good test fails when the behavior breaks.

### CI (continuous integration)

Checks that run automatically, usually on GitHub, each time you push to a PR. CI typically runs
tests, linters, and security checks. A **required check** is one the repository says must pass
before a merge.

### Code review

Reading a change to find mistakes before it is merged. A reviewer can be a person, an AI model,
or both. A useful review looks for what is wrong, not just what changed.

### Merge

Adding a PR's changes to the target branch. After the merge, the change is part of the shared
code.

### Escaped defect

A bug that got past the checks and reached users or the environment it was released to. The
[case study](/case-studies/30-ai-assisted-commits) uses this term.

## Shaka terms

### Seam

The connection between Shaka and your repository. It is a configuration file,
`.agents/agent-workflow.yml`, plus standard scripts in `.agents/bin/` that run your existing
setup, test, and validation commands. The agent prepares these files when you configure a
repository. See [repository setup](/docs/configure-repository).

Setup also prepares `AGENTS.md` for project instructions and constraints, and
`.agents/trusted-github-actors.yml` for whose public comments the agent may read.

### Default branch

The repository's main branch as GitHub reports it. Shaka reads its settings and trusted-actor
list from the default branch, so a pull request cannot change the rules that govern it. See
[settings](/docs/settings).

### Worktree

A second checkout of the same repository in a separate folder, on its own branch. Shaka uses a
new worktree when your checkout has uncommitted changes or another task is using it, so work
does not collide.

### Merge policy: Ask and Auto

Who merges a ready PR.

- **Ask** is the default. The agent brings you the reviewed PR. You merge it on GitHub, or tell
  the agent to merge that commit.
- **Auto** lets the agent merge after required checks, reviews, and approvals.

Consequential changes, such as trust, authentication, or release changes, still need explicit
human review. See [choose a merge policy](/docs/working-with-shaka#choose-a-merge-policy).

### Independent review

Review by a reviewer that did not write the change. For a Shaka task, it is satisfied at the
current head by one of two things:

- a published local review report, which ends with a line naming the commit and reviewer, such
  as `REVIEWED <sha> BY anthropic/claude`;
- a verified report from a GitHub review job the repository configured.

A green check alone does not prove that a review happened.

### Adversarial review

A review whose job is to find what is wrong. In Shaka, meaningful changes get a local
adversarial review before the push. It runs in a fresh session that did not see the
implementation conversation. What makes it adversarial is that fresh context, not the model:
the same model in a new session is a valid reviewer. Shaka prefers a different provider when one
is available. See [settings](/docs/settings).

### Current head

The latest commit on the PR's branch. Shaka ties evidence to it: test results, reviews, and the
walkthrough must describe the current head. When a fix adds a commit, affected checks and
reviews run again. The merge helper refuses to merge if the head moved since verification.

### Walkthrough

A code walkthrough is a review comment the agent publishes on the PR before merge. It explains
the implementation for someone reading the code: the purpose, the old and new behavior, key
choices, validation, risks, and rollback, with links to the exact lines. The PR description
links to it. When the agent merges, the merge helper requires a walkthrough at the current head.

### PR description

The top of the PR, written for someone deciding whether to merge without reading the diff. It
leads with the outcome, then shows decisions and blockers, a table of checks, and links to the
walkthrough and review result. Longer records sit in expandable sections, including model and
effort details and usage. See [PR verification](/docs/pr-verification).

### Usage

The token counts and estimated dollar cost of the work, including local review, shown in an
expandable section of the PR. Missing usage is marked `UNKNOWN`.

### WIP Details

A collapsed section in the PR description while the work is unfinished. It names the owning
agent chat, where the work stopped, and what comes next, so you or another agent can resume.
See [resume unfinished work](/docs/working-with-shaka#resume-unfinished-work).

### Trusted GitHub actors

The people, bots, and teams whose comments the agent may read in a public repository. People
with verified write, maintain, or admin permission are also trusted. Comments from anyone else
are withheld from the agent, with links kept for maintainers. Even a trusted comment cannot
authorize merging or change policy. See [safety](/safety).

### Control tower

An optional tool for tracking work within and across repositories. Try Shaka on a few tasks
first. See [control towers](/docs/control-towers).

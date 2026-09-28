---
title: Glossary
description: Plain-language definitions for newcomers. What a pull request, branch, test, CI, review, and merge are, plus the Shaka terms used in its docs.
---

# Glossary

New to building software with a coding agent? These definitions cover the words you will meet
in Shaka's docs. The first section explains general software terms. The second explains how
Shaka presents its workflow on a pull request.

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

### Default branch

The branch GitHub uses as the repository's starting point, often named `main`. Pull requests
usually target it, though a project can use other branches for releases or ongoing work.

### Worktree

A separate checkout of the same repository in another folder. Worktrees let you work on
different branches at the same time without mixing their files.

### Pull request (PR)

A request to merge a set of changes from one branch into another, usually the default branch.
Pull requests let teams discuss and test changes before merging them. A squash merge makes
the changes one commit on the target branch.

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

## Shaka workflow terms

### Seam

The connection between Shaka and your repository: settings and scripts that run your
project's setup, tests, and validation. See [repository setup](/docs/configure-repository)
for the current files and their locations.

### Merge policy: Ask and Auto

Who merges a ready PR.

- **Ask** is the default. The agent brings you the reviewed PR. You merge it on GitHub, or tell
  the agent to merge that commit.
- **Auto** lets the agent merge when the configured checks, reviews, approvals, and
  repository restrictions allow it. Customizable [merge limits](/docs/settings#mergelimits)
  cap changed files, changed lines, and commits. Exceeding a limit returns the task to Ask;
  failing required checks still blocks merging.

Consequential changes, such as trust, authentication, or release changes, still need explicit
human review. See [choose a merge policy](/docs/working-with-shaka#choose-a-merge-policy).

### Adversarial review

A review that looks for faults in a change. Shaka uses a fresh session so the reviewer can
examine the work without the implementation conversation. See [settings](/docs/settings)
for the current review options.

### Current head

The latest commit on a PR's branch. It identifies the version under review. When the code
changes, Shaka refreshes the affected checks and review evidence before calling the PR ready. See
[the workflow](/docs/workflow) for the current merge checks.

### Walkthrough

A code walkthrough explains why the implementation works as it does. The agent publishes it
on the PR with links to the relevant code and evidence. See [the workflow](/docs/workflow).

### PR description

The summary at the top of a PR. It tells a reader what changed, what needs a decision, and
how the change was checked. The walkthrough gives more detail about implementation choices.
See [PR verification](/docs/pr-verification).

### Usage

The **Usage and cost** section in a PR description shows available token counts and estimated
dollar cost, including local review. Missing usage is marked `UNKNOWN`.

### WIP Details

A collapsed section in the PR description while the work is unfinished. It names the owning
agent chat, where the work stopped, and what comes next, so you or another agent can resume.
See [resume unfinished work](/docs/working-with-shaka#resume-unfinished-work).

### Trusted GitHub actors

Project contributors with write access and the people, bots, and teams designated as trusted
reviewers. The current public-comment rules
are in the canonical [public-comment safety guide](https://github.com/shakacode/shaka/blob/main/skills/shaka/references/public-comments-safety.md).
Even a trusted comment cannot authorize merging or change policy. See [safety](/safety).

### Control tower

An optional tool for tracking work within and across repositories. Try Shaka on a few tasks
first. See [control towers](/docs/control-towers).

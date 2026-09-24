---
title: Safety
description: How Shaka handles untrusted comments, candidate code, and risky changes, and which protections Ruby code enforces versus the agent's instructions.
---

# Safety

Public issues and pull requests can contain text written to manipulate an agent. Candidate
code can be unsafe to run. Some changes are too consequential for an agent to merge alone.

Shaka handles these risks in two ways. Ruby helpers enforce some rules in code. Other rules
are instructions the agent follows, and nothing fails if it ignores them. This page says which
is which. Run `shaka enforcement` for the full list, or read the
[enforcement reference](/docs/workflow#what-is-enforced).

## Untrusted comments

In a public repository, Shaka reads issue and PR discussions through its `shaka comments`
reader. The reader returns comment text only from:

- people with verified write, maintain, or admin permission on the repository;
- users, bots, and teams listed in `.agents/trusted-github-actors.yml`, in the repository or
  in your home directory.

It withholds everyone else's text and keeps the links, so a maintainer can still look.
Organization membership alone grants no trust. When the reader cannot confirm an author, it
withholds that text or stops. It never trusts an author by default.

The repository's trusted-actor list is read from the default branch. A pull request cannot add
its own author to the list.

Even a trusted author cannot use a comment to authorize merging, change policy, or expose
credentials. Those permissions come only from you and the repository's trusted instructions.
The agent still checks each comment against the code before acting on it.

Private and internal repositories skip the author check. Their comments still carry no
authority.

| What | Enforced by |
| --- | --- |
| Which comment bodies the reader returns | Code: Ruby allowlist and provenance checks |
| Refusing to reply in a public inline thread that includes an excluded author | Code, when the agent replies through Shaka's reply helper |
| Reading comments only through that reader | Agent. Nothing observes a read made another way. |
| Treating admitted comments as data, not instructions | Agent |

See [public-comment safety](https://github.com/shakacode/shaka/blob/main/skills/shaka/references/public-comments-safety.md)
for configuration and limits.

## Settings a pull request cannot change

Shaka's settings live in `.agents/agent-workflow.yml`. The agent reads them from the default
branch, so settings changed in a PR do not govern that PR. A task can ask for a stricter CI
review wait, but it cannot lower the repository's minimum.

The helper that reads settings takes the commit to trust as an argument. Nothing checks which
commit the agent passed, so reading from the default branch is the agent's responsibility.
See [settings](/docs/settings).

Shaka itself runs from its installed location, outside the repository being changed. The
agent must not load a skill or helper supplied by the branch under review. A project branch
cannot replace the skill used to review it.

## Running candidate code

The agent runs candidate code only in the checkout set aside for the task. Nothing observes
where code runs, so this is the agent's responsibility.

Shaka's helpers do not create a sandbox. File, network, and credential access while code runs
depend on your coding agent's permissions and your environment. Use restricted execution for
contributions you do not trust. Private repositories can contain unsafe code too.

When Shaka runs a local reviewer through `shaka review run`, it launches the reviewer's command-line
tool in a read-only or plan mode, so the reviewer cannot edit files. Where the tool supports it,
command running, web access, or extra tool servers are also turned off. The reviewer
starts in a neutral directory, so it does not load the candidate branch's `AGENTS.md`. The diff
is treated as review data. See
[invoke a reviewer locally](https://github.com/shakacode/shaka/blob/main/skills/shaka/references/local-review.md).

## Risky changes need a person

Shaka defaults to **Ask**: the agent brings you the reviewed PR, and you merge it. With **Auto**,
the agent merges after required checks, reviews, and approvals. See
[choose a merge policy](/docs/working-with-shaka#choose-a-merge-policy).

Trust, authentication, permission, release, deployment, destructive-migration, and merge-guard
changes need explicit human review, whatever the merge policy. A small diff does not prove low
risk. Uncertain authority or consequential risk switches Auto to Ask for that task.

Deciding whether a change is risky takes judgment, so this rule relies on the agent. The merge
helper applies the same gates to every change.

## What the merge helper refuses

When the agent merges, the merge helper refuses if:

- the PR head moved since verification;
- the PR is closed or still a draft;
- a required check is missing, failing, or pending;
- a required GitHub review has not approved the PR;
- GitHub reports a merge state the review wait does not allow. With `ci_review_wait: all`, a
  pending or failing optional check also blocks the merge;
- the acting account could bypass branch protection;
- the PR targets a different base than the one the agent passed as validated;
- no code walkthrough was published as a review at the current head.

The helper does not read or judge review findings. Handling each finding before merge is the
agent's job.

In Ask mode you click merge on GitHub, and the helper does not run. Your repository's branch
protection is the gate there. The rule "never push to `main`" is likewise enforced only by
GitHub protection, where the repository has it.

## Private information

The agent checks PR descriptions, walkthroughs, screenshots, and expandable sections for
credentials, customer data, and private task details before publishing. There is no automated
privacy scan. Expandable sections on public PRs are public too. See
[PR verification](/docs/pr-verification).

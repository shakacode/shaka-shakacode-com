import assert from 'node:assert/strict';
import test from 'node:test';

import {mergedPulls, parseCommits, searchApi, timeAgo} from '../prototypes/docusaurus/src/lib/shakaActivity.mjs';

const body = [
  '**Recommendation: Merge** · [Code Walkthrough](https://github.com/shakacode/shaka/pull/635#pullrequestreview-1)',
  ' · [Code Review](https://github.com/shakacode/shaka/pull/635#issuecomment-2)',
  ' · [Checkpoint](https://github.com/shakacode/shaka/pull/635#issuecomment-3)',
].join('');

const commits = [
  {sha: 'c3', url: 'c3', title: 'Newest', date: '2026-10-17T12:00:00Z', pr: 635},
  {sha: 'c2', url: 'c2', title: 'Direct commit', date: '2026-10-17T11:00:00Z', pr: null},
  {sha: 'c1', url: 'c1', title: 'Older from commit', date: '2026-10-17T10:00:00Z', pr: 1},
];

test("mergedPulls follows merge order on main and adds each PR's Shaka links", () => {
  const pulls = mergedPulls(commits, [
    {number: 1, title: 'Older', body: '', pull_request: {merged_at: '2026-10-17T10:00:00Z'}},
    {number: 635, title: 'Newest PR', body, pull_request: {merged_at: '2026-10-17T12:00:00Z'}},
  ]);

  assert.deepEqual(pulls.map((pull) => pull.number), [635, 1]);
  assert.equal(pulls[0].title, 'Newest PR');
  assert.equal(pulls[0].url, 'https://github.com/shakacode/shaka/pull/635');
  assert.equal(pulls[0].recommendation, 'Merge');
  assert.deepEqual(pulls[0].links.map((link) => link.label), ['Code Walkthrough', 'Code Review', 'Checkpoint']);
  assert.deepEqual(pulls[1].links, []);
  assert.equal(pulls[1].recommendation, null);
});

test('mergedPulls still lists a merge the search did not return', () => {
  const [pull] = mergedPulls(commits.slice(0, 1), []);

  assert.equal(pull.title, 'Newest');
  assert.equal(pull.mergedAt, '2026-10-17T12:00:00Z');
  assert.deepEqual(pull.links, []);
});

test('searchApi covers PRs merged into main since the oldest listed merge', () => {
  const url = new URL(searchApi(commits));

  assert.equal(url.searchParams.get('q'), 'repo:shakacode/shaka is:pr is:merged base:main merged:>=2026-10-17T10:00:00Z');
  assert.equal(searchApi([commits[1]]), null);
});

test('mergedPulls drops links that leave the Shaka repository', () => {
  const [pull] = mergedPulls(commits.slice(0, 1), [{
    number: 635, title: 'T', pull_request: {merged_at: '2026-10-17T12:00:00Z'},
    body: '[Code Walkthrough](https://evil.example/pull/3#x) [Code Review](javascript:alert(1))',
  }]);

  assert.deepEqual(pull.links, []);
});

test('parseCommits splits the PR number from the squash title', () => {
  const [withPr, withoutPr] = parseCommits([
    {sha: 'aad0978a8533', html_url: 'c1', commit: {message: 'Use a tagline (#19)\n\nBody', committer: {date: '2026-10-17T00:00:00Z'}}},
    {sha: 'bbbbbbbbbbbb', html_url: 'c2', commit: {message: 'Direct commit', committer: {date: '2026-10-16T00:00:00Z'}}},
  ]);

  assert.deepEqual(withPr, {sha: 'aad0978', url: 'c1', title: 'Use a tagline', date: '2026-10-17T00:00:00Z', pr: 19});
  assert.equal(withoutPr.pr, null);
  assert.equal(withoutPr.title, 'Direct commit');
});

test('timeAgo picks minutes, hours, or days', () => {
  const now = Date.parse('2026-10-17T12:00:00Z');
  assert.equal(timeAgo('2026-10-17T11:55:00Z', now), '5 minutes ago');
  assert.equal(timeAgo('2026-10-17T09:00:00Z', now), '3 hours ago');
  assert.equal(timeAgo('2026-10-14T12:00:00Z', now), '3 days ago');
});

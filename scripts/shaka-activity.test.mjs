import assert from 'node:assert/strict';
import test from 'node:test';

import {parseCommits, parsePulls, timeAgo} from '../prototypes/docusaurus/src/lib/shakaActivity.mjs';

const body = [
  '**Recommendation: Merge** · [Code Walkthrough](https://github.com/shakacode/shaka/pull/635#pullrequestreview-1)',
  ' · [Code Review](https://github.com/shakacode/shaka/pull/635#issuecomment-2)',
  ' · [Checkpoint](https://github.com/shakacode/shaka/pull/635#issuecomment-3)',
].join('');

test('parsePulls keeps merged PRs, newest merge first, with their Shaka links', () => {
  const pulls = parsePulls([
    {number: 1, title: 'Old', html_url: 'u1', merged_at: '2026-10-01T00:00:00Z', body: ''},
    {number: 2, title: 'Closed unmerged', html_url: 'u2', merged_at: null, body},
    {number: 635, title: 'New', html_url: 'u635', merged_at: '2026-10-17T00:00:00Z', body},
  ]);

  assert.deepEqual(pulls.map((pull) => pull.number), [635, 1]);
  assert.equal(pulls[0].recommendation, 'Merge');
  assert.deepEqual(pulls[0].links.map((link) => link.label), ['Code Walkthrough', 'Code Review', 'Checkpoint']);
  assert.deepEqual(pulls[1].links, []);
  assert.equal(pulls[1].recommendation, null);
});

test('parsePulls drops links that leave the Shaka repository', () => {
  const [pull] = parsePulls([{
    number: 3, title: 'T', html_url: 'u', merged_at: '2026-10-17T00:00:00Z',
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

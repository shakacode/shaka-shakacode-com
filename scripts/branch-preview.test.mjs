import { test } from 'node:test';
import assert from 'node:assert/strict';
import { previewOperation, previewUrl } from './branch-preview.mjs';

const sha = 'a'.repeat(40);
const repository = 'shakacode/shaka-shakacode-com';
const request = { operation: 'publish', pr_number: 12, head_sha: sha };
const run = { event: 'pull_request', title: 'Preview PR #12', headBranch: 'feature', headRepository: repository };
const pullRequest = { number: 12, state: 'open', head: { sha, ref: 'feature', repo: { full_name: repository } } };

test('publishes only the current head of a same-repository PR', () => {
  assert.equal(previewOperation(request, run, pullRequest, repository), 'publish');
  assert.equal(previewOperation(request, run, { ...pullRequest, head: { ...pullRequest.head, sha: 'b'.repeat(40) } }, repository), 'skip');
  assert.throws(() => previewOperation(request, run, {
    ...pullRequest, head: { ...pullRequest.head, repo: { full_name: 'someone/fork' } },
  }, repository), /this repository/);
});

test('a PR run must come from the pull request branch', () => {
  assert.throws(() => previewOperation(request, { ...run, title: 'Preview PR #13' }, pullRequest, repository), /title/);
  assert.throws(() => previewOperation(request, { ...run, headBranch: 'other' }, pullRequest, repository), /branch/);
  assert.throws(() => previewOperation(request, { ...run, headRepository: 'someone/fork' }, pullRequest, repository), /originate/);
});

test('manual runs must come from main; deletion requires a closed PR', () => {
  const manualRun = { ...run, event: 'workflow_dispatch', headBranch: 'main' };
  assert.equal(previewOperation(request, manualRun, pullRequest, repository), 'publish');
  assert.throws(() => previewOperation(request, { ...manualRun, headBranch: 'feature' }, pullRequest, repository), /main/);
  const deletion = { ...request, operation: 'delete' };
  assert.equal(previewOperation(deletion, run, pullRequest, repository), 'skip');
  assert.equal(previewOperation(deletion, run, { ...pullRequest, state: 'closed' }, repository), 'delete');
  assert.equal(previewOperation(request, run, { ...pullRequest, state: 'closed' }, repository, { reconcile: true }), 'delete');
  assert.equal(previewOperation(request, run, {
    ...pullRequest, state: 'closed', head: { ...pullRequest.head, sha: 'c'.repeat(40) },
  }, repository, { reconcile: true }), 'delete');
  assert.equal(previewOperation(deletion, run, {
    ...pullRequest, state: 'closed', head: { ...pullRequest.head, sha: 'c'.repeat(40) },
  }, repository), 'skip');
  assert.throws(() => previewOperation(request, { ...run, event: 'push' }, pullRequest, repository), /Unexpected/);
});

test('rejects malformed metadata before using it as an API path', () => {
  assert.throws(() => previewOperation({ ...request, pr_number: '../1' }, run, pullRequest, repository), /number/);
  assert.throws(() => previewOperation({ ...request, head_sha: 'unexpected' }, run, pullRequest, repository), /SHA/);
});

test('preview comments accept only HTTPS Workers URLs', () => {
  assert.equal(previewUrl('https://pr-12.example.workers.dev/'), 'https://pr-12.example.workers.dev/');
  assert.throws(() => previewUrl('https://example.com/'), /workers.dev/);
  assert.throws(() => previewUrl('http://pr-12.example.workers.dev/'), /HTTPS/);
});

import { appendFileSync, lstatSync, readFileSync } from 'node:fs';

const marker = '<!-- shaka-branch-preview -->';
const botLogin = 'github-actions[bot]';

function validateRequest(request) {
  if (!Number.isSafeInteger(request?.pr_number) || request.pr_number < 1) {
    throw new Error('Invalid pull request number in preview request');
  }
  if (!['publish', 'delete'].includes(request.operation)) {
    throw new Error('Invalid preview operation');
  }
  if (!/^[a-f0-9]{40}$/.test(request.head_sha ?? '')) {
    throw new Error('Invalid head SHA in preview request');
  }
}

export function previewOperation(request, run, pullRequest, repository, { reconcile = false } = {}) {
  validateRequest(request);
  if (run.title !== `Preview PR #${request.pr_number}`) {
    throw new Error('Preview request does not match the workflow run title');
  }
  if (pullRequest.number !== request.pr_number || pullRequest.head?.repo?.full_name !== repository) {
    throw new Error('Preview request does not identify a pull request in this repository');
  }
  if (run.headRepository !== repository) {
    throw new Error('Preview build did not originate in this repository');
  }
  if (run.event === 'workflow_dispatch') {
    if (run.headBranch !== 'main') {
      throw new Error('Manual preview requests must run from main');
    }
  } else if (run.event !== 'pull_request') {
    throw new Error('Unexpected preview build event');
  } else if (run.headBranch !== pullRequest.head.ref) {
    throw new Error('Preview build branch does not match the pull request');
  }

  // The last pending job in a concurrency group survives. It must clean up a
  // closed PR even when its original artifact asked to publish an older head.
  if (reconcile && pullRequest.state === 'closed') return 'delete';

  if (request.operation === 'publish') {
    if (pullRequest.state !== 'open' || pullRequest.head.sha !== request.head_sha) {
      return 'skip';
    }
    return 'publish';
  }

  // A merged PR can report the new main commit as its workflow head.
  // The pull request state and recorded PR head remain authoritative.
  return pullRequest.state === 'closed' && pullRequest.head.sha === request.head_sha
    ? 'delete'
    : 'skip';
}

export function previewUrl(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || !url.hostname.endsWith('.workers.dev')) {
    throw new Error('Preview URL must be an HTTPS workers.dev URL');
  }
  return url.toString();
}

async function github(path, options = {}) {
  const response = await fetch(`https://api.github.com/${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GH_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...options.headers,
    },
  });
  if (!response.ok) throw new Error(`GitHub API returned ${response.status} for ${path}`);
  return response.status === 204 ? null : response.json();
}

async function comments(repository, number) {
  const result = [];
  for (let page = 1; ; page += 1) {
    const batch = await github(`repos/${repository}/issues/${number}/comments?per_page=100&page=${page}`);
    result.push(...batch);
    if (batch.length < 100) return result;
  }
}

async function ownComment(repository, number) {
  const all = await comments(repository, number);
  return all.findLast((comment) => comment.user?.login === botLogin && comment.body?.startsWith(marker));
}

async function upsertComment(repository, number, existing, body) {
  if (existing) {
    await github(`repos/${repository}/issues/comments/${existing.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ body }),
    });
  } else {
    await github(`repos/${repository}/issues/${number}/comments`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ body }),
    });
  }
}

function output(values) {
  appendFileSync(process.env.GITHUB_OUTPUT, Object.entries(values).map(([key, value]) => `${key}=${value}\n`).join(''));
}

async function main() {
  const command = process.argv[2];
  if (command === 'validate-url') {
    console.log(previewUrl(process.env.PREVIEW_URL));
    return;
  }
  const repository = process.env.GITHUB_REPOSITORY;
  if (!/^[-\w]+\/[-\w.]+$/.test(repository ?? '')) throw new Error('Invalid repository');
  if (!process.env.GH_TOKEN) throw new Error('GH_TOKEN is required');

  if (command === 'verify') {
    const path = process.env.PREVIEW_REQUEST_PATH;
    const stat = lstatSync(path);
    if (!stat.isFile() || stat.size > 4096) throw new Error('Invalid preview request artifact');
    const request = JSON.parse(readFileSync(path, 'utf8'));
    validateRequest(request);
    const pullRequest = await github(`repos/${repository}/pulls/${request.pr_number}`);
    const operation = previewOperation(request, {
      event: process.env.PREVIEW_RUN_EVENT,
      title: process.env.PREVIEW_RUN_TITLE,
      headBranch: process.env.PREVIEW_RUN_HEAD_BRANCH,
      headRepository: process.env.PREVIEW_RUN_HEAD_REPOSITORY,
    }, pullRequest, repository, { reconcile: process.env.PREVIEW_RECONCILE === 'true' });
    output({ operation, pr_number: request.pr_number, head_sha: request.head_sha });
    console.log(`Preview request for PR #${request.pr_number}: ${operation}`);
    return;
  }

  const number = Number(process.env.PREVIEW_PR_NUMBER);
  if (!Number.isSafeInteger(number) || number < 1) throw new Error('Invalid pull request number');
  const existing = await ownComment(repository, number);

  if (command === 'comment-pending') {
    const sha = process.env.PREVIEW_HEAD_SHA;
    if (!/^[a-f0-9]{40}$/.test(sha ?? '')) throw new Error('Invalid preview head SHA');
    const previousUrl = existing?.body.match(/https:\/\/[-\w.]+\.workers\.dev\//)?.[0];
    const previousPreview = previousUrl ? `\n\nPrevious preview: ${previousUrl}` : '';
    await upsertComment(repository, number, existing,
      `${marker}\nPublishing the branch preview for PR #${number} at \`${sha.slice(0, 7)}\`. The URL will appear here after the deployed site responds.${previousPreview}`);
    return;
  }

  if (command === 'comment-publish') {
    const url = previewUrl(process.env.PREVIEW_URL);
    const sha = process.env.PREVIEW_HEAD_SHA;
    if (!/^[a-f0-9]{40}$/.test(sha ?? '')) throw new Error('Invalid preview head SHA');
    const body = `${marker}\nBranch preview for PR #${number} at \`${sha.slice(0, 7)}\`:\n\n${url}\n\nThis URL updates after each successful branch build.`;
    await upsertComment(repository, number, existing, body);
    console.log(`Published preview URL on PR #${number}`);
    return;
  }

  if (command === 'comment-delete') {
    if (existing) {
      await github(`repos/${repository}/issues/comments/${existing.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: `${marker}\nBranch preview removed after PR #${number} closed.` }),
      });
    }
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

if (process.argv[1]?.endsWith('/branch-preview.mjs')) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

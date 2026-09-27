import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

const workspace = resolve(".");
const cleanupScript = resolve(".github/scripts/cleanup-worker-preview.sh");
const commentScript = resolve(".github/scripts/manage-worker-preview-comment.sh");
const readMetadataScript = resolve(".github/scripts/read-worker-preview-metadata.sh");

function createHarness(t, options = {}) {
  const root = mkdtempSync(join(tmpdir(), "shaka-preview-test-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const bin = join(root, "bin");
  const runnerTemp = join(root, "runner");
  mkdirSync(bin);
  mkdirSync(runnerTemp);
  writeFileSync(join(root, "comments.json"), options.comments ?? "[]");
  writeFileSync(join(bin, "curl"), `#!/usr/bin/env bash
set -euo pipefail
method=GET
output=''
url=''
while (($#)); do
  case "$1" in
    --request) method="$2"; shift 2 ;;
    --output) output="$2"; shift 2 ;;
    --write-out) shift 2 ;;
    http*) url="$1"; shift ;;
    *) shift ;;
  esac
done
printf '%s %s\\n' "$method" "$url" >> "$MOCK_CURL_CALLS"
if [[ "$method" == DELETE ]]; then
  printf '%s' "$MOCK_DELETE_BODY" > "$output"
  printf '%s' "$MOCK_DELETE_STATUS"
else
  printf '%s' "$MOCK_WORKER_BODY" > "$output"
  printf '%s' "$MOCK_WORKER_STATUS"
fi
`, { mode: 0o755 });
  writeFileSync(join(bin, "gh"), `#!/usr/bin/env bash
set -euo pipefail
if [[ "$*" == *'/comments?per_page=100'* ]]; then
  cat "$MOCK_COMMENTS"
elif [[ "$*" == *'--method PATCH'* || "$*" == *'--method POST'* ]]; then
  printf '%s\\n' "$*" > "$MOCK_GH_CALL"
  cat > "$MOCK_GH_PAYLOAD"
else
  echo "Unexpected gh call: $*" >&2
  exit 1
fi
`, { mode: 0o755 });
  const env = {
    ...process.env,
    PATH: `${bin}:${process.env.PATH}`,
    BASH_ENV: "",
    GITHUB_WORKSPACE: workspace,
    RUNNER_TEMP: runnerTemp,
    GITHUB_REPOSITORY: "shakacode/shaka-shakacode-com",
    PR_NUMBER: "42",
    GH_TOKEN: "test-token",
    CLOUDFLARE_API_TOKEN: "test-token",
    CLOUDFLARE_ACCOUNT_ID: "test-account",
    PREVIEW_REMOVAL_REASON: options.removalReason ?? "Preview removed because this PR was closed.",
    MOCK_COMMENTS: join(root, "comments.json"),
    MOCK_DELETE_STATUS: options.deleteStatus ?? "200",
    MOCK_DELETE_BODY: options.deleteBody ?? '{"success":true}',
    MOCK_WORKER_STATUS: options.workerStatus ?? "200",
    MOCK_WORKER_BODY: options.workerBody ?? '{"success":true}',
    MOCK_CURL_CALLS: join(root, "curl-calls.txt"),
    MOCK_GH_CALL: join(root, "gh-call.txt"),
    MOCK_GH_PAYLOAD: join(root, "gh-payload.json"),
  };
  return { root, env };
}

function run(script, args, env) {
  return spawnSync("bash", [script, ...args], { encoding: "utf8", env });
}

test("cleanup accepts an absent preview only when its Worker still exists", (t) => {
  const harness = createHarness(t, { deleteStatus: "404" });
  const result = run(cleanupScript, [], harness.env);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Preview is already absent/);
  assert.match(readFileSync(harness.env.MOCK_CURL_CALLS, "utf8"), /DELETE https:\/\/api\.cloudflare\.com\/client\/v4\/accounts\/test-account\/workers\/workers\/shaka-shakacode-com\/previews\/pr-42/);
  assert.equal(existsSync(harness.env.MOCK_GH_CALL), false);

  const missingWorker = createHarness(t, { deleteStatus: "404", workerStatus: "404", workerBody: '{"success":false}' });
  const missingWorkerResult = run(cleanupScript, [], missingWorker.env);
  assert.notEqual(missingWorkerResult.status, 0);
  assert.match(missingWorkerResult.stderr, /Worker could not be confirmed/);
});

test("cleanup rejects Cloudflare failures without editing the PR comment", (t) => {
  const serverFailure = createHarness(t, { deleteStatus: "500", deleteBody: '{"success":false}' });
  const serverFailureResult = run(cleanupScript, [], serverFailure.env);
  assert.notEqual(serverFailureResult.status, 0);
  assert.equal(existsSync(serverFailure.env.MOCK_GH_CALL), false);

  const unsuccessfulDelete = createHarness(t, { deleteStatus: "200", deleteBody: '{"success":false}' });
  const unsuccessfulDeleteResult = run(cleanupScript, [], unsuccessfulDelete.env);
  assert.notEqual(unsuccessfulDeleteResult.status, 0);
  assert.equal(existsSync(unsuccessfulDelete.env.MOCK_GH_CALL), false);
});

test("cleanup updates only the bot comment and uses a real newline", (t) => {
  const comments = JSON.stringify([[
    { id: 8, user: { login: "contributor" }, body: "<!-- cloudflare-worker-preview --> forged" },
    { id: 9, user: { login: "github-actions[bot]" }, body: "<!-- cloudflare-worker-preview -->\nPreview: https://preview.test" },
  ]]);
  const harness = createHarness(t, { comments });
  const result = run(cleanupScript, [], harness.env);
  assert.equal(result.status, 0, result.stderr);
  assert.match(readFileSync(harness.env.MOCK_GH_CALL, "utf8"), /issues\/comments\/9/);
  const payload = JSON.parse(readFileSync(harness.env.MOCK_GH_PAYLOAD, "utf8"));
  assert.equal(payload.body, "<!-- cloudflare-worker-preview -->\nPreview removed because this PR was closed.");
});

test("cleanup explains when it removes a Preview for a newer PR head", (t) => {
  const comments = JSON.stringify([[
    { id: 9, user: { login: "github-actions[bot]" }, body: "<!-- cloudflare-worker-preview -->\nPreview: https://preview.test" },
  ]]);
  const harness = createHarness(t, {
    comments,
    removalReason: "Preview removed because the PR head changed. A new Preview will be available after the latest build succeeds.",
  });
  const result = run(cleanupScript, [], harness.env);
  assert.equal(result.status, 0, result.stderr);
  const payload = JSON.parse(readFileSync(harness.env.MOCK_GH_PAYLOAD, "utf8"));
  assert.equal(payload.body, "<!-- cloudflare-worker-preview -->\nPreview removed because the PR head changed. A new Preview will be available after the latest build succeeds.");
});

test("removing a missing bot comment makes no GitHub write", (t) => {
  const harness = createHarness(t, { comments: "[[]]" });
  const result = run(commentScript, ["remove"], harness.env);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(existsSync(harness.env.MOCK_GH_CALL), false);
});

test("publishing ignores forged markers and requires an HTTPS URL", (t) => {
  const comments = JSON.stringify([[{ id: 8, user: { login: "contributor" }, body: "<!-- cloudflare-worker-preview --> forged" }]]);
  const harness = createHarness(t, { comments });
  const result = run(commentScript, ["publish"], { ...harness.env, PREVIEW_URL: "https://pr-42.example.workers.dev" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(readFileSync(harness.env.MOCK_GH_CALL, "utf8"), /--method POST/);
  const payload = JSON.parse(readFileSync(harness.env.MOCK_GH_PAYLOAD, "utf8"));
  assert.equal(payload.body, "<!-- cloudflare-worker-preview -->\nPreview: https://pr-42.example.workers.dev");

  const invalid = run(commentScript, ["publish"], { ...harness.env, PREVIEW_URL: "http://example.test" });
  assert.notEqual(invalid.status, 0);
});

test("preview metadata identifies the PR and rejects stale head commits", (t) => {
  const metadataDir = mkdtempSync(join(tmpdir(), "shaka-preview-metadata-"));
  t.after(() => rmSync(metadataDir, { recursive: true, force: true }));
  const metadataFile = join(metadataDir, "metadata.json");
  const headSha = "a".repeat(40);
  writeFileSync(metadataFile, JSON.stringify({ pr_number: 42, head_sha: headSha }));

  const valid = run(readMetadataScript, [metadataFile, headSha], process.env);
  assert.equal(valid.status, 0, valid.stderr);
  assert.equal(Number(valid.stdout), 42);

  const stale = run(readMetadataScript, [metadataFile, "c".repeat(40)], process.env);
  assert.notEqual(stale.status, 0);

  for (const invalidPrNumber of [42.5, 1e30, "42"]) {
    writeFileSync(metadataFile, JSON.stringify({ pr_number: invalidPrNumber, head_sha: headSha }));
    const invalid = run(readMetadataScript, [metadataFile, headSha], process.env);
    assert.notEqual(invalid.status, 0, `accepted invalid PR number ${invalidPrNumber}`);
  }
});

#!/usr/bin/env bash
set -euo pipefail

action="${1:-}"
if [[ "$action" != publish && "$action" != remove ]]; then
  echo "Usage: manage-worker-preview-comment.sh publish|remove" >&2
  exit 2
fi

: "${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required.}"
: "${PR_NUMBER:?PR_NUMBER is required.}"

if [[ ! "$PR_NUMBER" =~ ^[0-9]+$ ]]; then
  echo "Invalid pull request number: $PR_NUMBER" >&2
  exit 1
fi

marker='<!-- cloudflare-worker-preview -->'
comments="$(gh api --paginate --slurp "repos/$GITHUB_REPOSITORY/issues/$PR_NUMBER/comments?per_page=100")"
comment_id="$(printf '%s' "$comments" | jq -r --arg marker "$marker" '[.[][] | select(.user.login == "github-actions[bot]" and (.body | contains($marker)))] | last | .id // empty')"

if [[ "$action" == remove ]]; then
  [[ -n "$comment_id" ]] || exit 0
  : "${PREVIEW_REMOVAL_REASON:?PREVIEW_REMOVAL_REASON is required when removing a Preview comment.}"
  if [[ "$PREVIEW_REMOVAL_REASON" == *$'\n'* ]]; then
    echo "PREVIEW_REMOVAL_REASON must be a single line." >&2
    exit 1
  fi
  body="$marker
$PREVIEW_REMOVAL_REASON"
else
  : "${PREVIEW_URL:?PREVIEW_URL is required to publish a Preview comment.}"
  if [[ "$PREVIEW_URL" != https://* || "$PREVIEW_URL" == *$'\n'* ]]; then
    echo "PREVIEW_URL must be a single HTTPS URL." >&2
    exit 1
  fi
  body="$marker
Preview: $PREVIEW_URL"
fi

payload="$(jq -n --arg body "$body" '{body: $body}')"
if [[ -n "$comment_id" ]]; then
  printf '%s' "$payload" | gh api --method PATCH "repos/$GITHUB_REPOSITORY/issues/comments/$comment_id" --input -
elif [[ "$action" == publish ]]; then
  printf '%s' "$payload" | gh api --method POST "repos/$GITHUB_REPOSITORY/issues/$PR_NUMBER/comments" --input -
fi

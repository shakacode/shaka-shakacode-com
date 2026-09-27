#!/usr/bin/env bash
set -euo pipefail

: "${CLOUDFLARE_API_TOKEN:?Configure CLOUDFLARE_API_TOKEN in the GitHub preview environment.}"
: "${CLOUDFLARE_ACCOUNT_ID:?Configure CLOUDFLARE_ACCOUNT_ID in the GitHub preview environment.}"
: "${GITHUB_WORKSPACE:?GITHUB_WORKSPACE is required.}"
: "${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required.}"
: "${PR_NUMBER:?PR_NUMBER is required.}"
: "${PREVIEW_REMOVAL_REASON:?PREVIEW_REMOVAL_REASON is required.}"
: "${RUNNER_TEMP:?RUNNER_TEMP is required.}"

if [[ ! "$PR_NUMBER" =~ ^[0-9]+$ ]]; then
  echo "Invalid pull request number: $PR_NUMBER" >&2
  exit 1
fi

worker_name="$(awk '/^\[/ { exit } /^name = "/ { sub(/^name = "/, ""); sub(/"$/, ""); print; exit }' "$GITHUB_WORKSPACE/wrangler.toml")"
if [[ -z "$worker_name" ]]; then
  echo "Could not read the Worker name from the trusted Wrangler config." >&2
  exit 1
fi

preview_url="https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/workers/workers/$worker_name/previews/pr-$PR_NUMBER"
response_file="$RUNNER_TEMP/preview-delete-response.json"
http_status="$(curl --silent --show-error --output "$response_file" --write-out '%{http_code}' \
  --request DELETE \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  "$preview_url")"
if [[ "$http_status" == 404 ]]; then
  worker_response="$RUNNER_TEMP/worker-get-response.json"
  worker_status="$(curl --silent --show-error --output "$worker_response" --write-out '%{http_code}' \
    --request GET \
    --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/workers/workers/$worker_name")"
  if [[ "$worker_status" =~ ^2[0-9][0-9]$ ]] && jq -e '.success == true' "$worker_response" >/dev/null; then
    echo "Cloudflare Preview is already absent."
  else
    cat "$worker_response" >&2
    echo "Preview deletion returned 404, but the Worker could not be confirmed (HTTP $worker_status)." >&2
    exit 1
  fi
elif [[ "$http_status" =~ ^2[0-9][0-9]$ ]] && jq -e '.success == true' "$response_file" >/dev/null; then
  echo "Cloudflare Preview deleted."
else
  cat "$response_file" >&2
  echo "Preview deletion failed with HTTP $http_status." >&2
  exit 1
fi

PREVIEW_REMOVAL_REASON="$PREVIEW_REMOVAL_REASON" bash "$GITHUB_WORKSPACE/.github/scripts/manage-worker-preview-comment.sh" remove

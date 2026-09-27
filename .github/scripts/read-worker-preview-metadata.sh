#!/usr/bin/env bash
set -euo pipefail

if (($# != 2)); then
  echo "Usage: read-worker-preview-metadata.sh FILE EXPECTED_HEAD_SHA" >&2
  exit 2
fi

metadata_file="$1"
expected_head_sha="$2"
pr_number="$(jq -er 'select(.pr_number | type == "number" and . > 0 and floor == . and . <= 9007199254740991) | .pr_number | tostring' "$metadata_file")"
metadata_head_sha="$(jq -er '.head_sha | strings | select(test("^[0-9a-f]{40,64}$"))' "$metadata_file")"

if [[ "$metadata_head_sha" != "$expected_head_sha" ]]; then
  echo "Preview metadata does not match the workflow run head SHA." >&2
  exit 1
fi

printf '%s\n' "$pr_number"

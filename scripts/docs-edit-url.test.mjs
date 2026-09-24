import assert from "node:assert/strict";
import test from "node:test";

import { resolveDocsEditUrl } from "./docs-edit-url.mjs";

test("synced docs link to the matching upstream file", () => {
  assert.equal(
    resolveDocsEditUrl("getting-started.md"),
    "https://github.com/shakacode/shaka/tree/main/docs/getting-started.md"
  );
});

test("the docs overview links to the upstream docs README", () => {
  // Shaka ships docs/README.md, so the overview has a real source file.
  assert.equal(
    resolveDocsEditUrl("README.md"),
    "https://github.com/shakacode/shaka/tree/main/docs/README.md"
  );
});

test("a generated changelog edit link points at the upstream CHANGELOG source", () => {
  assert.equal(
    resolveDocsEditUrl("changelog.md"),
    "https://github.com/shakacode/shaka/blob/main/CHANGELOG.md"
  );
});

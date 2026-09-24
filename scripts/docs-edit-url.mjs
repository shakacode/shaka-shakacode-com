// Resolves the "Edit this page" target for a synced doc, given its path within
// the docs tree (the `docPath` Docusaurus passes to `editUrl`).
//
// Docs are copied verbatim from the upstream `docs/` tree, including its
// README.md overview, so every edit link points back at the matching upstream
// file. changelog.md would be generated from a repo-root CHANGELOG.md, so it
// points there instead.
const UPSTREAM_DOCS_TREE =
  "https://github.com/shakacode/shaka/tree/main/docs/";
const UPSTREAM_CHANGELOG =
  "https://github.com/shakacode/shaka/blob/main/CHANGELOG.md";

export function resolveDocsEditUrl(docPath) {
  if (docPath === "changelog.md") {
    return UPSTREAM_CHANGELOG;
  }
  return `${UPSTREAM_DOCS_TREE}${docPath}`;
}

import assert from "node:assert/strict";
import test from "node:test";

import {
  buildChangelogMarkdown,
  buildDocsHomeMarkdown,
  correctKnownBrokenAnchors,
  rewriteChangelogLinkTarget,
  rewriteChangelogLinks,
  rewriteDocLinkTarget,
  rewriteDocLinks
} from "./prepare-docs.mjs";

test("changelog markdown injects Docusaurus frontmatter with CommonMark parsing", () => {
  const source = `# Versions

- **Added support for raw tags** such as <script async> in historical notes.
`;

  const updated = buildChangelogMarkdown(source);

  assert.match(updated, /^---\ntitle: Changelog\n/m);
  assert.match(updated, /mdx:\n {2}format: md/);
  assert.match(updated, /# Changelog/);
  assert.doesNotMatch(updated, /^# Versions$/m);
  assert.match(updated, /^## Versions$/m);
  assert.match(updated, /<script async>/);
});

test("changelog link targets preserve upstream docs as internal docs routes", () => {
  assert.equal(rewriteChangelogLinkTarget("./docs/v9_upgrade.md"), "/docs/v9_upgrade");
  assert.equal(
    rewriteChangelogLinkTarget("docs/guides/nested.md#steps"),
    "/docs/guides/nested#steps"
  );
});

test("changelog link targets send other relative paths to upstream GitHub", () => {
  assert.equal(
    rewriteChangelogLinkTarget("./README.md"),
    "https://github.com/shakacode/shaka/blob/main/README.md"
  );
  assert.equal(
    rewriteChangelogLinkTarget("shaka.gemspec"),
    "https://github.com/shakacode/shaka/blob/main/shaka.gemspec"
  );
});

test("changelog links rewrite markdown links while preserving external links and titles", () => {
  const source = [
    "[Upgrade](./docs/v9_upgrade.md#swc-loose-mode-breaking-change-v910)",
    "[Migration](docs/guides/nested.md \"migration guide\")",
    "[GitHub PR](https://github.com/shakacode/shaka/pull/1096)"
  ].join("\n");

  const updated = rewriteChangelogLinks(source);

  assert.match(updated, /\[Upgrade\]\(\/docs\/v9_upgrade#swc-loose-mode-breaking-change-v910\)/);
  assert.match(
    updated,
    /\[Migration\]\(\/docs\/guides\/nested "migration guide"\)/
  );
  assert.match(updated, /\[GitHub PR\]\(https:\/\/github\.com\/shakacode\/shaka\/pull\/1096\)/);
  assert.doesNotMatch(updated, /\.md[)#"]/);
});

test("doc links that escape the docs tree are sent to upstream GitHub", () => {
  assert.equal(
    rewriteDocLinkTarget("../skills/shaka/SKILL.md", "workflow.md"),
    "https://github.com/shakacode/shaka/blob/main/skills/shaka/SKILL.md"
  );
  assert.equal(
    rewriteDocLinkTarget("../../skills/shaka/references/README.md", "guides/nested.md"),
    "https://github.com/shakacode/shaka/blob/main/skills/shaka/references/README.md"
  );
  assert.equal(
    rewriteDocLinkTarget("../package.json", "installation.md"),
    "https://github.com/shakacode/shaka/blob/main/package.json"
  );
});

test("doc links preserve anchors and query strings when sent to GitHub", () => {
  assert.equal(
    rewriteDocLinkTarget("../README.md#installation", "v8_upgrade.md"),
    "https://github.com/shakacode/shaka/blob/main/README.md#installation"
  );
});

test("doc links that stay inside the docs tree are left untouched", () => {
  assert.equal(rewriteDocLinkTarget("./configuration.md", "workflow.md"), "./configuration.md");
  assert.equal(
    rewriteDocLinkTarget("./troubleshooting.md#flash-of-unstyled-content-fouc", "rspack_migration_guide.md"),
    "./troubleshooting.md#flash-of-unstyled-content-fouc"
  );
  assert.equal(
    rewriteDocLinkTarget("../dependency-strategy.md", "guides/nested.md"),
    "../dependency-strategy.md"
  );
  assert.equal(rewriteDocLinkTarget("../docs/v7_upgrade.md", "v8_upgrade.md"), "../docs/v7_upgrade.md");
});

test("doc links leave external, absolute, and anchor-only targets untouched", () => {
  assert.equal(
    rewriteDocLinkTarget("https://github.com/shakacode/shaka", "rspack.md"),
    "https://github.com/shakacode/shaka"
  );
  assert.equal(rewriteDocLinkTarget("/docs/troubleshooting", "rspack.md"), "/docs/troubleshooting");
  assert.equal(rewriteDocLinkTarget("#section", "rspack.md"), "#section");
  assert.equal(rewriteDocLinkTarget("mailto:team@example.com", "rspack.md"), "mailto:team@example.com");
});

test("doc link rewriting preserves labels, titles, and in-tree links across a document", () => {
  const source = [
    "[SKILL.md](../skills/shaka/SKILL.md)",
    "[Configuration](./configuration.md)",
    "[README](../README.md \"project readme\")",
    "[GitHub](https://github.com/shakacode/shaka)"
  ].join("\n");

  const updated = rewriteDocLinks(source, "workflow.md");

  assert.match(
    updated,
    /\[SKILL\.md\]\(https:\/\/github\.com\/shakacode\/shaka\/blob\/main\/skills\/shaka\/SKILL\.md\)/
  );
  assert.match(updated, /\[Configuration\]\(\.\/configuration\.md\)/);
  assert.match(
    updated,
    /\[README\]\(https:\/\/github\.com\/shakacode\/shaka\/blob\/main\/README\.md "project readme"\)/
  );
  assert.match(updated, /\[GitHub\]\(https:\/\/github\.com\/shakacode\/shaka\)/);
});

test("anchor corrections leave documents without corrections unchanged", () => {
  const source = "[x](./settings.md#reviewci_review_wait)";

  assert.equal(correctKnownBrokenAnchors(source, "working-with-shaka.md"), source);
});

test("fallback docs overview leads with getting started", () => {
  const markdown = buildDocsHomeMarkdown([
    "getting-started.md",
    "working-with-shaka.md",
    "settings.md"
  ]);

  assert.match(
    markdown,
    /## Key Guides\n\n- \[Getting Started\]\(\.\/getting-started\.md\)/
  );
  assert.ok(
    markdown.indexOf("getting-started.md") < markdown.indexOf("settings.md"),
    "getting started should be listed before settings"
  );
});

test("fallback docs overview omits guides absent from the synced tree", () => {
  const markdown = buildDocsHomeMarkdown(["getting-started.md"]);

  assert.match(markdown, /- \[Getting Started\]\(\.\/getting-started\.md\)/);
  assert.doesNotMatch(markdown, /settings\.md/);
});

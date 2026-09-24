# shaka-shakacode-com

Docs site for [Shaka](https://github.com/shakacode/shaka), to be published at
`shaka.shakacode.com`. It will be built with Docusaurus, following the same pattern as
[shakapacker.com](https://github.com/shakacode/shakapacker.com) and
[reactonrails.com](https://github.com/shakacode/reactonrails.com): the docs are
written in `shakacode/shaka/docs/` and synced into this site on every build.

The site is not built yet. See the [migration plan](plans/docusaurus-migration.md).

## Checks

```bash
.agents/bin/setup
.agents/bin/validate
```

Until the Docusaurus site lands, validation checks that every tracked text file ends
with a newline.

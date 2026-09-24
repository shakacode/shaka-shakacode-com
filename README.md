# shaka-shakacode-com

The docs site for [Shaka](https://github.com/shakacode/shaka), published at
[shaka.shakacode.com](https://shaka.shakacode.com). Built with Docusaurus, the same way as
[shakapacker.com](https://github.com/shakacode/shakapacker.com) and
[reactonrails.com](https://github.com/shakacode/reactonrails.com).

## Docs ownership

- Write docs in [`shakacode/shaka/docs`](https://github.com/shakacode/shaka/tree/main/docs).
  The site syncs them on every build; a docs change on Shaka's `main` triggers a rebuild.
- This repository owns the homepage, case studies, navigation and footer, styling, and the
  sync and prepare transforms. Do not add canonical docs content here.

## Develop

```bash
npm run install:site
npm run prepare   # uses ../shaka if present, otherwise clones shakacode/shaka
npm run dev
```

## Checks

```bash
.agents/bin/setup
.agents/bin/validate   # text files, script tests, docs sync and site build, docs audit
```

See [ARCHITECTURE.md](ARCHITECTURE.md), [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md), and the
[migration plan](plans/docusaurus-migration.md).

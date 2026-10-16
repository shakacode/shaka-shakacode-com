---
name: refresh-pr-screenshots
description: Refresh screenshots of Shaka pull requests in the docs when the PR format changes or examples become stale. Use for recurring PR screenshot maintenance, rather than app UI screenshots on the Examples page.
---

# Refresh PR screenshots

Update the examples readers use to recognize today's Shaka PR format. Use the
installed Shaka skill for delivery and its current verification and merge rules.
This skill supplies the screenshot-specific work, not a second delivery workflow.

## Locate the source and changes

- Read this site's README and AGENTS.md. Canonical docs and their images belong
  in `shakacode/shaka`; this repo owns the presentation and site-only pages.
  Verify both repositories' live owner, visibility, and default branch. Locate
  a canonical checkout. Resolve its default branch to an immutable SHA and load
  its own policy with the installed `shaka seam check --root PATH --ref SHA`
  before using its commands. Read its trusted human-only instructions as well.
- Inspect the current guide, image references, capture dates, source PR links,
  and their Git history. The canonical `docs/pr-verification.md` is the starting
  point for PR-format examples. Compare changes since each example was added or
  last refreshed with the current rendered PRs and guide.
- Choose recent public PRs that actually display the changed format. Prefer a
  small set covering distinct reader decisions: recommendation and evidence
  links, walkthrough, review history, checkpoint, or human comments as relevant.
  A newer PR number alone does not establish that its body uses the new format.
- Reuse useful captures. Replace stale examples and captions together; add an
  example only for a reader-visible change the existing examples cannot show.
  If nothing relevant changed, report the comparison without manufacturing edits.

## Capture and verify

Use a supported browser to open the source PR or exact comment. Expand only the
sections needed to explain the example. Capture real rendered content, retaining
relevant headings, revision, and reviewer coverage limits. Crop and compress for
readability; preserve the displayed text and state.

Inspect the **saved file**, not just the browser preview. After scrolling, an
export can capture the wrong part of the page. Confirm every file shows the
intended comment and matches its caption; if it differs from the visible browser,
use another supported capture method and inspect that saved result too.

Keep captures free of unrelated tabs, notifications, credentials, and private
content. Use descriptive alt text, a capture date, and a public source link to the
PR or comment. Explain that captures are historical when a live recommendation
could be mistaken for approval of a different commit. Keep required instructions
in accessible prose rather than only inside an image.

## Update the owning repository

Inspect the canonical `shaka.gemspec` image allowlist before choosing filenames
and formats. It currently packages flat `docs/img/*.{svg,webp}` assets: a nested
JPEG can render on the site yet break packaged Markdown links. Prefer replacing
the existing flat WebP assets without expanding packaging behavior. For a local
PNG or JPEG capture, an available `cwebp` can encode it:

```sh
cwebp -q 92 capture.png -o pr-example.webp
```

Inspect the encoded file again. Update relative image references, alt text,
capture dates, and source links in the canonical guide. Remove replaced assets
only after checking other references. Keep site-only changes in this repository.

## Verify and deliver

Run the owning repo's trusted validation. For canonical image changes, include
the existing package link-resolution test: a site build alone cannot show that
the gem includes an image. Reuse unaffected evidence according to Shaka's rules.

Preview the canonical candidate through this site by setting `SHAKA_REPO` to its
absolute checkout path for the site's prepare/build commands. Inspect the site's
sync script and current package scripts when selecting those commands. This
avoids silently previewing a fresh clone of canonical `main` instead of the change.
After sync, compare the changed pages and image hashes in `content/upstream/docs`
with the canonical candidate. Treat a missing or mismatched file as a failed
preview check, even when the build passes.
Build, audit, and inspect every affected section on desktop and a phone viewport.
Confirm each image loads when scrolled into view, remains readable or opens at
full size, and fits without horizontal overflow. Check source links against the
captured records and preserve the original captures as verification evidence.

Deliver the changes through Shaka in each owning repository. The handoff names
what changed since the previous examples, source PRs, tested revisions, checks,
and any capture or review gaps. Scheduling future runs requires a separate request.

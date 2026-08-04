# Codex Instructions — Feathly Smart Planner Site

This file is the primary operating instruction for Codex and other coding agents working in this repository.

## 1. Repository Identity

- Repository: `yoonng/smart-planner-site`
- Default branch: `main`
- Deployment: GitHub Pages from `main` and repository root `/`
- Public domain: `https://feathly.com`
- Product: Feathly Smart Planner

This repository contains the public website, user guides, legal pages, support pages, release information, and website assets. It does not contain the Flutter application source code.

## 2. Required Reading Order

Before editing, read only the documents relevant to the task, in this order:

1. `AGENTS.md`
2. `docs/CODEX_PROJECT_CONTEXT.md`
3. `docs/CODEX_SITE_ROLE.md`
4. `docs/CODEX_APP_ROLE.md` only when app behavior or screenshots are involved
5. The exact HTML, CSS, JavaScript, or asset files involved in the task

Do not scan the whole repository unless the task genuinely requires it.

## 3. Default Working Policy

- Work on the current `main` branch.
- Do not create a feature branch or pull request unless the user explicitly requests one.
- Do not create GitHub issues as automation triggers.
- Do not create temporary GitHub Actions workflows for normal file transfer, image conversion, editing, deployment, or verification.
- Do not use temporary external image URLs in production HTML.
- Use normal local filesystem operations and normal Git commands.
- Do not modify unrelated files.
- Do not commit or push until the user has approved the visible change, unless the user explicitly asked for immediate publication.

## 4. Before Editing

Run and inspect:

```bash
git status --short
git branch --show-current
git remote -v
```

Requirements:

- Confirm the branch is `main`.
- Preserve unrelated local changes.
- If the worktree is unexpectedly dirty, stop and report the files before editing.
- Inspect the current target section and its referenced assets before replacing anything.

## 5. Website Source of Truth

The website must describe the application as it actually behaves.

Source-of-truth order:

1. The user's current explicit instruction
2. Verified current app behavior and approved screenshots
3. Current implementation and targeted tests in `yoonng/feathly-smart-planner`
4. Current repository documentation
5. Existing website copy

Never invent a product flow to fit an old screenshot or old manual text.

## 6. Asset Handling Rules

For PNG, JPG, GIF, WebP, PDF, or other binary assets:

- Use the exact local file approved by the user.
- Do not regenerate, redraw, reinterpret, or substitute the asset unless explicitly requested.
- Verify the file exists before editing HTML.
- Verify the actual file format matches the extension.
- Decode the image with a real image library such as Pillow.
- Record file size and pixel dimensions.
- Keep a stable repository path under `assets/`.
- Use a site-root path in HTML, for example `/assets/user-guide/en/focus/example.png`.
- Do not store base64 image data in HTML or Markdown.
- Do not commit temporary chunks, conversion scripts, downloaded response pages, or diagnostic files.

Recommended validation:

```bash
python - <<'PY'
from pathlib import Path
from PIL import Image

path = Path('assets/path/to/image.png')
with Image.open(path) as image:
    image.verify()
with Image.open(path) as image:
    print(path, image.format, image.size, path.stat().st_size)
PY
```

## 7. User Guide Rules

Main English guide:

```text
smart-planner/user-guide.html
```

Related styles:

```text
assets/user-guide.css
assets/user-guide-visuals.css
```

Public guide assets:

```text
assets/user-guide/
```

Guidelines:

- Keep instructions consistent with the approved screen order.
- Preserve exact button and feature names used by the app.
- Use clear beginner-first language.
- Do not silently remove a requested step.
- When the user specifies four steps, verify that all four headings and explanations exist after editing.
- Keep image `alt` text accurate.
- Use responsive markup and avoid shrinking screenshots until text becomes unreadable.

## 8. Local Verification

Before commit:

```bash
git diff --check
python -m http.server 8000
```

Then verify through HTTP, not only by opening files directly:

- Target page returns HTTP 200.
- Referenced CSS and JavaScript load.
- Every new image URL returns HTTP 200.
- Image `Content-Type` matches the intended format.
- Downloaded image can be decoded.
- Required headings and text appear in the rendered source.
- Desktop and narrow/mobile layouts remain readable.

## 9. Commit and Publication

For an approved site change:

1. Confirm only intended files changed.
2. Run `git diff --check`.
3. Commit directly to `main` with a focused message.
4. Push `main` to `origin`.
5. Verify the live page and assets using cache-busting query parameters.

Example:

```text
https://feathly.com/smart-planner/user-guide.html?verify=<commit-sha>
https://feathly.com/assets/path/image.png?verify=<commit-sha>
```

Do not report publication success unless the live page and asset checks actually pass.

## 10. Prohibited Shortcuts

Do not:

- Claim completion based only on repository contents.
- Claim an image works based only on a filename or file header.
- Replace an approved four-step guide with a three-step guide.
- Use GitHub Actions or issues merely to move a local file into the repository.
- Create repeated trigger commits to force a workflow.
- leave temporary workflows, scripts, chunks, trigger files, or debugging artifacts in `main`.
- overwrite another agent's uncommitted work.
- expose secrets, tokens, private URLs, or user data.

## 11. Stop Conditions

Stop and ask or report when:

- The approved source asset cannot be found locally.
- The requested app behavior conflicts with the current app implementation.
- The worktree has unrelated changes that could be overwritten.
- Git authentication or push fails.
- The live deployment does not match the pushed commit.
- Verification fails for any required page or image.

## 12. Completion Report

Use this compact format:

```text
Branch:
Commit:
Changed files:
Local checks:
Live checks:
Skipped checks:
Risks or blockers:
```

Never describe a failed or unverified step as completed.

# AI Working Context — Smart Planner Site

This compatibility document points coding agents to the current repository instructions.

## Required instructions

Read these files before editing:

1. `AGENTS.md`
2. `docs/CODEX_PROJECT_CONTEXT.md`
3. `docs/CODEX_SITE_ROLE.md`
4. `docs/CODEX_APP_ROLE.md` when app behavior or screenshots are involved

## Fixed repository context

- Website repository: `yoonng/smart-planner-site`
- Default branch: `main`
- Deployment: GitHub Pages from `main` and repository root `/`
- Public domain: `https://feathly.com`
- English manual: `smart-planner/user-guide.html`
- Korean manual: `ko/smart-planner/user-guide.html`
- User-guide styles: `assets/user-guide.css` and `assets/user-guide-visuals.css`
- Public manual assets: `assets/user-guide/`
- App source repository: `yoonng/feathly-smart-planner`
- Main Flutter app path: `apps/feathly_mobile/`

## Current operating policy

- Work directly on `main` unless the user explicitly requests another workflow.
- Do not create a feature branch or PR for routine site work.
- Do not create GitHub issues as automation triggers.
- Do not create temporary GitHub Actions workflows for file transfer, image conversion, editing, deployment, or verification.
- Do not commit base64 chunks, temporary trigger files, or one-time diagnostic scripts.
- Do not use expiring ChatGPT, email, or private attachment URLs in production pages.
- Use the approved local file, copy it into its final repository path, validate it locally, and publish it through normal Git.
- Do not report success until the live page and assets have actually been verified.

## Scope boundary

This repository owns the public website and documentation. It does not own Flutter app behavior. When website instructions depend on app behavior, verify against the app repository or approved screenshots before editing.

The root `AGENTS.md` is authoritative for detailed working and verification rules.

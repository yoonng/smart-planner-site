# Feathly Repository Context for Codex

This document explains how the Feathly Smart Planner application repository and the public website repository relate to each other.

## 1. Product Summary

Feathly Smart Planner is a calm, local-first planner built around repeated review and reminder schedules called **Loops**.

The product goal is to reduce the stress of remembering, reviewing, and revisiting important information or tasks. It is not primarily a calendar, generic todo list, note app, or flashcard system.

Important product principles:

- Simple and low-stress interaction
- Minimal taps
- Clear scheduling behavior
- Local-first operation
- Android-first Flutter application
- Website instructions that match actual app behavior

## 2. Repository Map

### A. Application repository

```text
yoonng/feathly-smart-planner
```

Primary role:

- Flutter mobile application source
- Product behavior and domain logic
- SQLite/Drift local data layer
- Scheduling, alarm, Loop, Focus Timer, settings, backup, and insights behavior
- App tests and product design documentation
- Source screenshots or manual reference material when available

Main app path:

```text
apps/feathly_mobile/
```

Important supporting paths:

```text
docs/
database/sqlite/
.cursor/rules/
manual/
```

The app repository is the implementation source of truth for what the product actually does.

### B. Website repository

```text
yoonng/smart-planner-site
```

Primary role:

- Public Feathly brand website
- Smart Planner product pages
- English and Korean user guides
- Privacy, terms, refund, cloud-sync, support, FAQ, and release pages
- Public screenshots and documentation assets
- GitHub Pages deployment for `https://feathly.com`

Important paths:

```text
smart-planner/user-guide.html
ko/smart-planner/user-guide.html
assets/user-guide/
assets/user-guide.css
assets/user-guide-visuals.css
smart-planner/app-config.json
```

The site repository communicates verified app behavior to users. It must not redefine product behavior independently.

## 3. Repository Relationship

The normal information flow is:

```text
App implementation and verified screenshots
        ↓
Approved product wording and screen order
        ↓
Website manual HTML and public assets
        ↓
GitHub Pages deployment
        ↓
Live verification on feathly.com
```

The website may simplify explanations for beginners, but it must preserve the real order of actions, exact feature names, and important controls.

## 4. Source-of-Truth Priority

When sources disagree, use this order:

1. The user's current explicit instruction
2. Verified current app behavior and approved screenshots
3. Current app source and targeted tests
4. Current app repository documentation
5. Current site repository documentation
6. Existing website text

Old website copy, old screenshots, and previous AI summaries are not authoritative when they conflict with newer verified behavior.

## 5. Cross-Repository Boundaries

When Codex is opened in `smart-planner-site`:

- Modify only the site repository unless explicitly instructed otherwise.
- Read app-repository information only when needed to verify product behavior.
- Do not attempt to patch Flutter source from the site workspace.
- Do not copy large parts of the app repository into the website repository.
- Do not create cross-repository automation for simple screenshot or manual updates.

When Codex is opened in `feathly-smart-planner`:

- Modify only the app repository unless explicitly instructed otherwise.
- Do not publish website changes from the app repository.
- Export approved screenshots as normal local files for later copying into the site repository.

## 6. Main Product Concepts

### Loop

A repeatable task, review item, or reminder subject.

### Loop Pattern

A schedule template that generates future review or reminder occurrences.

### Loop occurrence or alarm

A generated scheduled instance of a Loop.

### Focus Timer

A focus/break session feature based on templates and repeat counts, with optional Loop linking.

### Local-first

Core app behavior must work without server login or cloud dependency unless a future feature explicitly adds it.

## 7. Website Deployment Model

The website is a static GitHub Pages site.

```text
Branch: main
Source path: /
Domain: https://feathly.com
```

Normal website publication requires only:

```text
local edit → local verification → commit → push main → live verification
```

Do not create GitHub Actions or issue-triggered workflows for normal HTML, CSS, JavaScript, or asset publication.

## 8. Language and Terminology

- Public English pages should use natural, beginner-friendly English.
- Public Korean pages should use clear Korean rather than literal machine translation.
- Preserve exact app labels when referring to buttons, tabs, or menu items.
- Use **Loop** as the product concept unless the app UI uses a more specific label.
- Do not rename features merely to make documentation sound smoother.

## 9. Efficiency Rules

The project is maintained by a solo developer. Codex should:

- Read only task-relevant files.
- Avoid broad repository scans.
- Avoid long speculative plans.
- Make small focused changes.
- Avoid new dependencies for static-site tasks.
- Reuse existing HTML/CSS patterns where practical.
- Report concrete results rather than generic recommendations.

## 10. Role Documents

For site work, read:

```text
docs/CODEX_SITE_ROLE.md
```

For app-related context or app work, read:

```text
docs/CODEX_APP_ROLE.md
```

The root `AGENTS.md` contains the mandatory operating rules for this repository.

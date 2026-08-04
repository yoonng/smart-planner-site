# Codex Role — Feathly Mobile App Engineer

This role applies when Codex works in:

```text
yoonng/feathly-smart-planner
```

This document is stored in the site repository as cross-repository context. When working in the app repository, the app repository's current code and local instruction files must also be inspected.

## 1. Role Mission

Develop and verify the Feathly Smart Planner mobile application while preserving its calm, local-first, Loop-based product direction.

The app role owns:

- Flutter/Dart application code
- Loop creation, editing, scheduling, and occurrence behavior
- Alarms and notification lifecycle
- Focus Timer behavior
- Settings and timezone/day-boundary behavior
- SQLite/Drift data access
- Backup and restore behavior
- Insights and statistics behavior
- Targeted app tests
- Verified screenshots that may later be published by the website role

## 2. Repository and Main Path

```text
Repository: yoonng/feathly-smart-planner
Application: apps/feathly_mobile/
```

Useful context paths may include:

```text
.cursor/rules/
docs/00_start_here/
docs/01_analysis_design/
docs/02_dev/
docs/03_testing/
docs/04_operation/
database/sqlite/
manual/
```

Inspect the actual current structure before assuming a file still lives in an older documented location.

## 3. Product Direction

Feathly is a local-first Smart Loop Planner that helps users revisit and remember important information or tasks through repeated schedules.

Core principles:

- Calm and low-stress experience
- Simple, explainable scheduling
- Minimal taps
- Android first
- Flutter/Dart
- SQLite with Drift
- Core behavior available offline

Do not treat the product as a generic calendar, todo list, note app, or full flashcard system.

## 4. Core Domain Concepts

### Loop

A repeatable task, reminder, or review subject.

### Loop Pattern

A schedule template that generates future occurrences.

### Occurrence or alarm

A scheduled instance generated from a Loop and pattern.

### Review history

Completed or skipped activity associated with a Loop or occurrence. Future schedule changes should not silently erase completed history.

### Focus Timer

A template-based focus/break session. The documented user flow may include:

1. Open Focus Timer
2. Choose a template
3. Set repeat count and optional Loop link, then start
4. Use the running-session Focus, Break, pause, and end controls

The implementation remains the source of truth; confirm it before updating public documentation.

## 5. Current Scope Guardrails

Unless the task explicitly requires otherwise, do not introduce:

- Firebase
- Supabase
- Mandatory login or profile
- Cloud sync
- Remote AI APIs
- Advertising or tracking
- Large backend dependencies
- Payment behavior inside this repository

Design with future extension in mind, but do not implement future infrastructure without a current requirement.

## 6. Working Policy

Before editing:

- Read the relevant files in `.cursor/rules/`.
- Inspect only task-relevant source and tests.
- Run `git status --short` and preserve unrelated work.
- Confirm the current branch and the user's requested workflow.

Current user preference takes precedence over older handoff text:

- Do not create a branch or PR unless the user explicitly requests it or the task is explicitly designated as risky.
- Do not start parallel feature work without approval.
- Keep changes focused and easy for a solo developer to review.
- Do not create GitHub issues automatically for ordinary bugs or tasks.

Risky work that may require a separate branch, PR, or explicit confirmation includes:

- Database migrations
- Production deployment
- Payment or billing integration
- Production secrets or configuration
- Large architecture changes
- Destructive data behavior

## 7. Coding Rules

- Keep database logic out of widgets.
- Prefer small testable services and repositories.
- Avoid clever abstractions.
- Avoid unrelated refactoring.
- Avoid new dependencies unless necessary.
- Preserve local-first behavior.
- Preserve completed user history when regenerating future schedules.
- Make state refresh immediate when the product requires real-time visible updates.
- Keep UI labels short and consistent with product terminology.

## 8. Test Policy

Run targeted tests for the changed behavior.

Typical command:

```bash
cd apps/feathly_mobile
flutter test <targeted-test-file-or-directory>
```

Default expectations:

- Prefer the smallest relevant test set.
- Add or update targeted tests when behavior changes.
- Preserve the first failure evidence and clearly label retests.
- Do not delete, weaken, skip, or bypass assertions merely to make a test pass.
- Skip full `flutter analyze` by default unless requested or clearly necessary.
- If analysis is run, distinguish existing unrelated findings from current-change failures.

Follow any stricter task-specific test policy present in the current project instructions.

## 9. Data and Environment Safety

- Do not use production databases or production secrets for development tests.
- Do not introduce Docker or local PostgreSQL for app-only work without a requirement.
- Do not delete or rewrite user data without explicit behavior rules and tests.
- Treat import, restore, schedule regeneration, and migrations as potentially destructive.
- Keep stable IDs and timestamps where required by the current data model.

## 10. Screenshot and Website Handoff

When app work changes a documented flow:

1. Verify the behavior in the app.
2. Capture the required screens in the exact user action order.
3. Keep screenshots readable and free of irrelevant desktop borders.
4. Add annotations only when requested.
5. Save the approved final image as a normal local file.
6. Hand it to the site repository for publication.

Do not publish a chat attachment through temporary Actions, issue triggers, base64 chunks, or expiring URLs.

The website role owns final placement in:

```text
yoonng/smart-planner-site
```

## 11. Cross-Repository Boundary

While working in the app repository:

- Do not modify the website repository unless explicitly requested.
- Do not change website copy to conceal an app behavior problem.
- Do not assume an old manual is correct when it conflicts with the app.
- Report documentation impact when a visible workflow changes.

Suggested handoff format:

```text
Behavior changed:
User-visible flow:
Exact labels:
Required screenshots:
Website sections affected:
Known limitations:
```

## 12. Completion Report

Use:

```text
Role: Feathly Mobile App Engineer
Branch:
Commit:
Changed files:
Targeted tests run:
Retests:
Skipped checks:
Documentation impact:
Risks or blockers:
```

Do not claim a behavior is verified unless the relevant targeted test or direct app verification actually passed.

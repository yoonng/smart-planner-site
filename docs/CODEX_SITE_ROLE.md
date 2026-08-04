# Codex Role — Website Publisher and Manual Maintainer

This role applies when Codex works in:

```text
yoonng/smart-planner-site
```

## 1. Role Mission

Maintain and publish the Feathly public website so that it is accurate, readable, stable, and consistent with the current Smart Planner application.

The role includes:

- Website HTML, CSS, and JavaScript maintenance
- User guide updates
- Screenshot and illustration publication
- Product-page copy updates
- Policy, FAQ, support, download, and release-page maintenance
- Local validation and live GitHub Pages verification

## 2. Primary Responsibilities

### Product accuracy

- Confirm that website instructions match the current app behavior.
- Preserve the requested action order.
- Use exact app button, tab, and menu labels.
- Do not simplify a flow by removing a required step.

### Visual assets

- Use the exact approved local asset.
- Preserve red boxes, arrows, labels, crops, and other approved annotations.
- Verify actual image format, file extension, dimensions, and decodability.
- Store public assets under a stable `assets/` path.

### Website quality

- Keep pages responsive.
- Keep screenshot text readable.
- Reuse existing layout patterns where possible.
- Avoid duplicate or contradictory instructions.
- Preserve accessibility basics such as accurate `alt` text and logical heading order.

### Publication

- Commit only intended files.
- Push approved changes directly to `main`.
- Verify the live page and every new asset after deployment.

## 3. Important Site Paths

### Main product pages

```text
smart-planner/index.html
smart-planner/user-guide.html
smart-planner/download.html
smart-planner/build-history.html
smart-planner/faq.html
smart-planner/support.html
smart-planner/privacy.html
smart-planner/terms.html
smart-planner/refund.html
smart-planner/cloud-sync.html
```

### Korean pages

```text
ko/smart-planner/
```

### Shared website assets

```text
assets/
```

### User guide assets and styles

```text
assets/user-guide/
assets/user-guide.css
assets/user-guide-visuals.css
```

### App-facing site configuration

```text
smart-planner/app-config.json
```

## 4. Normal Work Sequence

### Step 1 — Inspect

- Run `git status --short`.
- Confirm `main`.
- Read the current target HTML section.
- Identify all referenced CSS, JavaScript, and image files.
- Check whether an approved source asset already exists locally.

### Step 2 — Plan minimally

State the smallest intended change, for example:

```text
Replace the existing Focus Timer section with one approved four-step image and four matching explanation cards. No unrelated pages will change.
```

Do not produce a long project plan for a small site edit.

### Step 3 — Validate assets before editing

For each new binary file:

- Confirm it exists.
- Confirm the extension matches the decoded format.
- Confirm dimensions and size.
- Open or decode it successfully.
- Confirm it is the exact user-approved version.

### Step 4 — Edit locally

- Copy the asset into its final repository path.
- Update HTML and CSS directly.
- Do not insert external temporary URLs.
- Do not create transfer scripts unless the task itself requires a reusable script.
- Do not create automation workflows for a one-off content update.

### Step 5 — Verify locally

Minimum checks:

```bash
git diff --check
python -m http.server 8000
```

Verify:

- The page loads via HTTP.
- New image paths load via HTTP.
- Required headings and step count are correct.
- The image is readable on desktop and mobile-width layouts.
- No unrelated page section was removed.

### Step 6 — Review before publication

Show or summarize:

- Changed files
- Exact text changes
- Image path, format, dimensions, and size
- Local verification results
- Any skipped check

Stop before commit if the user requested review first.

### Step 7 — Publish

After approval or when immediate publication was explicitly requested:

```bash
git add <intended-files>
git diff --cached --check
git commit -m "Focused message"
git push origin main
```

### Step 8 — Verify live deployment

Use cache-busting URLs containing the commit SHA or timestamp.

Verify:

- Page HTTP status is 200.
- Live HTML contains the new required headings or a stable marker.
- Asset HTTP status is 200.
- `Content-Type` is correct.
- Downloaded live asset decodes successfully.
- Live pixel dimensions match the committed asset.

Do not report success before these checks pass.

## 5. User Guide Editing Standard

For a procedural feature section:

- Keep the step count explicit.
- Keep the step order exact.
- Give each step one action-focused heading.
- Explain what the user taps and what happens next.
- Match every explanation to the approved screenshot or composite image.
- Include controls visible in the final running/result screen when they matter.

Example verification for a required four-step flow:

```text
1. Open Focus Timer
2. Choose a template
3. Start Focus Timer
4. Focus session running
```

Codex must verify all four headings remain in the final HTML.

## 6. Screenshot and Composite Image Standard

When the user supplies an already approved composite:

- Use it exactly as supplied.
- Do not rebuild the composite from older screenshots.
- Do not remove one of its steps.
- Do not replace it with separate screenshots unless explicitly requested.
- Do not alter annotations or crop unless explicitly requested.

When the user requests a new composite:

- Build and review it before website integration.
- Store the approved final file locally.
- Integrate only the approved final file.

## 7. Prohibited Methods for Normal Site Changes

Do not use:

- GitHub issues as execution triggers
- One-time GitHub Actions to download a chat attachment
- Repeated empty trigger commits
- Base64 chunks committed as temporary text files
- Temporary conversion workflows
- Production HTML pointing to ChatGPT, email, private attachment, or expiring URLs
- Unverified image extension changes

These methods create unnecessary failure points and must not be used for routine site publication.

## 8. Scope Boundaries

The site role does not:

- Change Flutter application behavior
- Change SQLite/Drift schemas
- Change notification scheduling
- Implement billing APIs
- Modify production secrets
- Infer app behavior from website text alone

When a website request depends on unclear app behavior, inspect or ask for verified app information before publishing.

## 9. Testing Expectations

Static-site changes normally require focused checks, not broad unrelated testing.

Expected checks may include:

- `git diff --check`
- HTML structure inspection
- Local HTTP page and asset requests
- Image decoding
- Responsive layout inspection
- Link checks for changed links
- JSON parsing for changed configuration files

Do not install a large testing framework for a small static-site change.

## 10. Completion Report

Use:

```text
Role: Website Publisher and Manual Maintainer
Branch:
Commit:
Changed files:
Asset validation:
Local page checks:
Live page checks:
Skipped checks:
Risks or blockers:
```

If live verification fails, state that publication is not verified and provide the exact failure.

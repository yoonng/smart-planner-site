# Feathly website

Static website for Feathly and its first product, Smart Planner.

## Structure

- `/` Feathly brand home
- `/smart-planner/` Smart Planner product page
- `/smart-planner/user-guide.html` Responsive beginner-first user guide
- `/smart-planner/download.html` Download page
- `/smart-planner/build-history.html` Build history and release notes
- `/smart-planner/privacy.html` Privacy Policy
- `/smart-planner/terms.html` Terms of Service
- `/smart-planner/refund.html` Refund Policy
- `/smart-planner/cloud-sync.html` Cloud Sync Notice
- `/smart-planner/support.html` Structured private support form
- `/smart-planner/support-thanks.html` Support submission confirmation
- `/smart-planner/faq.html` FAQ
- `/smart-planner/app-config.json` App-facing URL configuration, including the embedded User Guide URL
- `/community/` Public Feathly Discord community guidance
- `/docs/SUPPORT_OPERATIONS.md` Support mailbox routing, Gmail filters, activation, and escalation rules

## User guide

The User Guide remains a single responsive page while navigation, loading, and readability are comfortable. Split it into separate pages only when a section becomes too large or creates a clear mobile or desktop usability problem.

The page is prepared for verified app screenshots using stable Screen IDs. Long app forms should use connected top/middle/bottom screenshots instead of one heavily reduced stitched image.

## Support form

The static support page submits categorized requests to `support@feathly.com` through FormSubmit. The subject format is:

```text
[FEATHLY-SUPPORT][CATEGORY][ISSUE][PRIORITY][TICKET] User title
```

After publishing the form, submit one test request and confirm the activation message sent to `support@feathly.com`. See `docs/SUPPORT_OPERATIONS.md` for the exact setup and Gmail filter suggestions.

## App integration

The Android app can open policy, support, and user-guide pages with `?embedded=1` to hide the website header/footer inside a WebView.

Examples:

```text
https://feathly.com/smart-planner/user-guide.html?embedded=1
https://feathly.com/smart-planner/privacy.html?embedded=1
```

The support page also accepts optional query parameters for future app prefill:

```text
https://feathly.com/smart-planner/support.html?category=notification&issue=not_delivered&appVersion=1.0.0&build=42
```

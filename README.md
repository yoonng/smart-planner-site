# Feathly website

Static website for Feathly and its first product, Smart Planner.

## Structure

- `/` Feathly brand home
- `/smart-planner/` Smart Planner product page
- `/smart-planner/privacy.html` Privacy Policy
- `/smart-planner/terms.html` Terms of Service
- `/smart-planner/refund.html` Refund Policy
- `/smart-planner/cloud-sync.html` Cloud Sync Notice
- `/smart-planner/support.html` Support
- `/smart-planner/faq.html` FAQ
- `/smart-planner/app-config.json` App-facing URL configuration

## App integration

The Android app can open policy and support pages with `?embedded=1` to hide the website header/footer inside a WebView.

Example:

```text
https://feathly.com/smart-planner/privacy.html?embedded=1
```

# Feathly website

Static website for Feathly and its first product, Smart Planner.

## Structure

- `/` Feathly brand home
- `/smart-planner/` Smart Planner product page
- `/smart-planner/download.html` Download page
- `/smart-planner/build-history.html` Build history and release notes
- `/smart-planner/privacy.html` Privacy Policy
- `/smart-planner/terms.html` Terms of Service
- `/smart-planner/refund.html` Refund Policy
- `/smart-planner/cloud-sync.html` Cloud Sync Notice
- `/smart-planner/support.html` Structured Support Center
- `/smart-planner/support-thanks.html` Support submission confirmation
- `/smart-planner/faq.html` FAQ
- `/smart-planner/app-config.json` App-facing URL configuration
- `/community/` Feathly Discord community guidance
- `/docs/SUPPORT_OPERATIONS.md` Zoho Mail routing, activation, and future SMTP backend notes

## App integration

The Android app can open policy and support pages with `?embedded=1` to hide the website header/footer inside a WebView.

Example:

```text
https://feathly.com/smart-planner/privacy.html?embedded=1
```

## Support delivery

The current static support form submits through FormSubmit to the Zoho-hosted mailbox `support@feathly.com`. The first live submission requires one-time FormSubmit activation from the Zoho inbox. A future Feathly-owned intake API will use Zoho SMTP from a protected server environment; SMTP credentials must never be placed in this static repository.

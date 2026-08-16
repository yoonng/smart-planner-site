# Feathly Support API

Netlify Functions for sending Feathly website mail through the existing Zoho SMTP configuration. SMTP credentials stay in the Netlify environment and are never exposed to browser JavaScript or GitHub Pages.

## Public endpoints

- Support preview/testing: `POST /api/support`
- Closed Test applications: `POST /api/closed-test`

Current Netlify host used by the website:

- `https://feathly-support-api.netlify.app/api/support`
- `https://feathly-support-api.netlify.app/api/closed-test`

Support SMTP preview pages:

- `https://feathly.com/smart-planner/support-zoho-preview.html`
- `https://feathly.com/ko/smart-planner/support-zoho-preview.html`

Closed Test application pages use the same Zoho SMTP, Turnstile, Upstash rate-limit, origin allowlist, and acknowledgement-mail infrastructure as the tested Support API.

## Deployment

The Netlify project is connected to `yoonng/smart-planner-site` with **Base directory** set to `support-api`.

Required environment values are documented in `.env.example`. Production values must remain in Netlify **Project configuration → Environment variables**.

Important configuration rules:

1. Use the exact SMTP hostname shown in Zoho Mail **Server Configuration Details** for the Feathly Australia data center.
2. Use a Zoho App Password for `support@feathly.com`; never use or commit the normal account password.
3. Keep the Cloudflare Turnstile secret only in Netlify. The public site key may be present in website HTML.
4. Keep the Upstash Redis REST URL/token only in Netlify.
5. Keep `SUPPORT_ALLOWED_ORIGINS` restricted to Feathly website origins and approved local development origins.

## Support flow

`/api/support` accepts structured JSON support requests, verifies origin, Turnstile, rate limits and server-side fields, then sends:

- an internal structured request to `support@feathly.com`
- a localized acknowledgement to the requester

Attachments are intentionally not handled by this API yet. The current public Support form may continue using its existing delivery path until private object storage and malware scanning are ready for a full cutover.

## Closed Test flow

`/api/closed-test` accepts only the minimal tester application data:

- Google Play email
- optional Android version
- optional device model
- language
- 14-day/test-contact consent

After validation it sends:

- an internal application email to `support@feathly.com`
- a localized applicant confirmation email containing the Google Group, Google Play opt-in, Android install, and Feedback Form links

The applicant is not automatically added to Google Groups by this endpoint. Google Group membership and Google Play Closed Test opt-in remain separate Google-managed steps.

## Security baseline

- JSON requests only
- Exact-origin CORS allowlist
- Cloudflare Turnstile verification
- Upstash per-IP rate limiting
- Honeypot spam field
- Server-side validation and length limits
- Zoho SMTP credentials only on the server
- `disableFileAccess` / `disableUrlAccess` on Nodemailer messages
- No passwords, card data, purchase tokens, or planner database files requested through Closed Test applications

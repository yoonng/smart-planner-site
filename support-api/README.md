# Feathly Support API preview

Deployment-ready Netlify Function for sending Smart Planner support requests through Zoho SMTP. It is not connected to the public support navigation yet.

Static test pages:

- `https://feathly.com/smart-planner/support-zoho-preview.html`
- `https://feathly.com/ko/smart-planner/support-zoho-preview.html`

They intentionally use the same content sections and form fields as the current support pages. Attachments remain visible but disabled until private object storage and malware scanning are ready.

## Deployment

1. Create a Netlify project from `yoonng/smart-planner-site` with **Base directory** set to `support-api`.
2. Add every value from `.env.example` in Netlify **Project configuration → Environment variables**.
3. Use the exact SMTP hostname shown in Zoho Mail **Server Configuration Details** for the Feathly Australia data center.
4. Generate a Zoho App Password named `Feathly Support API`; never use or commit the normal account password.
5. Create a Cloudflare Turnstile site for `feathly.com` and set its secret in the API project.
6. Create an Upstash Redis database and set its REST URL/token for rate limiting.
7. Deploy and map the project to `support-api.feathly.com`. The public endpoint remains `/api/support`.
8. Set the public Turnstile site key in both preview HTML pages.
9. Test English and Korean delivery, Reply-To, acknowledgement, spam rejection, and rate limiting before replacing FormSubmit.

## Cutover

After the test URLs pass, copy the SMTP form attributes and `support-zoho-preview.js` connection into the existing English and Korean `support.html` files. Keep the current public URLs unchanged. Remove the preview pages only after the production URLs pass a final delivery test.

## Current scope

- JSON requests only; no attachments.
- Maximum message length: 6,000 characters.
- Five submissions per IP per ten minutes.
- Exact-origin CORS allowlist.
- Cloudflare Turnstile verification.
- Internal support email plus localized acknowledgement.
- Server-generated ticket and priority.

Attachments are intentionally deferred. Production attachments should upload directly to private object storage with short-lived signed URLs and malware scanning rather than pass through this function.

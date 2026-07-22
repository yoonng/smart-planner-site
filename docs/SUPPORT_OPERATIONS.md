# Feathly Support Operations

## Official channels

- Private support form: `https://feathly.com/smart-planner/support.html`
- Support mailbox: `support@feathly.com`
- Mail provider: Zoho Mail
- Public community: Feathly Discord

Discord is not an official channel for billing, refunds, purchase records, privacy requests, private files, or security reports.

## Structured email subject

The support form generates the subject at submission time:

```text
[FEATHLY-SUPPORT][CATEGORY][ISSUE][PRIORITY][TICKET] User title
```

Examples:

```text
[FEATHLY-SUPPORT][BILLING][PURCHASE_NOT_ACTIVE][P2][FE-20260722-A1B2] PRO is not active
[FEATHLY-SUPPORT][REFUND][REFUND_STATUS][P2][FE-20260722-C3D4] Refund status question
[FEATHLY-SUPPORT][DATA][DATA_LOSS][P1][FE-20260722-E5F6] Possible data loss
[FEATHLY-SUPPORT][SECURITY][SECURITY_REPORT][P1][FE-20260722-G7H8] Security report
```

The user title is sanitized and limited before it is added to the subject. Category, issue, priority, and ticket values come from fixed JavaScript mappings rather than free text.

## Category codes

- `BILLING`
- `REFUND`
- `PLANNER`
- `NOTIFICATION`
- `DATA`
- `TECHNICAL`
- `PRIVACY`
- `SECURITY`
- `FEEDBACK`
- `OTHER`

## Priority codes

- `P1`: security, possible data loss, or unrecognized purchase
- `P2`: billing, refund, planner, notification, data, technical, or privacy support
- `P3`: feedback, feature requests, business inquiries, and other questions

Priority is a routing aid. It is not a guaranteed response-time commitment.

## Zoho Mail folders, tags, and incoming filters

Create folders or tags:

```text
Support/P1
Support/Billing
Support/Refund
Support/Planner
Support/Notifications
Support/Data
Support/Technical
Support/Privacy
Support/Security
Support/Feedback
Support/Other
```

In Zoho Mail:

```text
Settings
→ Filters
→ Incoming Filters
→ New Filter
```

Create filters using `Subject contains` conditions:

```text
[FEATHLY-SUPPORT][BILLING]
[FEATHLY-SUPPORT][REFUND]
[FEATHLY-SUPPORT][PLANNER]
[FEATHLY-SUPPORT][NOTIFICATION]
[FEATHLY-SUPPORT][DATA]
[FEATHLY-SUPPORT][TECHNICAL]
[FEATHLY-SUPPORT][PRIVACY]
[FEATHLY-SUPPORT][SECURITY]
[FEATHLY-SUPPORT][FEEDBACK]
[FEATHLY-SUPPORT][OTHER]
```

Use a separate high-priority filter where the subject contains both:

```text
[FEATHLY-SUPPORT]
[P1]
```

Recommended actions:

- move to or tag with the matching Support folder/tag;
- keep P1 visible and flagged as important;
- optionally create a Zoho task or approved internal alert for P1;
- stop later filters only when the category action is complete and intentional;
- keep the ticket reference in all replies.

## Current delivery path — FormSubmit to Zoho Mail

The static support form currently submits through FormSubmit to `support@feathly.com`. FormSubmit forwards the submission to the Zoho-hosted mailbox; no Zoho SMTP credentials are used by the public static page.

Activation and verification:

1. Open the live support page.
2. Submit one harmless test request.
3. Open the FormSubmit activation message in the Zoho `support@feathly.com` mailbox.
4. Confirm the form endpoint.
5. Submit a second request and verify:
   - structured subject;
   - Reply-To address;
   - ticket reference;
   - category and issue fields;
   - confirmation email;
   - attachment delivery;
   - redirect to `support-thanks.html`.
6. Check Zoho Spam and Quarantine if no activation message is visible.

After activation, replace the public email endpoint with the provider's random endpoint token when available, so the support email address is not exposed in the form action.

## Future owned support backend — Zoho SMTP

The long-term production path should replace the third-party form relay with a Feathly-owned support intake API.

```text
feathly.com support form
→ Feathly support intake API
→ validation, rate limiting, malware/type checks, ticket persistence
→ Zoho SMTP notification to support@feathly.com
→ Zoho SMTP confirmation to the requester
```

Security rules:

- Never put SMTP host, username, password, or app-specific password in HTML or browser JavaScript.
- Store credentials only in the server environment or Secret Manager.
- Use an application-specific password, especially when MFA is enabled.
- Authenticate as `support@feathly.com` or an approved alias and keep the From address aligned with the authenticated mailbox.
- Put the requester's address in Reply-To, not From.
- Record a server-generated ticket before sending mail.
- Make retries idempotent so one form submission does not create duplicate tickets or emails.
- Redact sensitive purchase data from application logs.

Zoho server configuration must be read from the Zoho account because the correct host can vary by account type and data center. Typical settings are:

```text
Free organization / personal account:
  smtp.zoho.com:465 SSL
  smtp.zoho.com:587 TLS

Paid organization with custom-domain address:
  smtppro.zoho.com:465 SSL
  smtppro.zoho.com:587 TLS
```

Do not assume the generic server value without checking Zoho Mail → Settings → Mail Accounts → Server Configuration Details for `support@feathly.com`.

## Attachment policy

Allowed by the page:

- PNG
- JPG/JPEG
- WebP
- PDF
- TXT

Limits enforced in the browser:

- up to three files;
- 5 MB per file;
- 10 MB combined.

Browser validation improves usability but is not a security boundary. A future Feathly-owned support API must perform server-side type, size, malware, rate-limit, and retention validation.

## Jira escalation

Do not copy every support message into Jira. Create or link Jira work only for:

- reproducible Product defects;
- repeated incidents affecting multiple users;
- billing contract or entitlement inconsistencies;
- security or privacy incidents;
- data-loss risks;
- approved feature or policy changes.

Remove or mask personal information, order IDs, emails, attachments, and transaction identifiers before adding evidence to Jira.

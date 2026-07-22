# Feathly Support Operations

## Official channels

- Private support form: `https://feathly.com/smart-planner/support.html`
- Support mailbox: `support@feathly.com`
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

## Suggested Gmail labels and filters

Create labels:

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

Suggested Gmail filter queries:

```text
subject:"[FEATHLY-SUPPORT]" subject:"[P1]"
subject:"[FEATHLY-SUPPORT][BILLING]"
subject:"[FEATHLY-SUPPORT][REFUND]"
subject:"[FEATHLY-SUPPORT][PLANNER]"
subject:"[FEATHLY-SUPPORT][NOTIFICATION]"
subject:"[FEATHLY-SUPPORT][DATA]"
subject:"[FEATHLY-SUPPORT][TECHNICAL]"
subject:"[FEATHLY-SUPPORT][PRIVACY]"
subject:"[FEATHLY-SUPPORT][SECURITY]"
subject:"[FEATHLY-SUPPORT][FEEDBACK]"
subject:"[FEATHLY-SUPPORT][OTHER]"
```

Apply the category label and keep the message in the Inbox. P1 messages should also receive `Support/P1`, be marked important, and optionally forward to an approved internal alert channel.

## First activation

The static form currently submits through FormSubmit to `support@feathly.com`.

1. Publish the branch to the live site.
2. Submit one harmless test request from the live support page.
3. Open the activation message delivered to `support@feathly.com`.
4. Confirm the form endpoint.
5. Submit a second request and verify:
   - structured subject;
   - Reply-To address;
   - ticket reference;
   - category and issue fields;
   - confirmation email;
   - attachment delivery;
   - redirect to `support-thanks.html`.
6. Check Spam if no activation message is visible.

After activation, replace the public email endpoint with the provider's random endpoint token when available, so the support email address is not exposed in the form action.

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

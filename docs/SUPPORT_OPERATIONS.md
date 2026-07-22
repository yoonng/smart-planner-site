# Feathly Support Operations

## Official channels

- Private support form: `https://feathly.com/smart-planner/support.html`
- Support mailbox: `support@feathly.com` hosted by Zoho Mail
- Public community: Feathly Discord

Discord is not an official channel for billing, refunds, purchase records, missed-alarm evidence, privacy requests, private files, or security reports.

## Structured email subject

The support form generates the subject at submission time:

```text
[FEATHLY-SUPPORT][CATEGORY][ISSUE][PRIORITY][TICKET] User title
```

Examples:

```text
[FEATHLY-SUPPORT][BILLING][PURCHASE_NOT_ACTIVE][P2][FE-20260722-A1B2] PRO is not active
[FEATHLY-SUPPORT][REFUND][REFUND_STATUS][P2][FE-20260722-C3D4] Refund status question
[FEATHLY-SUPPORT][NOTIFICATION][ALARM_NOT_DELIVERED][P1][FE-20260723-E5F6] Reminder did not fire
[FEATHLY-SUPPORT][NOTIFICATION][FORCE_STOP_RECOVERY][P1][FE-20260723-G7H8] Alarm was not restored after relaunch
[FEATHLY-SUPPORT][DATA][DATA_LOSS][P1][FE-20260722-I9J0] Possible data loss
[FEATHLY-SUPPORT][SECURITY][SECURITY_REPORT][P1][FE-20260722-K1L2] Security report
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

- `P1`: security, possible data loss, unrecognized purchase, missed reminder/alarm, background delivery failure, or failed future-alarm recovery after relaunch
- `P2`: billing, refund, planner, notification timing/duplicate/permission, technical, or privacy support
- `P3`: feedback, feature requests, business inquiries, and other questions

Priority is a routing aid. It is not a guaranteed response-time commitment.

## Zoho Mail folders and filters

Create folders or labels:

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

Create subject-based filters:

```text
[FEATHLY-SUPPORT] + [P1]                         -> Support/P1
[FEATHLY-SUPPORT][BILLING]                      -> Support/Billing
[FEATHLY-SUPPORT][REFUND]                       -> Support/Refund
[FEATHLY-SUPPORT][PLANNER]                      -> Support/Planner
[FEATHLY-SUPPORT][NOTIFICATION]                 -> Support/Notifications
[FEATHLY-SUPPORT][DATA]                         -> Support/Data
[FEATHLY-SUPPORT][TECHNICAL]                    -> Support/Technical
[FEATHLY-SUPPORT][PRIVACY]                      -> Support/Privacy
[FEATHLY-SUPPORT][SECURITY]                     -> Support/Security
[FEATHLY-SUPPORT][FEEDBACK]                     -> Support/Feedback
[FEATHLY-SUPPORT][OTHER]                        -> Support/Other
```

P1 messages should remain visible in the main Inbox, be marked important, and optionally generate an approved internal alert. Do not auto-forward personal or purchase data into Discord or Jira.

## Android reminder reports

For missed or unrecovered reminders, request:

- scheduled local time and timezone;
- device model and Android version;
- app version/build;
- whether the app was foregrounded, backgrounded, removed from recents, force-stopped, rebooted, or updated;
- notification permission state;
- Alarms & reminders / exact alarm access state when available;
- battery restriction state;
- screenshot or screen recording when safe.

Do not classify Android Force stop itself as a Feathly defect. Android may cancel or block alarms while the package remains force-stopped. Classify failure to restore a future pending alarm after the user explicitly reopens Smart Planner as a Product defect candidate.

## Current form delivery and future Zoho SMTP

The current static form submits through FormSubmit to the Zoho-hosted mailbox `support@feathly.com`.

First activation:

1. Publish the live support page.
2. Submit one harmless test request.
3. Open the FormSubmit activation message in Zoho Mail.
4. Confirm the endpoint.
5. Submit a second request and verify the structured subject, Reply-To, ticket reference, category fields, sender confirmation, attachments, and redirect.
6. Check Zoho Spam if no activation message is visible.

Future Feathly-owned support API:

- submit the form to a protected server endpoint;
- send the internal support message and the user acknowledgement through Zoho SMTP;
- store SMTP credentials only in local `.env` and production Secret Manager;
- never place SMTP credentials in this public static repository;
- apply server-side rate limits, file checks, retention rules, and idempotent ticket creation.

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
- missed alarms outside Android's documented Force stop restriction;
- failed pending-alarm recovery after the user reopens the app;
- billing contract or entitlement inconsistencies;
- security or privacy incidents;
- data-loss risks;
- approved feature or policy changes.

Remove or mask personal information, order IDs, emails, attachments, and transaction identifiers before adding evidence to Jira.
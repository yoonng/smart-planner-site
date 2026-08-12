# Google Play Data Safety — Feathly: Smart Planner

Last reviewed: 2026-08-12

This document is an internal release reference. Google Play Data Safety must always describe the behavior of app versions currently distributed on Google Play. Do not pre-declare future cloud or AI collection as if it already occurs.

## Current local-first app

### Planner content
- Core Loop titles, notes, schedules, reminders, review content, and local backups remain on the device during normal planner use.
- They are not sent to the Feathly Billing Server.

### Billing / entitlement
The app may send the following to the Feathly Billing Server for purchase verification and restore:
- randomly generated installation ID
- package name
- product ID
- Google Play purchase token
- app version
- platform

Hosting/network infrastructure may also process ordinary network/security metadata such as IP address, timestamps, and request logs.

Purposes include:
- purchase verification
- Restore Purchase
- PRO entitlement maintenance
- refund/cancellation/revocation handling
- billing abuse/fraud prevention
- billing/security/accounting/dispute records where necessary

### Advertising
The free app includes Google AdMob. Google Mobile Ads SDK disclosures must be rechecked against the exact SDK version before each public release. Google currently documents automatic handling that can include:
- IP address
- app/user product interactions
- diagnostic information
- device/account identifiers

Typical purposes include advertising, analytics, and fraud prevention. Google documents transport encryption for SDK data.

### Support
Support data is user-submitted through Feathly support channels. Keep Privacy Policy and Play declarations consistent with the actual in-app/support flow.

### Security / deletion
- Billing Server traffic uses HTTPS/TLS.
- Core planner data can be deleted locally by deleting Loops, clearing app data, or uninstalling.
- Current app has no Feathly cloud account, so an account-deletion flow is not applicable.
- Users can request deletion of Feathly-controlled support/server data, subject to necessary billing, security, accounting, dispute, or legal retention.

## Future cloud / backup / AI gate

Before releasing any optional cloud sync, cloud backup, account login, collaboration, attachment upload, or AI/server feature, review and update:
1. exact data fields collected or uploaded
2. whether collection is required or optional
3. purposes for each data type
4. sharing/service providers
5. encryption in transit and at rest where applicable
6. retention periods and deletion controls
7. account-deletion requirements if accounts are introduced
8. consent/prominent disclosure requirements
9. Privacy Policy (English + Korean)
10. Google Play Data Safety form
11. App content / target audience / ads disclosures if affected
12. store copy if the user-visible privacy model changes

Potential future categories may include account/contact information, user-generated planner content, attachments/images, sync metadata, service diagnostics, and security information. These categories are planning notes only and must not be declared as current collection until the corresponding feature is actually distributed.

## Release rule

Privacy Policy and Google Play Data Safety must be reviewed together before Closed/Open/Production submissions whenever app data handling or third-party SDK behavior changes.

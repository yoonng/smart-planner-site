# Google Play Data Safety — Feathly: Smart Planner

Last reviewed: 2026-08-31

This document is an internal Android/Google Play release reference. Google Play Data Safety must describe the exact app and third-party SDK behavior of the version being distributed. It does not replace the public Privacy Policy.

For the corresponding iOS/App Store baseline, see `apple-app-privacy.md`.

## Current privacy baseline

- Core Loop/planner content is local-first.
- Google AdMob is integrated.
- Google UMP is integrated through the shared Android/iOS consent boundary.
- The European regulations message must target only `Countries subject to GDPR (EEA, UK and Switzerland)`; `Everywhere` must not be used.
- Non-European users must not be shown the European UMP form.
- Feathly does not maintain a custom IP/country GDPR classifier or custom CMP.
- Optional Usage Analytics uses Google Analytics for Firebase.
- Usage Analytics collection is OFF before user choice.
- The Analytics choice can be changed/withdrawn later in Settings.
- If Analytics is still `unknown` when onboarding continues, the existing second confirmation prompt is intentionally preserved.
- Feathly custom Analytics events exclude Loop titles, notes, attachments, planner free text, raw purchase tokens, and Loop/database UUIDs.

## Priority release gates

### P0 — real AdMob ads / UMP

Before distributing a build that intentionally serves real AdMob ads:

- refresh UMP consent information on launch before relying on consent state;
- show a Google UMP form only when the SDK/message configuration requires it;
- gate every ad request on `canRequestAds()`;
- provide a privacy-options entry point when UMP requires it;
- publish/review the AdMob European regulations message for the Android app entry;
- set Targeting to `Countries subject to GDPR (EEA, UK and Switzerland)`;
- do not use `Everywhere` for the European regulations message;
- verify forced EEA geography;
- verify forced `OTHER`/non-European geography with no European form shown;
- verify UMP/form/network failure does not block core Feathly functionality;
- recheck Play Data Safety and the public Privacy Policy against the exact release build.

The UMP SDK may still call `requestConsentInfoUpdate()` outside Europe. The product acceptance criterion is that the European regulations UI is not presented to non-European users when the AdMob message is correctly targeted.

### P1 — optional Usage Analytics / Firebase Analytics

Usage Analytics is current implemented behavior when the shipped build includes the current Firebase Analytics integration.

Required baseline:

- collection OFF before explicit user choice;
- no silent opt-in on upgrade;
- onboarding Analytics toggle remains optional;
- `unknown` at Continue may trigger the existing second confirmation prompt;
- Agree -> enabled; decline/later -> disabled under the current contract;
- withdrawal in Settings stops future collection and persists;
- core Feathly remains usable with Analytics OFF;
- Advertising ID collection for Firebase Analytics is disabled in app configuration;
- ad-personalization signals are disabled;
- no custom Analytics User ID;
- no Google Ads/remarketing linkage unless separately approved;
- no planner free text or billing secrets in custom Analytics events.

## Current local-first app

### Planner content

- Core Loop titles, notes, schedules, reminders, review content, and local backups remain on the device during normal planner use.
- They are not sent to the Feathly Billing Server.
- They are not provided to AdMob as custom event parameters.
- They are not intentionally included in Feathly custom Firebase Analytics events.

### Billing / entitlement

The Android app may send the following to the Feathly Billing Server for Google Play purchase verification and restore:

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
- entitlement maintenance
- refund/cancellation/revocation handling
- billing abuse/fraud prevention
- billing/security/accounting/dispute records where necessary

Recheck this section if the shipped monetization or entitlement model changes.

### Advertising — Google Mobile Ads SDK

The Android app includes Google AdMob. Google's Mobile Ads SDK disclosure should be reviewed against the exact SDK version before each release. Depending on configuration and use, relevant areas can include:

- **IP/network information** — may be used to estimate general/approximate location;
- **user product interactions** — app launches, taps, ad interactions and similar activity;
- **diagnostic information** — SDK/app performance-related information;
- **device/account identifiers** — including Android Advertising ID, App Set ID, and other applicable identifiers.

Google documents encryption in transit for SDK data flows.

Official Android disclosure reference:
https://developers.google.com/admob/android/privacy/play-data-disclosure

Do not reduce the Play disclosure to `no data collected` merely because Feathly's planner database is local-first. Off-device transmission by an integrated SDK can count as collection.

#### Advertising ID

Advertising ID handling must be reviewed separately from Firebase Analytics Advertising ID settings. Document the final Android ad model and verify the exact manifest/SDK behavior.

#### Consent / privacy choices

Google UMP is the consent boundary. Feathly must not build a second CMP or hard-code a worldwide GDPR country database.

Operational configuration:

- European regulations message target: EEA + UK + Switzerland only;
- non-European users: no European UMP form;
- `requestConsentInfoUpdate()` outside Europe is allowed and is not itself a user-facing consent screen;
- privacy options are shown when UMP reports they are required.

### Optional Usage Analytics — Google Analytics for Firebase

When the user enables Usage Analytics, Google Analytics for Firebase may process limited product-usage and technical information according to the exact shipped SDK/configuration. Review at least:

- App activity / App interactions;
- app lifecycle/session information;
- Device or other IDs such as Firebase installation/app-instance identifiers;
- diagnostics where applicable to the actual integrated SDK behavior;
- network/IP-derived coarse or approximate geography where applicable.

Do not call this data fully `anonymous`. Feathly's approved wording is optional product-usage/technical analytics that excludes user-entered planner content and direct custom identifiers.

Configuration expectations:

- collection disabled before user consent;
- enable only after opt-in;
- disable immediately on withdrawal;
- `google_analytics_adid_collection_enabled=false` where used by the current platform configuration;
- `google_analytics_default_allow_ad_personalization_signals=false`;
- no custom `setUserId`;
- no remarketing linkage;
- no Loop title, note, attachment, user-defined category/tag/search text, notification content, contact information, purchase token/order ID, or Loop/database UUID in custom events.

Turning Usage Analytics OFF stops future collection from that installation. Do not claim that this automatically deletes historical data already processed by Google Analytics.

### Optional vs required

Usage Analytics-specific collection may be treated as optional only if:

1. collection is disabled before a fresh user's decision;
2. upgrade users are not silently opted in;
3. the user can decline or withdraw;
4. core Feathly remains usable with Analytics OFF.

Do not apply that optional classification automatically to AdMob SDK collection; advertising must be reviewed separately.

### Support / Closed Test

Support and Closed Test data is deliberately user-submitted through Feathly support/test channels. Keep the Privacy Policy and Play declarations consistent with the actual flow and distinguish deliberate submissions from automatic app/SDK collection.

### Security / deletion

- Billing Server traffic uses HTTPS/TLS.
- Google SDK network traffic is reviewed against the provider's encryption documentation.
- Core planner data can be deleted locally by deleting Loops, clearing app data, or uninstalling.
- Current app has no Feathly cloud account, so an account-deletion flow is not applicable to core planner data.
- Users can request deletion of Feathly-controlled support/server data, subject to necessary billing, security, accounting, dispute, or legal retention.
- Turning Usage Analytics OFF stops future collection; historical Analytics deletion must not be promised unless a verified deletion workflow exists.

## Play Data Safety review areas

Do not copy these as final answers without checking the exact release build and Google forms. Review at least:

### Advertising

- approximate/general location or IP-derived location handling;
- App activity / interactions;
- diagnostics;
- Device or other IDs;
- collected vs shared classification;
- advertising, analytics, fraud/security and app-functionality purposes as actually applicable.

### Usage Analytics

When enabled in the shipped build, review:

- App activity > App interactions;
- Device or other IDs;
- approximate geography/network-derived location where applicable;
- diagnostics only where the actual SDK collects it;
- optional status based on the verified opt-in/withdrawal behavior.

### Billing

Review purchase information and identifiers transmitted for Google Play purchase verification/restore according to the actual Billing Server contract.

### Disclosure principles

- No GPS permission does not automatically mean no approximate location processing.
- No Feathly cloud sync does not mean no third-party SDK collection.
- Do not mark data optional unless the actual flow satisfies Google's optional definition.
- Do not promise deletion that the app/service cannot perform.
- Collected/shared/purpose answers must be based on the exact SDK configuration, not assumptions about the provider.

## Public Privacy Policy consistency

Current public policy:

- English: `https://feathly.com/smart-planner/privacy.html`
- Korean: `https://feathly.com/ko/smart-planner/privacy.html`

The public policy currently states the important product facts needed by this baseline:

- local-first planner content;
- optional Usage Analytics with opt-in and later withdrawal;
- exclusion of planner free text from custom Analytics events;
- AdMob data processing varying by region, consent choices, SDK configuration and law;
- planner content is not shared with advertisers.

Removing a redundant first-party Privacy acknowledgement checkbox does not by itself change the underlying data collection and therefore does not require a public-policy rewrite. Re-review the public wording if the shipped data practice changes materially.

## Future cloud / backup / AI gate

Before releasing optional cloud sync, cloud backup, account login, collaboration, attachment upload, or AI/server features, review and update:

1. exact data fields collected/uploaded;
2. required vs optional collection;
3. purpose for each data type;
4. sharing/service providers;
5. encryption in transit/at rest where applicable;
6. retention and deletion controls;
7. account deletion if accounts are introduced;
8. consent/prominent disclosure requirements;
9. Privacy Policy English + Korean;
10. Google Play Data Safety;
11. Apple App Privacy where the same feature ships on iOS;
12. store copy and support documentation if the user-visible privacy model changes.

## Release rule

Whenever app data handling or a third-party SDK changes, review together:

1. exact shipped code / SDK configuration;
2. consent and opt-out behavior;
3. AdMob console regional message targeting;
4. public Privacy Policy;
5. Google Play Data Safety;
6. Ads/App content declarations;
7. Apple App Privacy for the corresponding iOS build.

Never describe a planned feature as active before its build is ready, and never distribute a changed data practice before the required disclosures are ready.

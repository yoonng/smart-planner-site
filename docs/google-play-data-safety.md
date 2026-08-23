# Google Play Data Safety — Feathly: Smart Planner

Last reviewed: 2026-08-23

This document is an internal release reference. Google Play Data Safety must describe the behavior of app versions currently distributed on Google Play, including third-party SDK behavior. Do not pre-declare planned Firebase Analytics, cloud, or AI collection as if it already occurs.

Google Play's form is package-level and must remain accurate for the versions/regions currently distributed. A data type can be marked optional only when all users can decline/opt out and still use the app.

## Priority release gates

### P0 — real AdMob ads: FSPA-147

Android release / Google Play Closed Test builds now use Feathly's production AdMob App ID and banner ad unit. Before distributing the next build that intentionally serves real ads, complete **FSPA-147**:

- refresh UMP consent information on every launch
- show a required privacy/consent form
- gate every ad request on `canRequestAds()`
- provide a privacy-options entry point when UMP requires it
- test EEA/UK/Switzerland and non-regulated-region behavior
- recheck Play Data Safety and the public Privacy Policy after the implementation is final

If FSPA-147 is not complete, do not intentionally distribute a real-ad build; use test/no-ad configuration instead.

### P1 — Firebase Analytics: FSPA-141

Firebase Analytics is planned before public release but is **not current collection until the SDK/configuration is actually included in a distributed build**.

FSPA-141 must use explicit opt-in with collection disabled before consent, disable Firebase Analytics Advertising ID collection, and keep ad-personalization/remarketing features off unless separately approved.

The public Privacy Policy and Play Data Safety form must be updated immediately before the first distributed build containing Firebase Analytics, based on the final verified configuration.

## Current local-first app

### Planner content

- Core Loop titles, notes, schedules, reminders, review content, and local backups remain on the device during normal planner use.
- They are not sent to the Feathly Billing Server.
- They are not provided to AdMob as custom event parameters.

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
- entitlement maintenance
- refund/cancellation/revocation handling
- billing abuse/fraud prevention
- billing/security/accounting/dispute records where necessary

Recheck this section if the shipped monetization/legacy entitlement model changes.

### Advertising — current Google Mobile Ads SDK baseline

The Android app includes Google AdMob. Google's current Google Mobile Ads SDK Data Safety disclosure states that the SDK **automatically collects and shares by default** the following data for advertising, analytics, and fraud-prevention purposes:

- **IP address** — may be used to estimate general/approximate location
- **user product interactions** — including app launch, taps, and similar interaction information
- **diagnostic information** — SDK/app performance-related information
- **device/account identifiers** — including Android Advertising ID, App Set ID, and other applicable identifiers

Google documents TLS encryption in transit for these SDK data flows.

Official source: https://developers.google.com/admob/android/privacy/play-data-disclosure

Do not reduce this disclosure to `no data collected` merely because Feathly's planner database is local-first. Off-device transmission by an integrated SDK counts as collection for Play Data Safety.

#### Advertising ID

Google documents Android Advertising ID collection as configurable. Decide explicitly whether Feathly needs it for the final ad model and verify the actual manifest/SDK behavior. Do not confuse AdMob's Advertising ID behavior with Firebase Analytics' separate `google_analytics_adid_collection_enabled` setting.

#### Consent / privacy choices

The current code audit found no UMP consent gate around banner requests. FSPA-147 is the blocker for this gap. Do not claim in the public policy that Feathly offers an in-app privacy-options/revocation flow until it is implemented and verified.

### Support / Closed Test

Support and Closed Test data is deliberately user-submitted through Feathly support/test channels. Keep Privacy Policy and Play declarations consistent with the actual flow and distinguish deliberate submissions from automatic app/SDK collection.

### Security / deletion

- Billing Server traffic uses HTTPS/TLS.
- Google Mobile Ads SDK traffic is documented by Google as encrypted in transit.
- Core planner data can be deleted locally by deleting Loops, clearing app data, or uninstalling.
- Current app has no Feathly cloud account, so an account-deletion flow is not applicable to core planner data.
- Users can request deletion of Feathly-controlled support/server data, subject to necessary billing, security, accounting, dispute, or legal retention.

## Planned Firebase Analytics — NOT CURRENT UNTIL SHIPPED

FSPA-141 plans optional product-usage analytics. Before the first build containing Firebase Analytics is distributed, verify the exact implementation and update the public Privacy Policy + Play Data Safety form.

### Required privacy-first configuration

- `firebase_analytics_collection_enabled=false` by default before consent
- enable with `setAnalyticsCollectionEnabled(true)` only after explicit Feathly Usage analytics opt-in
- disable immediately on withdrawal and persist the choice
- `google_analytics_adid_collection_enabled=false`
- `google_analytics_default_allow_ad_personalization_signals=false`
- no custom `setUserId`
- no Google Ads/remarketing linkage or other advertising integration unless separately approved
- no Loop title, note, attachment content, user-defined category text, search term, email/name/phone, billing token/order ID, or other free text in Analytics events

Official control reference: https://firebase.google.com/docs/analytics/android/configure-data-collection

### Expected Play Data Safety review areas

Do not pre-fill these as final answers; verify against the shipped Firebase version/configuration. Likely categories to review include:

- **App activity > App interactions** — approved product events
- **Device or other IDs** — Firebase installation/app-instance identifiers
- **Approximate location** — geography inferred from network/IP processing may fall under Play's approximate-location definition even when the app does not request GPS/location permission
- purchase information only if the final Analytics configuration/events actually require it
- diagnostics only if an SDK/product that collects diagnostics is actually added; do not imply Crashlytics is installed if it is not

Do not call the Analytics data fully `anonymous`; use accurate language such as optional product-usage analytics that excludes user-entered planner content and direct identifiers.

### Optional vs required

Firebase Analytics-specific collection may be declared optional only if:

1. collection is disabled before a fresh user's decision,
2. upgrade users are not silently opted in,
3. every user/region can decline or withdraw,
4. core Feathly remains usable with Analytics off.

This does not make AdMob's current automatic SDK collection optional by association; review AdMob separately.

### Withdrawal / deletion claims

Turning Usage analytics off must stop future collection. Do not promise that this automatically deletes historical Analytics data already retained by Google. Before offering a stronger deletion claim, verify and document the exact behavior of `resetAnalyticsData()` and any Google Analytics User Deletion API workflow actually implemented by Feathly.

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

Whenever app data handling or a third-party SDK changes, review together:

1. actual shipped code/SDK configuration
2. consent/opt-out behavior
3. public Privacy Policy
4. Google Play Data Safety
5. Ads/App content declarations where applicable

**Never update the public policy or Play form to describe a planned feature as active before the corresponding build is ready to distribute, and never distribute a changed data practice before the disclosures are ready.**

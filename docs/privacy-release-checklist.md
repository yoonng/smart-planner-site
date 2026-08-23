# Privacy / Data Safety release checklist

Use before Google Play Closed, Open, or Production submissions whenever data handling, advertising behavior, consent flow, or an integrated SDK changes.

## P0 — Advertising / AdMob

- [ ] Confirm whether this build serves real AdMob ads or test/no ads.
- [ ] If real ads are served, FSPA-147 UMP/privacy gate is complete.
- [ ] `requestConsentInfoUpdate()` runs on every launch before relying on consent state.
- [ ] Any required UMP form is loaded/shown.
- [ ] Every ad request is gated by `canRequestAds()`.
- [ ] Ad-loading logic prevents duplicate requests.
- [ ] Privacy-options entry point is visible and works whenever UMP requires it.
- [ ] AdMob Privacy & messaging configuration is published/reviewed for applicable regions.
- [ ] EEA/UK/Switzerland test-geography flow is verified.
- [ ] Non-regulated-region flow is verified.
- [ ] Consent/form/network failures do not block core Feathly functionality.
- [ ] Google Mobile Ads SDK Data Safety guidance is checked for the exact SDK version/configuration.
- [ ] Advertising ID decision is documented and verified; do not confuse AdMob ID handling with Firebase Analytics ID settings.
- [ ] Google Play `Contains ads` / Ads declaration matches actual release behavior.

## P1 — Firebase Analytics, when FSPA-141 is introduced

Do not check these as current collection until Firebase Analytics is actually included in the build being prepared for distribution.

- [ ] Firebase Analytics collection defaults OFF before explicit user opt-in.
- [ ] Fresh install emits no Analytics collection before user choice.
- [ ] Upgrade from a previous app version does not silently opt the user in.
- [ ] Usage analytics ON enables only the approved event allowlist.
- [ ] Usage analytics OFF/withdrawal stops future collection and persists across restart.
- [ ] Core Feathly remains usable with Usage analytics OFF.
- [ ] `google_analytics_adid_collection_enabled=false` is verified.
- [ ] `google_analytics_default_allow_ad_personalization_signals=false` is verified.
- [ ] No Google Ads/remarketing linkage or additional advertising integration is enabled unless separately approved.
- [ ] No custom Analytics User ID is set.
- [ ] Loop title/note/attachment/free text/user-defined category/search terms/contact information/billing identifiers cannot enter Analytics events.
- [ ] Automatically collected Firebase events are understood and compatible with the pre-consent OFF design.
- [ ] Firebase/GA IAM access is least-privilege and unnecessary editors/owners are removed.
- [ ] GA data-sharing and linked-product settings are reviewed.
- [ ] GA data-retention setting is documented.
- [ ] DebugView verifies the approved events after opt-in.
- [ ] Privacy Policy does not call the data fully `anonymous` unless that claim has been separately justified.
- [ ] Privacy Policy accurately explains what turning collection OFF does and does not delete.

## Google Play Data Safety

- [ ] Google Play Data Safety form matches the versions currently distributed and every integrated SDK.
- [ ] Off-device transmission by third-party SDKs is treated as collection even when core planner data remains local.
- [ ] AdMob current baseline is reviewed for IP/general location, app interactions, diagnostics, and device/account identifiers, including Google's current `collected and shared` guidance.
- [ ] If Firebase Analytics is in this release, review App activity > App interactions.
- [ ] If Firebase Analytics is in this release, review Device or other IDs for Firebase installation/app-instance identifiers.
- [ ] If Firebase Analytics is in this release, review Approximate location/geography derived from IP/network processing; do not equate `no GPS permission` with `no approximate location`.
- [ ] A data type is marked `optional` only if all users/regions can decline or opt out and still use the app.
- [ ] Collected vs shared is evaluated per SDK/service configuration; do not assume all Google processing has the same classification.
- [ ] Purpose selections match the actual use: analytics, advertising, fraud/security, app functionality, etc.
- [ ] Encryption-in-transit answers match actual SDK/service documentation.
- [ ] Deletion/control answers do not promise historical server-side deletion unless it is implemented and verified.

## Public Privacy Policy

- [ ] English Privacy Policy matches actual app behavior being distributed.
- [ ] Korean privacy translation matches the English meaning.
- [ ] Public policy is not changed to claim a planned SDK/consent feature is already active before its release is ready.
- [ ] Conversely, a build with new collection is not distributed before the policy is updated.
- [ ] Current AdMob data handling is disclosed accurately.
- [ ] After FSPA-147, ad consent/privacy-options wording matches the implemented UMP behavior.
- [ ] When Firebase Analytics ships, policy identifies Google/Firebase Analytics, collection categories, purpose, opt-in/withdrawal, retention/control, and content exclusions.
- [ ] Planner content is not described as uploaded unless a released feature actually uploads it.
- [ ] Feathly Billing Server request fields match the documented billing disclosure.
- [ ] Support/Closed Test deliberate submissions remain clearly distinguished from automatic SDK collection.
- [ ] Privacy Policy URL and support/privacy contact are reachable without login.

## Future cloud / account / AI

- [ ] Future cloud/AI features are not declared as current collection before release.
- [ ] If accounts are introduced, account deletion and retention requirements are implemented and disclosed.
- [ ] If cloud sync/backup/attachments are introduced, exact data fields, encryption, retention, deletion, and providers are documented before launch.

## Final release cross-check

- [ ] App code / SDK configuration reviewed at the exact release commit.
- [ ] Consent and opt-out behavior tested on the release build.
- [ ] Privacy Policy English/Korean reviewed against that build.
- [ ] Play Data Safety reviewed against that build.
- [ ] Play Ads/App content declarations reviewed against that build.
- [ ] Evidence records the release commit/build number, SDK versions, relevant console configuration, and any items intentionally not enabled.

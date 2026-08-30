# Privacy / store disclosure release checklist

Use before Google Play or Apple App Store distribution whenever data handling, advertising behavior, consent flow, or an integrated SDK changes.

## P0 — Advertising / AdMob / UMP

- [ ] Confirm whether this build serves real AdMob ads or test/no ads.
- [ ] If real ads are served, FSPA-147/FSPA-183 UMP/privacy gate is complete.
- [ ] Android and iOS use the same shared Google UMP consent contract unless a platform requirement explicitly differs.
- [ ] `requestConsentInfoUpdate()` runs on launch before relying on consent state.
- [ ] Any required UMP form is loaded/shown by Google UMP rather than a Feathly-built CMP.
- [ ] Every ad request is gated by `canRequestAds()`.
- [ ] Ad-loading logic prevents duplicate requests.
- [ ] Privacy-options entry point is visible and works whenever UMP requires it.
- [ ] AdMob Privacy & messaging European regulations message is published for both Android and iOS app entries.
- [ ] European regulations Targeting is `Countries subject to GDPR (EEA, UK and Switzerland)`.
- [ ] `Everywhere` targeting is NOT used for the European regulations message.
- [ ] Forced EEA test geography confirms the European flow remains eligible for a required form.
- [ ] Forced `OTHER`/non-European geography confirms the European UMP form is not shown.
- [ ] Feathly does not add custom IP geolocation, a hard-coded country list, or a parallel GDPR/CMP database.
- [ ] Consent/form/network failures do not block core Feathly functionality.
- [ ] Google Mobile Ads SDK privacy/data-disclosure guidance is checked for the exact SDK version/configuration.
- [ ] Advertising ID decision is documented and verified; do not confuse AdMob ID handling with Firebase Analytics ID settings.
- [ ] Google Play `Contains ads` declaration matches actual Android release behavior.
- [ ] Apple App Privacy advertising/tracking answers match the actual iOS SDK configuration.

## P1 — Usage Analytics / Firebase Analytics

- [ ] Firebase Analytics collection defaults OFF before explicit user opt-in.
- [ ] Fresh install emits no Analytics collection before user choice.
- [ ] Upgrade from a previous app version does not silently opt the user in.
- [ ] The onboarding Analytics toggle remains optional.
- [ ] If the Analytics state is still `unknown` when the user continues, the existing second confirmation prompt is preserved.
- [ ] Agree enables Analytics; decline/later stores disabled under the current contract.
- [ ] Usage analytics ON enables only the approved event allowlist.
- [ ] Usage analytics OFF/withdrawal stops future collection and persists across restart.
- [ ] Core Feathly remains usable with Usage analytics OFF.
- [ ] Settings provides a working Analytics ON/OFF/withdrawal control on both Android and iOS.
- [ ] `google_analytics_adid_collection_enabled=false` is verified where applicable.
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

- [ ] Google Play Data Safety form matches the exact Android version distributed and every integrated SDK.
- [ ] Off-device transmission by third-party SDKs is treated as collection even when core planner data remains local.
- [ ] AdMob current baseline is reviewed for IP/general location, app interactions, diagnostics, and device/account identifiers, including Google's current collected/shared guidance.
- [ ] If Firebase Analytics is in this release, review App activity > App interactions.
- [ ] If Firebase Analytics is in this release, review Device or other IDs for Firebase installation/app-instance identifiers.
- [ ] If Firebase Analytics is in this release, review Approximate location/geography derived from IP/network processing; do not equate `no GPS permission` with `no approximate location`.
- [ ] A data type is marked `optional` only if users can decline or opt out and still use the relevant core app functionality.
- [ ] Collected vs shared is evaluated per SDK/service configuration; do not assume all Google processing has the same classification.
- [ ] Purpose selections match the actual use: analytics, advertising, fraud/security, app functionality, etc.
- [ ] Encryption-in-transit answers match actual SDK/service documentation.
- [ ] Deletion/control answers do not promise historical server-side deletion unless it is implemented and verified.

## Apple App Privacy / ATT

- [ ] App Store Connect App Privacy answers match the exact iOS build and every third-party SDK included in it.
- [ ] Data types collected by Google Mobile Ads and Firebase Analytics are declared according to their actual iOS configuration and use.
- [ ] Optional Usage Analytics is represented as optional collection when the user can keep it off and use the core app.
- [ ] Feathly does not claim `Data Not Collected` if an enabled third-party SDK sends data off device.
- [ ] `NSUserTrackingUsageDescription` is absent unless Feathly intentionally introduces ATT-covered tracking.
- [ ] No AppTrackingTransparency request is made unless ATT-covered cross-app/site tracking is intentionally introduced and separately approved.
- [ ] No IDFA explainer or pre-prompt is introduced merely because AdMob is present.
- [ ] No cross-app/site tracking or remarketing linkage is introduced by default.
- [ ] If ATT-covered tracking is ever introduced, ATT permission, App Privacy `Tracking` answers, Privacy Policy, and AdMob configuration are reviewed together before release.
- [ ] iOS Privacy Policy URL is reachable without login and uses the same core privacy promises as Android.

## Public Privacy Policy / FAQ

- [ ] English Privacy Policy matches actual Android and iOS app behavior being distributed.
- [ ] Korean privacy translation matches the English meaning.
- [ ] Public policy is not changed to claim a planned SDK/consent feature is already active before its release is ready.
- [ ] Conversely, a build with new collection is not distributed before the policy is updated.
- [ ] Current AdMob data handling is disclosed accurately.
- [ ] Regional consent wording does not imply that the European UMP form is shown globally.
- [ ] European UMP targeting remains EEA/UK/Switzerland only; non-European users are not told they must complete a European consent form.
- [ ] When Firebase Analytics ships, policy identifies Google/Firebase Analytics, collection categories, purpose, opt-in/withdrawal, retention/control, and content exclusions.
- [ ] Planner content is not described as uploaded unless a released feature actually uploads it.
- [ ] Feathly Billing Server request fields match the documented billing disclosure.
- [ ] Support/Closed Test deliberate submissions remain clearly distinguished from automatic SDK collection.
- [ ] Privacy Policy URL and support/privacy contact are reachable without login.

## Future cloud / account / AI

- [ ] Future cloud/AI features are not declared as current collection before release.
- [ ] If accounts are introduced, account deletion and retention requirements are implemented and disclosed.
- [ ] If cloud sync/backup/attachments are introduced, exact data fields, encryption, retention, deletion, and providers are documented before launch.

## Final cross-platform release check

- [ ] App code / SDK configuration reviewed at the exact release commit.
- [ ] Android and iOS first-party Privacy/Analytics UX is intentionally the same unless an OS requirement forces a difference.
- [ ] Consent and opt-out behavior tested on each platform release build.
- [ ] Forced EEA and forced OTHER UMP behavior is recorded for both platforms where test tooling supports it.
- [ ] Privacy Policy English/Korean reviewed against the shipped behavior.
- [ ] Play Data Safety reviewed against the Android build.
- [ ] Play Ads/App content declarations reviewed against the Android build.
- [ ] App Store Connect App Privacy reviewed against the iOS build.
- [ ] ATT/Tracking answer is reconciled against actual iOS implementation.
- [ ] Evidence records release commit/build number, SDK versions, relevant AdMob console targeting, store disclosure state, and any intentionally disabled features.

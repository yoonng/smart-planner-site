# Apple App Privacy baseline — Feathly: Smart Planner

This document is the iOS/App Store counterpart to `google-play-data-safety.md`. It is an operational checklist for App Store Connect and does not replace the public Privacy Policy.

## Current product/privacy baseline

- Feathly is local-first for Loop/planner content.
- Core Loop titles, notes, schedules, review history, and planner free text are not uploaded to Feathly servers during normal local planner use.
- Usage Analytics is optional and defaults OFF before user choice.
- The existing onboarding second confirmation prompt remains when Analytics is still `unknown` at Continue.
- Usage Analytics can be turned OFF later from Settings.
- Feathly custom Analytics events must not include Loop titles, notes, attachments, user-entered category/tag/search text, notification content, purchase tokens, or Loop/database UUIDs.
- Google AdMob/UMP is shared with Android.
- The European regulations message is intended only for EEA/UK/Switzerland users. Non-European users must not be shown the European UMP form.
- Feathly does not maintain its own country/IP GDPR classifier or custom CMP.
- ATT/IDFA cross-app tracking is not part of the approved baseline.

## App Store Connect — App Privacy review

Before each iOS release, review the exact SDK/build behavior and answer App Privacy questions from the shipped build rather than from product intent alone.

### Data used for tracking

Baseline decision:

- Do not introduce cross-app/site tracking.
- Do not request ATT permission merely because Google Mobile Ads is integrated.
- Do not add `NSUserTrackingUsageDescription` unless a separately approved feature actually requires ATT-covered tracking.
- Do not enable an IDFA explainer/pre-prompt as part of the normal Feathly privacy flow.

If a future SDK/configuration introduces ATT-covered tracking, this baseline is invalid and must be reviewed before release.

### Optional Usage Analytics

When Usage Analytics is enabled, Google Analytics for Firebase may process app interactions, lifecycle/session data, diagnostics, app-instance/device identifiers, and network-derived coarse geography according to the shipped SDK configuration.

Operational rules:

- collection remains OFF before user opt-in;
- the core app remains usable when Analytics is OFF;
- turning Analytics OFF stops future collection from that installation;
- historical Analytics data already processed by Google is not promised to be automatically deleted by that toggle;
- no custom Analytics User ID;
- no planner free text in Feathly custom events;
- no Ads/remarketing linkage unless separately approved.

The App Privacy answers must therefore reflect actual off-device collection when Analytics is enabled. Do not select `Data Not Collected` simply because planner content is local-first.

### Advertising / Google Mobile Ads

Google Mobile Ads may process advertising-related information such as IP/network information, app interactions, diagnostics, and device/account identifiers depending on SDK configuration, user choices, region, and applicable law.

Before release:

- reconcile App Store Connect App Privacy answers with Google's current iOS Mobile Ads disclosure guidance;
- verify the app does not send planner content to advertisers;
- verify European UMP targeting is EEA/UK/Switzerland only;
- verify forced OTHER geography does not present the European regulations form;
- keep ATT/Tracking answers separate from UMP/GDPR consent — they are not the same control.

## Public Privacy Policy

The public English policy remains the controlling policy:

`https://feathly.com/smart-planner/privacy.html`

Korean reference translation:

`https://feathly.com/ko/smart-planner/privacy.html`

Current public wording already states that:

- planner content is local-first;
- optional Usage Analytics requires the user to enable it;
- core functionality remains available with Analytics OFF;
- AdMob processing depends on region, consent choices, SDK configuration, and law;
- planner content is not shared with advertisers.

A public-policy text change is required only when the shipped data practice changes materially. A UI simplification that removes a redundant first-party acknowledgement checkbox does not, by itself, change what data is collected or why.

## Required iOS release evidence

Record for each iOS release candidate:

- Git SHA / app version / build number;
- Firebase Analytics enabled/disabled configuration;
- Usage Analytics default OFF and withdrawal test;
- Google Mobile Ads SDK version;
- UMP forced EEA result;
- UMP forced OTHER result;
- AdMob console European message targeting;
- `NSUserTrackingUsageDescription` presence/absence;
- ATT request/plugin presence/absence;
- App Store Connect App Privacy answers reviewed against exact SDK configuration;
- Privacy Policy URL reachable without login;
- any manual/native blockers.

## Change triggers

Re-open this review if any of the following occurs:

- ATT or IDFA tracking is introduced;
- personalized/cross-app advertising is intentionally enabled;
- Analytics default changes;
- planner content begins leaving the device through cloud/sync/AI features;
- new account/contact/profile collection is introduced;
- a new third-party SDK transmits data off device;
- AdMob European regulations targeting changes from EEA/UK/Switzerland;
- App Store billing/server verification begins processing Apple purchase/JWS data.

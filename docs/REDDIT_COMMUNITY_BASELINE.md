# r/Feathly Community Operations Baseline

Status: `SETUP COMPLETE — CONTENT PUBLICATION PENDING`
Jira: `FSPA-228`
Canonical community URL: `https://www.reddit.com/r/Feathly/`
Policy impact: `MARKETING/COMMUNITY ROUTING ONLY`
Product policy impact: `NONE`

## 1. Authority and operating boundary

This file is the repository record of the r/Feathly operating baseline. The Owner confirmed the manual community setup below after Jira comment `11156`. The pinned-post bodies, recurring post, and release announcement remain unpublished drafts/templates.

Confirmed manual Reddit state:

- Community exists at `https://www.reddit.com/r/Feathly/` and is Public.
- AutoModerator baseline is saved.
- Post Flair is enabled; Require post flair is ON; users may assign flair.
- Six flairs and five rules are configured as listed below.

- Owner-approved Notion Product & Platform Policy is authoritative for product meaning.
- Current Planner features remain free.
- Android `Feathly Pro Lifetime` means bottom-banner ad removal plus support for Feathly development. It does not unlock current Planner features.
- Cloud, AI, and Account are in development / coming soon / planned, not current production features and not included automatically with Pro Lifetime.
- Usage Analytics is OFF by default, requires explicit opt-in, can be turned OFF later, and must not include user-entered Planner content in Feathly custom events.
- Core Planner data is local-first. Private data, billing evidence, backup files, security reports, and sensitive bug evidence belong in private Support, not Reddit.
- Discord is not an official Feathly Community channel. All public `Community` links must target `https://www.reddit.com/r/Feathly/`.
- Workflow: `Draft -> Review -> Owner Approved -> Publish -> Verify`.
- No Reddit API token, bot credential, webhook, or automatic publishing is required for this baseline.

## 2. AutoModerator canonical config

The Owner confirmed this baseline is saved in Reddit Mod Tools at `config/automoderator`. It uses `filter` or `report` actions so moderators can review edge cases. Rules are separated by exactly `---`.

```yaml
# r/Feathly AutoModerator baseline — FSPA-228
# Review every filtered item before removal or user sanction.

# 1. Route likely private billing, credential, backup, or security evidence to mod review.
type: submission
body+title (regex, includes-word):
  - '(?:GPA\.|[0-9]{4})-[0-9]{4}-[0-9]{4}-[0-9]{5}'
  - '(?:password|passcode|purchase token|backup file|\.feathly|card number|security code|recovery code|api key|access token)'
action: filter
action_reason: 'Possible sensitive information — private Support routing review'
comment: |
  Your post is temporarily held for moderator review because it may contain private or security-sensitive information.

  Please do not post passwords, purchase tokens, order IDs, payment details, `.feathly` backup files, private screenshots, or security details publicly. Use private Feathly Support instead: https://feathly.com/smart-planner/support.html

---

# 2. Filter link-heavy submissions from very new accounts; do not hard-ban the author.
type: submission
author:
  account_age: '< 3 days'
body (regex): '(?s)(?:https?://\S+.*){3,}'
action: filter
action_reason: 'New account with three or more links — spam review'

---

# 3. Filter common unsolicited promotion language when it includes an external link.
type: submission
body+title (regex): '(?i)(?:buy now|guaranteed followers|crypto giveaway|promo code|affiliate link|sponsored post|dm me for promotion)'
body (regex): 'https?://'
action: filter
action_reason: 'Possible unsolicited promotion or commercial spam'

---

# 4. Report likely personal contact details for moderator review without automatic removal.
type: any
body (regex):
  - '(?i)\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b'
  - '(?<!\d)(?:\+?\d[\d .()\-]{7,}\d)(?!\d)'
action: report
action_reason: 'Possible personal contact information'
```

Operational notes:

- Test with moderator and non-moderator accounts; removal/filter rules normally exempt moderators.
- Do not auto-remove ordinary criticism, bug reports, new accounts, or low-karma users merely for being new.
- Review false positives weekly during the first month and adjust patterns only through the approval workflow.
- Reddit sitewide protections and the five community rules below remain authoritative even when AutoModerator does not match.

## 3. Reddit Rules (5)

### Rule 1 — Respect others and be civil

Discuss ideas and experiences, not personal attacks. Harassment, hate, threats, targeted abuse, and deliberate hostility are not allowed.

### Rule 2 — No spam

Do not post repetitive promotions, affiliate links, referral farming, deceptive claims, impersonation, malware, or unrelated commercial content. Helpful links with clear context are welcome when they directly answer a question.

### Rule 3 — Keep posts relevant

Posts should relate to Feathly: Smart Planner, Loops, Recall, Focus Timer, Weekly Insights, study routines, product feedback, or community learning practices.

### Rule 4 — Protect private and sensitive information

Never post passwords, emails, order IDs, receipts, purchase tokens, payment details, private screenshots, `.feathly` backups, personal Planner content, or exploitable security details. Use `https://feathly.com/smart-planner/support.html` for billing, refunds, privacy requests, sensitive bugs, data-loss evidence, or security reports.

### Rule 5 — Use the right flair and give enough context

Choose the closest post flair and provide enough detail for others to understand the question, feedback, issue, tip, or idea. Distinguish current features from planned features, and do not present unofficial advice as an official Feathly statement. Cloud, AI, and Account are planned / coming soon unless an Owner-approved release announcement says otherwise.

## 4. Post Flair (6)

| Flair | Intended use | Suggested color |
|---|---|---|
| `Announcement` | Official, moderator-only product or community notices | Teal |
| `Question` | Public how-to and general product questions | Blue |
| `Feedback` | Experience reports and constructive product feedback | Green |
| `Bug / Issue` | Non-sensitive reproducible issue descriptions | Red |
| `Study Tips` | Helpful learning, routine, Recall, or Focus practices | Purple |
| `Feature Idea` | Suggestions and use cases, without implying commitment | Orange |

Current setting: Post Flair enabled, Require post flair ON, and user assignment ON. `Announcement` is moderators-only. Flair does not replace private Support routing.

## 5. Pinned post draft — Start Here — What is Feathly?

**Title:** `Start Here — What is Feathly?`

**Flair:** `Announcement`

**Body:**

Welcome to r/Feathly, the official public community for **Feathly: Smart Planner**.

Feathly is a calm, local-first study planner for spaced repetition, daily study routines, Recall reminders, and focused sessions. Its core idea is simple: create a Loop, complete the current step, and return when the next step is actually due.

Current Planner features include:

- Spaced Loop and Routine Loop
- Recall
- Focus Timer
- Weekly Insights
- Backup & Restore

All current Planner features are free. On supported production platforms, Free may show a bottom banner ad. Android **Feathly Pro Lifetime** is a one-time purchase that removes that bottom banner ad and supports Feathly development; it does not unlock current Planner features.

Cloud, AI, and Account services are in development / coming soon. They are not current production features and are not automatically included with Feathly Pro Lifetime.

Use this community for public questions, study tips, feedback, feature ideas, release discussion, and non-sensitive bug reports. For billing, refunds, privacy requests, private screenshots, backup files, data-loss evidence, or security reports, use private Support: https://feathly.com/smart-planner/support.html

Website: https://feathly.com/smart-planner/
User Guide: https://feathly.com/smart-planner/user-guide.html
Private Support: https://feathly.com/smart-planner/support.html

Please read the community rules and choose the closest flair before posting.

## 6. Pinned post draft — Questions, Feedback & Support Guide

**Title:** `Questions, Feedback & Support Guide`

**Flair:** `Announcement`

**Body:**

Choose the channel that keeps your information safe and helps us respond effectively.

Post publicly in r/Feathly when you have:

- a general usage question;
- a study or routine tip;
- constructive feedback;
- a feature idea;
- a non-sensitive, reproducible bug description;
- a question about an official announcement or release.

Use private Feathly Support for:

- billing, refunds, purchases, or entitlement restoration;
- order IDs, receipts, account email, or payment-related evidence;
- privacy or data-deletion requests;
- `.feathly` backup files or personal Planner content;
- possible data loss, missed-alarm evidence with private details, or sensitive screenshots;
- security reports or vulnerabilities.

Private Support: https://feathly.com/smart-planner/support.html
Support email: support@feathly.com

Before posting a public bug report, include the app version, device/OS version, steps to reproduce, expected result, and actual result. Remove names, emails, Loop titles, notes, screenshots, IDs, and other personal data. If safe redaction is difficult, use private Support instead.

Public feedback is welcome, but a reply or upvote is not a roadmap commitment. Official status changes appear in moderator announcements.

## 7. Weekly Discussion recurring post draft

**Schedule baseline:** Weekly, Monday 09:00 Pacific/Auckland. Review timing after four weeks.
**Post as:** AutoModerator scheduled post after Owner approval.
**Title:** `Weekly Discussion — {{date %B %d, %Y}}`
**Flair:** `Feedback`

**Body:**

Welcome to this week's open discussion for r/Feathly.

You can share:

- what you are studying or building a routine around;
- how you used Spaced Loops, Routine Loops, Recall, or Focus Timer;
- a small win or friction point from the week;
- a question, study tip, or non-sensitive feature idea.

Please keep personal Planner content private. Do not post order IDs, payment details, backup files, private screenshots, or security reports. Use https://feathly.com/smart-planner/support.html for private support.

What would make your next week of learning feel calmer?

## 8. Release announcement template

**Title:** `[Release] Feathly: Smart Planner {version} — {short outcome}`
**Flair:** `Announcement`
**Approval:** Owner-approved release notes and links required before publishing.

**Body:**

Feathly: Smart Planner **{version}** is now **{availability: rolling out / available}** on **{platform and channel}**.

### What changed

- **{change 1}:** {user-facing description}
- **{change 2}:** {user-facing description}
- **{fix}:** {user-facing description}

### What stays the same

- All current Planner features remain free.
- {Include only when relevant: Feathly Pro Lifetime continues to mean bottom-banner ad removal plus support for Feathly development.}
- {Include only when relevant: Cloud, AI, and Account remain planned / coming soon and are not part of this release.}
- Usage Analytics remains optional and OFF by default unless the release notes explicitly document an Owner-approved policy change.

### Availability

{Rollout scope, staged percentage, supported platform, and any known delay. Do not claim universal availability before verification.}

### Learn more or get help

- Release details: {verified release/build-history URL}
- User Guide: https://feathly.com/smart-planner/user-guide.html
- Private Support: https://feathly.com/smart-planner/support.html

Questions and non-sensitive feedback are welcome below. Do not post purchase records, personal Planner content, backup files, or security details publicly.

## 9. Setup status and remaining manual work

- [x] Owner created r/Feathly and confirmed it is Public.
- [x] Owner saved the AutoModerator baseline.
- [x] Owner enabled Post Flair, Require post flair, and user flair assignment.
- [x] Owner configured the six flairs and made `Announcement` moderators-only.
- [x] Owner configured the five rules in the listed order.
- [ ] Run and record non-moderator test cases for each AutoModerator rule; not confirmed in the reported setup state.
- [ ] Publish and pin `Start Here — What is Feathly?`; not yet published in the confirmed setup state.
- [ ] Publish and pin `Questions, Feedback & Support Guide`; not yet published in the confirmed setup state.
- [ ] Create the Weekly Discussion recurring schedule; not yet scheduled in the confirmed setup state.
- [ ] Use the release announcement template only after a release-specific Owner approval; it remains a template.
- [ ] Verify and record the live pinned/scheduled post URLs after those posts exist.
- [x] No Reddit token, cookie, credential, or API access was requested or stored for this work.

## 10. Sources

- Notion: `06.15 통합 광고 · 홍보 · SNS 운영 관리 — Content Publishing & Automation` (Owner working baseline; Reddit decision dated 2026-09-11)
- Notion: `22_Product & Platform Policy SSOT — Android·iOS 통일성 및 변경 통제` (Owner-approved Product Policy)
- Notion: `Feathly 가격 정책 SSOT — Pro · Cloud · Bundle` (Owner-approved pricing baseline; used only to avoid changing product meaning)
- Jira: `FSPA-228`
- Reddit Help: Full AutoModerator documentation, Writing basic AutoModerator rules, Post Flair, and Scheduled and Recurring Posts

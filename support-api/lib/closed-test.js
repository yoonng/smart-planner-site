import crypto from 'node:crypto';
import { escapeHtml } from './support.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LINKS = Object.freeze({
  group: 'https://groups.google.com/d/forum/feathly-closed-testers',
  optIn: 'https://play.google.com/apps/testing/com.feathly.planner',
  android: 'https://play.google.com/store/apps/details?id=com.feathly.planner',
  feedback: 'https://forms.gle/phouKRfRpPJs2F9D9'
});

function text(value, max) {
  return String(value ?? '').replace(/\0/g, '').trim().slice(0, max);
}

export function makeApplicationId(now = new Date()) {
  const date = now.toISOString().slice(0, 10).replaceAll('-', '');
  return `CT-${date}-${crypto.randomBytes(4).toString('hex').slice(0, 6).toUpperCase()}`;
}

export function validateClosedTestApplication(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('INVALID_BODY');

  const email = text(input.email, 160).toLowerCase();
  const locale = text(input.locale, 8).toLowerCase() === 'ko' ? 'ko' : 'en';
  const androidVersion = text(input.androidVersion, 40);
  const deviceModel = text(input.deviceModel, 100);
  const website = text(input.website, 200);

  if (website) throw new Error('SPAM');
  if (!emailPattern.test(email)) throw new Error('INVALID_EMAIL');
  if (input.testerConsent !== true) throw new Error('CONSENT_REQUIRED');

  return { email, locale, androidVersion, deviceModel };
}

export function internalSubject(applicationId, submission) {
  return `[FEATHLY-CLOSED-TEST][${submission.locale.toUpperCase()}][${applicationId}] Add tester to Google Group`;
}

export function internalText(applicationId, submission) {
  return [
    `Application: ${applicationId}`,
    `Google Play email: ${submission.email}`,
    `Language: ${submission.locale}`,
    `Android version: ${submission.androidVersion || '-'}`,
    `Device model: ${submission.deviceModel || '-'}`,
    `14-day/test contact consent: accepted`,
    '',
    'ACTION REQUIRED:',
    `Add ${submission.email} directly to the Feathly Closed Testers Google Group as a MEMBER.`,
    'The applicant should not be asked to join the Google Group manually.',
    `Google Group: ${LINKS.group}`,
    '',
    'Applicant next-step links:',
    `Google Play opt-in (use after group access is active): ${LINKS.optIn}`,
    `Android store: ${LINKS.android}`,
    `Feedback form: ${LINKS.feedback}`
  ].join('\n');
}

export function internalHtml(applicationId, submission) {
  const rows = [
    ['Application', applicationId],
    ['Google Play email', submission.email],
    ['Language', submission.locale],
    ['Android version', submission.androidVersion || '-'],
    ['Device model', submission.deviceModel || '-'],
    ['14-day/test contact consent', 'accepted']
  ].map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join('');

  return `<h2>Feathly Closed Test application</h2><table cellpadding="6" cellspacing="0" border="1">${rows}</table><h3>Action required</h3><p>Add <strong>${escapeHtml(submission.email)}</strong> directly to the Feathly Closed Testers Google Group as a MEMBER. The applicant should not be asked to join the group manually.</p><p>Google Group: <a href="${LINKS.group}">${LINKS.group}</a></p><p>Google Play opt-in after group access is active: <a href="${LINKS.optIn}">${LINKS.optIn}</a></p><p>Android store: <a href="${LINKS.android}">${LINKS.android}</a></p><p>Feedback form: <a href="${LINKS.feedback}">${LINKS.feedback}</a></p>`;
}

export function acknowledgement(applicationId, locale) {
  if (locale === 'ko') {
    return {
      subject: `[Feathly Closed Test][${applicationId}] 신청이 접수되었습니다`,
      text: [
        'Feathly: Smart Planner Android Closed Test 신청이 접수되었습니다.',
        '',
        `신청 번호: ${applicationId}`,
        '',
        'Feathly에서 신청하신 Google 계정을 Closed Test 테스터 그룹에 등록합니다. Google Group에 직접 가입하실 필요는 없습니다.',
        '',
        '다음 순서로 진행해 주세요.',
        `1. Feathly의 테스터 그룹 등록이 완료될 때까지 기다려 주세요. 별도의 Google Group 가입 작업은 필요하지 않습니다.`,
        `2. 그룹 등록 완료 후 Google Play Closed Test 참여(Opt-in): ${LINKS.optIn}`,
        `3. Android에서 앱 설치/업데이트: ${LINKS.android}`,
        `4. 테스트 중 의견/문제 접수: ${LINKS.feedback}`,
        '',
        '테스터 그룹 등록만으로 14일 테스트가 시작되지는 않습니다. Google Play 테스트 페이지에서 테스터 참여(Opt-in)를 완료한 시점부터 연속 참여 기간이 계산됩니다. Opt-in 후 약 14일 동안 참여 상태를 유지해 주세요.',
        '',
        'Feathly는 Google 비밀번호, 카드 번호 또는 보안 코드를 요청하지 않습니다.',
        '',
        '감사합니다.',
        'Feathly Support'
      ].join('\n')
    };
  }

  return {
    subject: `[Feathly Closed Test][${applicationId}] Application received`,
    text: [
      'Your Feathly: Smart Planner Android Closed Test application has been received.',
      '',
      `Application reference: ${applicationId}`,
      '',
      'Feathly will register the Google account you submitted in the Closed Test tester group. You do not need to join the Google Group yourself.',
      '',
      'Next steps:',
      `1. Wait for Feathly to activate your tester-group access. No separate Google Group join action is required.`,
      `2. After group access is active, opt in to the Google Play Closed Test: ${LINKS.optIn}`,
      `3. Install or update the app on Android: ${LINKS.android}`,
      `4. Send test feedback or issue reports here: ${LINKS.feedback}`,
      '',
      'Tester-group registration alone does not start the 14-day test period. The continuous participation period starts after you complete Google Play test opt-in. Please remain opted in for about 14 days.',
      '',
      'Feathly will never ask for your Google password, full card number, or card security code.',
      '',
      'Thank you,',
      'Feathly Support'
    ].join('\n')
  };
}

export { LINKS };

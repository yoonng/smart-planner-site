import test from 'node:test';
import assert from 'node:assert/strict';
import {
  acknowledgement,
  internalSubject,
  makeApplicationId,
  validateClosedTestApplication
} from '../lib/closed-test.js';

const valid = {
  email: 'Tester@Example.com',
  locale: 'en',
  androidVersion: 'Android 14',
  deviceModel: 'Pixel 8',
  testerConsent: true,
  website: ''
};

test('validates and normalizes Closed Test applications', () => {
  const result = validateClosedTestApplication(valid);
  assert.equal(result.email, 'tester@example.com');
  assert.equal(result.locale, 'en');
  assert.equal(result.androidVersion, 'Android 14');
  assert.equal(result.deviceModel, 'Pixel 8');
});

test('rejects missing consent, invalid email, and honeypot content', () => {
  assert.throws(() => validateClosedTestApplication({ ...valid, testerConsent: false }), /CONSENT_REQUIRED/);
  assert.throws(() => validateClosedTestApplication({ ...valid, email: 'bad-email' }), /INVALID_EMAIL/);
  assert.throws(() => validateClosedTestApplication({ ...valid, website: 'spam' }), /SPAM/);
});

test('creates Closed Test application references and safe subjects', () => {
  const submission = validateClosedTestApplication(valid);
  const applicationId = makeApplicationId(new Date('2026-08-16T00:00:00Z'));
  assert.match(applicationId, /^CT-20260816-[A-F0-9]{6}$/);
  assert.equal(
    internalSubject(applicationId, submission),
    `[FEATHLY-CLOSED-TEST][EN][${applicationId}] New tester application`
  );
});

test('acknowledgement includes the group, opt-in, install, and feedback steps', () => {
  const en = acknowledgement('CT-1', 'en').text;
  const ko = acknowledgement('CT-1', 'ko').text;
  assert.match(en, /groups\.google\.com/);
  assert.match(en, /play\.google\.com\/apps\/testing\/com\.feathly\.planner/);
  assert.match(en, /forms\.gle\/phouKRfRpPJs2F9D9/);
  assert.match(ko, /신청이 접수/);
  assert.match(ko, /14일/);
});

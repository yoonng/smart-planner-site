import test from 'node:test';
import assert from 'node:assert/strict';
import { acknowledgement, escapeHtml, makeTicket, subjectFor, validateSubmission } from '../lib/support.js';

const valid = {
  category: 'notification', issueCode: 'ALARM_NOT_DELIVERED', name: 'Test User',
  email: 'User@Example.com', title: 'Reminder did not fire',
  message: 'The reminder did not fire at the scheduled time.', locale: 'en',
  privacyConsent: true, website: ''
};

test('validates and promotes critical notification issues', () => {
  const result = validateSubmission(valid);
  assert.equal(result.email, 'user@example.com');
  assert.equal(result.priority, 'P1');
  assert.equal(result.categoryCode, 'NOTIFICATION');
});

test('rejects missing consent and honeypot content', () => {
  assert.throws(() => validateSubmission({ ...valid, privacyConsent: false }), /CONSENT_REQUIRED/);
  assert.throws(() => validateSubmission({ ...valid, website: 'spam' }), /SPAM/);
});

test('rejects an issue assigned to the wrong category', () => {
  assert.throws(() => validateSubmission({ ...valid, category: 'billing' }), /ISSUE_CATEGORY_MISMATCH/);
});

test('builds safe subjects and ticket references', () => {
  const result = validateSubmission({ ...valid, title: 'Hello\n[bad]' });
  const ticket = makeTicket(new Date('2026-08-07T00:00:00Z'));
  assert.match(ticket, /^FE-20260807-[A-F0-9]{6}$/);
  assert.doesNotMatch(subjectFor(ticket, result), /\n/);
});

test('escapes HTML and localizes acknowledgement', () => {
  assert.equal(escapeHtml('<script>'), '&lt;script&gt;');
  assert.match(acknowledgement('FE-1', 'ko').subject, /문의가 접수/);
});

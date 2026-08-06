import crypto from 'node:crypto';

export const categories = Object.freeze({
  billing: ['BILLING', 'P2'],
  refund: ['REFUND', 'P2'],
  planner: ['PLANNER', 'P2'],
  notification: ['NOTIFICATION', 'P2'],
  data: ['DATA', 'P2'],
  technical: ['TECHNICAL', 'P2'],
  privacy: ['PRIVACY', 'P2'],
  security: ['SECURITY', 'P1'],
  feedback: ['FEEDBACK', 'P3'],
  other: ['OTHER', 'P3']
});

const p1Issues = new Set(['DATA_LOSS', 'UNRECOGNIZED_PURCHASE', 'ALARM_NOT_DELIVERED', 'BACKGROUND_DELIVERY', 'FORCE_STOP_RECOVERY']);
const allowedIssues = Object.freeze({
  billing: new Set(['PURCHASE_NOT_ACTIVE', 'CHARGED_NO_ACCESS', 'PURCHASE_RESTORE', 'PURCHASE_ACCOUNT', 'OTHER_BILLING']),
  refund: new Set(['REFUND_REQUEST', 'REFUND_STATUS', 'REFUND_PRO_ACTIVE', 'UNRECOGNIZED_PURCHASE']),
  planner: new Set(['LOOP_SCHEDULE', 'HOME_STATS', 'ACTIONS', 'FOCUS_TIMER']),
  notification: new Set(['ALARM_NOT_DELIVERED', 'BACKGROUND_DELIVERY', 'FORCE_STOP_RECOVERY', 'WRONG_TIME', 'DUPLICATE', 'PERMISSION']),
  data: new Set(['BACKUP_EXPORT', 'IMPORT_RESTORE', 'DATA_LOSS', 'MIGRATION']),
  technical: new Set(['CRASH', 'PERFORMANCE', 'LAYOUT', 'OTHER_TECHNICAL']),
  privacy: new Set(['DATA_REQUEST', 'DELETION_REQUEST', 'POLICY_QUESTION']),
  security: new Set(['SECURITY_REPORT', 'OTHER_SECURITY']),
  feedback: new Set(['FEATURE_REQUEST', 'USABILITY', 'TRANSLATION', 'GENERAL_FEEDBACK']),
  other: new Set(['BUSINESS', 'OTHER_QUESTION'])
});
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const codePattern = /^[A-Z0-9_]{2,48}$/;

function text(value, max) {
  return String(value ?? '').replace(/\0/g, '').trim().slice(0, max);
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
}

export function makeTicket(now = new Date()) {
  const date = now.toISOString().slice(0, 10).replaceAll('-', '');
  return `FE-${date}-${crypto.randomBytes(4).toString('hex').slice(0, 6).toUpperCase()}`;
}

export function validateSubmission(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('INVALID_BODY');
  const category = text(input.category, 32).toLowerCase();
  if (!categories[category]) throw new Error('INVALID_CATEGORY');
  const issueCode = text(input.issueCode, 48).toUpperCase();
  if (!codePattern.test(issueCode)) throw new Error('INVALID_ISSUE');
  if (!allowedIssues[category].has(issueCode)) throw new Error('ISSUE_CATEGORY_MISMATCH');
  const name = text(input.name, 100);
  const email = text(input.email, 160).toLowerCase();
  const title = text(input.title, 120).replace(/[\r\n\[\]<>]+/g, ' ');
  const message = text(input.message, 6000);
  const locale = text(input.locale, 8).toLowerCase() === 'ko' ? 'ko' : 'en';
  const website = text(input.website, 200);
  const purchaseEmail = text(input.purchaseEmail, 160).toLowerCase();
  if (website) throw new Error('SPAM');
  if (name.length < 2) throw new Error('INVALID_NAME');
  if (!emailPattern.test(email)) throw new Error('INVALID_EMAIL');
  if (purchaseEmail && !emailPattern.test(purchaseEmail)) throw new Error('INVALID_PURCHASE_EMAIL');
  if (title.length < 3) throw new Error('INVALID_TITLE');
  if (message.length < 10) throw new Error('INVALID_MESSAGE');
  if (input.privacyConsent !== true) throw new Error('CONSENT_REQUIRED');
  const [categoryCode, basePriority] = categories[category];
  const priority = p1Issues.has(issueCode) ? 'P1' : basePriority;
  return {
    category,
    categoryCode,
    issueCode,
    priority,
    name,
    email,
    title,
    message,
    locale,
    appVersion: text(input.appVersion, 40),
    buildNumber: text(input.buildNumber, 40),
    deviceModel: text(input.deviceModel, 100),
    osVersion: text(input.osVersion, 60),
    timezone: text(input.timezone, 80),
    purchaseEmail,
    orderId: text(input.orderId, 80),
    purchaseDate: text(input.purchaseDate, 20),
    purchaseCountry: text(input.purchaseCountry, 80)
  };
}

export function subjectFor(ticket, submission) {
  return `[FEATHLY-SUPPORT][${submission.categoryCode}][${submission.issueCode}][${submission.priority}][${ticket}] ${submission.title}`;
}

export function internalText(ticket, submission) {
  return [
    `Ticket: ${ticket}`,
    `Priority: ${submission.priority}`,
    `Category: ${submission.categoryCode}`,
    `Issue: ${submission.issueCode}`,
    `Name: ${submission.name}`,
    `Reply email: ${submission.email}`,
    `Locale: ${submission.locale}`,
    `App version: ${submission.appVersion || '-'}`,
    `Build: ${submission.buildNumber || '-'}`,
    `Device: ${submission.deviceModel || '-'}`,
    `OS: ${submission.osVersion || '-'}`,
    `Time zone: ${submission.timezone || '-'}`,
    `Purchase email: ${submission.purchaseEmail || '-'}`,
    `Order ID: ${submission.orderId || '-'}`,
    `Purchase date: ${submission.purchaseDate || '-'}`,
    `Purchase country: ${submission.purchaseCountry || '-'}`,
    '',
    submission.message
  ].join('\n');
}

export function internalHtml(ticket, submission) {
  const rows = [
    ['Ticket', ticket], ['Priority', submission.priority], ['Category', submission.categoryCode],
    ['Issue', submission.issueCode], ['Name', submission.name], ['Reply email', submission.email],
    ['Locale', submission.locale], ['App version', submission.appVersion || '-'],
    ['Build', submission.buildNumber || '-'], ['Device', submission.deviceModel || '-'],
    ['OS', submission.osVersion || '-'], ['Time zone', submission.timezone || '-'],
    ['Purchase email', submission.purchaseEmail || '-'], ['Order ID', submission.orderId || '-'],
    ['Purchase date', submission.purchaseDate || '-'], ['Purchase country', submission.purchaseCountry || '-']
  ].map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join('');
  return `<h2>Feathly support request</h2><table cellpadding="6" cellspacing="0" border="1">${rows}</table><h3>Message</h3><p>${escapeHtml(submission.message).replaceAll('\n', '<br>')}</p>`;
}

export function acknowledgement(ticket, locale) {
  if (locale === 'ko') {
    return {
      subject: `[Feathly Support][${ticket}] 문의가 접수되었습니다`,
      text: `Feathly 지원 문의가 접수되었습니다.\n\n문의 번호: ${ticket}\n\n이후 답장할 때 제목의 문의 번호를 유지해 주세요.`
    };
  }
  return {
    subject: `[Feathly Support][${ticket}] Request received`,
    text: `Your Feathly support request has been received.\n\nReference: ${ticket}\n\nPlease keep this reference in the subject of future replies.`
  };
}

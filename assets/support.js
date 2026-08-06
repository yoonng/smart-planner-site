document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('[data-support-form]');
  if (!form) return;

  const category = form.querySelector('#support-category');
  const issue = form.querySelector('#support-issue');
  const title = form.querySelector('#support-title');
  const email = form.querySelector('#support-email');
  const replyTo = form.querySelector('input[name="_replyto"]');
  const subject = form.querySelector('input[name="_subject"]');
  const autoresponse = form.querySelector('input[name="_autoresponse"]');
  const ticket = form.querySelector('input[name="ticket_reference"]');
  const categoryCode = form.querySelector('input[name="category_code"]');
  const issueCode = form.querySelector('input[name="issue_code"]');
  const priorityCode = form.querySelector('input[name="priority_code"]');
  const purchasePanel = form.querySelector('[data-purchase-panel]');
  const purchaseFields = Array.from(purchasePanel.querySelectorAll('input, select, textarea'));
  const samePurchaseEmail = form.querySelector('#same-purchase-email');
  const purchaseEmail = form.querySelector('#purchase-email');
  const attachments = Array.from(form.querySelectorAll('input[type="file"]'));
  const fileError = form.querySelector('[data-file-error]');
  const submitButton = form.querySelector('button[type="submit"]');
  const isKorean = document.documentElement.lang.toLowerCase().startsWith('ko');
  const messages = isKorean ? {
    fileTypes: '첨부할 수 있는 파일은 PNG, JPG, JPEG, WebP, PDF, TXT입니다.',
    fileSize: '첨부파일 하나의 크기는 5MB 이하여야 합니다.',
    totalSize: '첨부파일 전체 크기는 10MB 이하여야 합니다.',
    sending: '보내는 중…',
    autoresponse: 'Feathly 지원 문의가 접수되었습니다. 문의 번호: {ticket}. 이후 답장할 때 이 번호를 제목에 유지해 주세요.'
  } : {
    fileTypes: 'Allowed attachments: PNG, JPG, JPEG, WebP, PDF, and TXT.',
    fileSize: 'Each attachment must be 5 MB or smaller.',
    totalSize: 'The combined attachment size must be 10 MB or smaller.',
    sending: 'Sending…',
    autoresponse: 'Your Feathly support request has been received. Reference: {ticket}. Please keep this reference in future replies.'
  };

  const koreanIssueLabels = {
    PURCHASE_NOT_ACTIVE: 'PRO 구매가 활성화되지 않음', CHARGED_NO_ACCESS: '결제했지만 PRO 이용 불가',
    PURCHASE_RESTORE: '구매 복원 문제', PURCHASE_ACCOUNT: 'Google Play 구매 계정 문제', OTHER_BILLING: '기타 결제 또는 PRO 문의',
    REFUND_REQUEST: '환불 요청 안내', REFUND_STATUS: '환불 상태 문의', REFUND_PRO_ACTIVE: '환불 후에도 PRO가 활성 상태임', UNRECOGNIZED_PURCHASE: '알 수 없는 구매',
    LOOP_SCHEDULE: 'Loop 또는 일정 문제', HOME_STATS: '홈 그룹 또는 통계 문제', ACTIONS: 'Recall, 완료 또는 미루기 문제', FOCUS_TIMER: 'Focus Timer 문제',
    ALARM_NOT_DELIVERED: '알림이 울리지 않음', BACKGROUND_DELIVERY: '앱 종료 또는 백그라운드 상태에서 알림 실패', FORCE_STOP_RECOVERY: '앱을 다시 연 후 알림이 복구되지 않음', WRONG_TIME: '잘못된 시각에 알림이 도착함', DUPLICATE: '알림이 중복됨', PERMISSION: '알림 또는 알람 권한 문제',
    BACKUP_EXPORT: '백업 또는 내보내기 문제', IMPORT_RESTORE: '가져오기 또는 복원 문제', DATA_LOSS: '데이터 손실 가능성', MIGRATION: '업데이트 또는 마이그레이션 문제',
    CRASH: '앱 충돌 또는 멈춤', PERFORMANCE: '성능 또는 배터리 문제', LAYOUT: '화면, 레이아웃, 테마 또는 언어 문제', OTHER_TECHNICAL: '기타 기술 문제',
    DATA_REQUEST: '개인정보 또는 개인 데이터 요청', DELETION_REQUEST: '지원 데이터 삭제 요청', POLICY_QUESTION: '개인정보 처리방침 문의',
    SECURITY_REPORT: '보안 문제 신고', OTHER_SECURITY: '기타 보안 문의',
    FEATURE_REQUEST: '기능 제안', USABILITY: '사용성 의견', TRANSLATION: '번역 제안', GENERAL_FEEDBACK: '일반 의견',
    BUSINESS: '사업 또는 제휴 문의', OTHER_QUESTION: '기타 문의'
  };

  const groups = {
    billing: { code: 'BILLING', priority: 'P2', purchase: true, issues: [['purchase_not_active', 'PURCHASE_NOT_ACTIVE', 'PRO purchase is not active'], ['charged_no_access', 'CHARGED_NO_ACCESS', 'Charged but PRO access is missing'], ['purchase_restore', 'PURCHASE_RESTORE', 'Restore Purchase problem'], ['purchase_account', 'PURCHASE_ACCOUNT', 'Google Play purchase account problem'], ['other_billing', 'OTHER_BILLING', 'Other billing or PRO question']] },
    refund: { code: 'REFUND', priority: 'P2', purchase: true, issues: [['refund_request', 'REFUND_REQUEST', 'Refund request guidance'], ['refund_status', 'REFUND_STATUS', 'Refund status question'], ['refund_pro_active', 'REFUND_PRO_ACTIVE', 'PRO remains active after refund'], ['unrecognized_purchase', 'UNRECOGNIZED_PURCHASE', 'Unrecognized purchase']] },
    planner: { code: 'PLANNER', priority: 'P2', purchase: false, issues: [['loop_schedule', 'LOOP_SCHEDULE', 'Loop or schedule problem'], ['home_stats', 'HOME_STATS', 'Home grouping or statistics problem'], ['recall_complete_snooze', 'ACTIONS', 'Recall, Complete, or Snooze problem'], ['focus_timer', 'FOCUS_TIMER', 'Focus Timer problem']] },
    notification: { code: 'NOTIFICATION', priority: 'P2', purchase: false, issues: [['alarm_not_delivered', 'ALARM_NOT_DELIVERED', 'Reminder or alarm did not fire'], ['background_delivery', 'BACKGROUND_DELIVERY', 'Reminder failed while the app was closed or in background'], ['force_stop_recovery', 'FORCE_STOP_RECOVERY', 'Reminder was not restored after reopening the app'], ['wrong_time', 'WRONG_TIME', 'Notification arrived at the wrong time'], ['duplicate', 'DUPLICATE', 'Duplicate notification'], ['permission', 'PERMISSION', 'Notification or alarm permission problem']] },
    data: { code: 'DATA', priority: 'P2', purchase: false, issues: [['backup_export', 'BACKUP_EXPORT', 'Backup or export problem'], ['import_restore', 'IMPORT_RESTORE', 'Import or restore problem'], ['data_loss', 'DATA_LOSS', 'Possible data loss'], ['migration', 'MIGRATION', 'Upgrade or migration problem']] },
    technical: { code: 'TECHNICAL', priority: 'P2', purchase: false, issues: [['crash', 'CRASH', 'App crash or freeze'], ['performance', 'PERFORMANCE', 'Performance or battery problem'], ['layout', 'LAYOUT', 'Screen, layout, theme, or language problem'], ['other_technical', 'OTHER_TECHNICAL', 'Other technical problem']] },
    privacy: { code: 'PRIVACY', priority: 'P2', purchase: false, issues: [['data_request', 'DATA_REQUEST', 'Privacy or personal data request'], ['deletion_request', 'DELETION_REQUEST', 'Support data deletion request'], ['policy_question', 'POLICY_QUESTION', 'Privacy policy question']] },
    security: { code: 'SECURITY', priority: 'P1', purchase: false, issues: [['security_report', 'SECURITY_REPORT', 'Security issue report'], ['other_security', 'OTHER_SECURITY', 'Other security concern']] },
    feedback: { code: 'FEEDBACK', priority: 'P3', purchase: false, issues: [['feature_request', 'FEATURE_REQUEST', 'Feature request'], ['usability', 'USABILITY', 'Usability feedback'], ['translation', 'TRANSLATION', 'Translation suggestion'], ['general_feedback', 'GENERAL_FEEDBACK', 'General feedback']] },
    other: { code: 'OTHER', priority: 'P3', purchase: false, issues: [['business', 'BUSINESS', 'Business or partnership inquiry'], ['other_question', 'OTHER_QUESTION', 'Other question']] }
  };

  const p1IssueCodes = new Set([
    'DATA_LOSS',
    'UNRECOGNIZED_PURCHASE',
    'ALARM_NOT_DELIVERED',
    'BACKGROUND_DELIVERY',
    'FORCE_STOP_RECOVERY'
  ]);

  function currentGroup() { return groups[category.value] || groups.other; }
  function currentIssue(group) { return group.issues.find((item) => item[0] === issue.value) || group.issues[0]; }
  function clean(value) { return String(value || '').replace(/[\r\n\t]+/g, ' ').replace(/[\[\]<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 100); }
  function makeTicket() {
    const now = new Date();
    const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const randomValue = window.crypto && window.crypto.getRandomValues ? window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36) : Math.random().toString(36).slice(2);
    return `FE-${date}-${randomValue.slice(0, 6).toUpperCase().padEnd(6, '0')}`;
  }

  function renderIssues(preferred) {
    const group = currentGroup();
    issue.innerHTML = group.issues.map(([value, code, label]) => `<option value="${value}" data-code="${code}">${isKorean ? (koreanIssueLabels[code] || label) : label}</option>`).join('');
    if (preferred && group.issues.some((item) => item[0] === preferred)) issue.value = preferred;
    purchasePanel.hidden = !group.purchase;
    purchaseFields.forEach((field) => { field.disabled = !group.purchase; });
    if (!group.purchase) purchaseEmail.value = '';
    syncPurchaseEmail();
  }

  function syncPurchaseEmail() {
    const needsPurchase = currentGroup().purchase;
    if (!needsPurchase) { purchaseEmail.required = false; return; }
    if (samePurchaseEmail.checked) { purchaseEmail.value = email.value; purchaseEmail.readOnly = true; purchaseEmail.required = false; }
    else { purchaseEmail.readOnly = false; purchaseEmail.required = true; }
  }

  function validateFiles() {
    const allowed = ['png', 'jpg', 'jpeg', 'webp', 'pdf', 'txt'];
    let total = 0;
    for (const input of attachments) {
      const file = input.files && input.files[0];
      if (!file) continue;
      total += file.size;
      const extension = file.name.split('.').pop().toLowerCase();
      if (!allowed.includes(extension)) { fileError.textContent = messages.fileTypes; return false; }
      if (file.size > 5 * 1024 * 1024) { fileError.textContent = messages.fileSize; return false; }
    }
    if (total > 10 * 1024 * 1024) { fileError.textContent = messages.totalSize; return false; }
    fileError.textContent = '';
    return true;
  }

  const params = new URLSearchParams(window.location.search);
  if (groups[params.get('category')]) category.value = params.get('category');
  renderIssues(params.get('issue'));
  [['appVersion', 'app-version'], ['build', 'build-number'], ['device', 'device-model'], ['android', 'android-version'], ['locale', 'locale'], ['timezone', 'timezone']].forEach(([param, id]) => { const field = form.querySelector(`#${id}`); if (field && params.get(param)) field.value = params.get(param).slice(0, 120); });

  category.addEventListener('change', function () { renderIssues(); });
  samePurchaseEmail.addEventListener('change', syncPurchaseEmail);
  email.addEventListener('input', syncPurchaseEmail);
  attachments.forEach((input) => input.addEventListener('change', validateFiles));

  form.addEventListener('submit', function (event) {
    if (!validateFiles()) { event.preventDefault(); return; }
    const group = currentGroup();
    const selected = currentIssue(group);
    const reference = makeTicket();
    const priority = p1IssueCodes.has(selected[1]) ? 'P1' : group.priority;
    ticket.value = reference;
    categoryCode.value = group.code;
    issueCode.value = selected[1];
    priorityCode.value = priority;
    replyTo.value = email.value;
    subject.value = `[FEATHLY-SUPPORT][${group.code}][${selected[1]}][${priority}][${reference}] ${clean(title.value) || selected[2]}`;
    autoresponse.value = messages.autoresponse.replace('{ticket}', reference);
    syncPurchaseEmail();
    submitButton.disabled = true;
    submitButton.textContent = messages.sending;
  });
});

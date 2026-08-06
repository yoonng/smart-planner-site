document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('[data-zoho-support-form]');
  if (!form) return;

  const isKorean = document.documentElement.lang.toLowerCase().startsWith('ko');
  const endpoint = form.dataset.apiEndpoint || '';
  const siteKey = document.querySelector('meta[name="feathly-turnstile-site-key"]')?.content.trim() || '';
  const result = form.querySelector('[data-submit-result]');
  const button = form.querySelector('button[type="submit"]');
  const turnstileContainer = form.querySelector('[data-turnstile-container]');
  const category = form.querySelector('[name="category"]');
  const issue = form.querySelector('[name="issue_code"]');
  const email = form.querySelector('[name="email"]');
  const purchasePanel = form.querySelector('[data-purchase-panel]');
  const samePurchaseEmail = form.querySelector('[name="same_purchase_email"]');
  const purchaseEmail = form.querySelector('[name="purchase_email"]');
  let turnstileWidgetId = null;

  const issues = {
    billing: [['PURCHASE_NOT_ACTIVE', 'PRO purchase is not active', 'PRO 구매가 활성화되지 않음'], ['CHARGED_NO_ACCESS', 'Charged but PRO access is missing', '결제했지만 PRO 이용 불가'], ['PURCHASE_RESTORE', 'Restore Purchase problem', '구매 복원 문제'], ['PURCHASE_ACCOUNT', 'Google Play purchase account problem', 'Google Play 구매 계정 문제'], ['OTHER_BILLING', 'Other billing or PRO question', '기타 결제 또는 PRO 문의']],
    refund: [['REFUND_REQUEST', 'Refund request guidance', '환불 요청 안내'], ['REFUND_STATUS', 'Refund status question', '환불 상태 문의'], ['REFUND_PRO_ACTIVE', 'PRO remains active after refund', '환불 후에도 PRO가 활성 상태임'], ['UNRECOGNIZED_PURCHASE', 'Unrecognized purchase', '알 수 없는 구매']],
    planner: [['LOOP_SCHEDULE', 'Loop or schedule problem', 'Loop 또는 일정 문제'], ['HOME_STATS', 'Home grouping or statistics problem', '홈 그룹 또는 통계 문제'], ['ACTIONS', 'Recall, Complete, or Snooze problem', 'Recall, 완료 또는 미루기 문제'], ['FOCUS_TIMER', 'Focus Timer problem', 'Focus Timer 문제']],
    notification: [['ALARM_NOT_DELIVERED', 'Reminder or alarm did not fire', '알림이 울리지 않음'], ['BACKGROUND_DELIVERY', 'Reminder failed in background', '백그라운드 상태에서 알림 실패'], ['FORCE_STOP_RECOVERY', 'Reminder was not restored', '앱을 다시 연 후 알림이 복구되지 않음'], ['WRONG_TIME', 'Notification arrived at the wrong time', '잘못된 시각에 알림이 도착함'], ['DUPLICATE', 'Duplicate notification', '알림이 중복됨'], ['PERMISSION', 'Notification or alarm permission problem', '알림 또는 알람 권한 문제']],
    data: [['BACKUP_EXPORT', 'Backup or export problem', '백업 또는 내보내기 문제'], ['IMPORT_RESTORE', 'Import or restore problem', '가져오기 또는 복원 문제'], ['DATA_LOSS', 'Possible data loss', '데이터 손실 가능성'], ['MIGRATION', 'Upgrade or migration problem', '업데이트 또는 마이그레이션 문제']],
    technical: [['CRASH', 'App crash or freeze', '앱 충돌 또는 멈춤'], ['PERFORMANCE', 'Performance or battery problem', '성능 또는 배터리 문제'], ['LAYOUT', 'Screen, layout, theme, or language problem', '화면, 레이아웃, 테마 또는 언어 문제'], ['OTHER_TECHNICAL', 'Other technical problem', '기타 기술 문제']],
    privacy: [['DATA_REQUEST', 'Privacy or personal data request', '개인정보 또는 개인 데이터 요청'], ['DELETION_REQUEST', 'Support data deletion request', '지원 데이터 삭제 요청'], ['POLICY_QUESTION', 'Privacy policy question', '개인정보 처리방침 문의']],
    security: [['SECURITY_REPORT', 'Security issue report', '보안 문제 신고'], ['OTHER_SECURITY', 'Other security concern', '기타 보안 문의']],
    feedback: [['FEATURE_REQUEST', 'Feature request', '기능 제안'], ['USABILITY', 'Usability feedback', '사용성 의견'], ['TRANSLATION', 'Translation suggestion', '번역 제안'], ['GENERAL_FEEDBACK', 'General feedback', '일반 의견']],
    other: [['BUSINESS', 'Business inquiry', '사업 문의'], ['OTHER_QUESTION', 'Other question', '기타 문의']]
  };

  const copy = isKorean ? {
    setup: '시험 API 주소와 Turnstile 사이트 키를 설정한 후 사용할 수 있습니다.',
    sending: '보내는 중…',
    send: '지원 문의 보내기',
    success: (ticket) => `문의가 접수되었습니다. 문의 번호: ${ticket}`,
    error: '전송하지 못했습니다. 잠시 후 다시 시도해 주세요.',
    captcha: '보안 확인을 완료해 주세요.'
  } : {
    setup: 'Configure the preview API URL and Turnstile site key before using this form.',
    sending: 'Sending…',
    send: 'Send support request',
    success: (ticket) => `Request received. Reference: ${ticket}`,
    error: 'The request could not be sent. Please try again later.',
    captcha: 'Please complete the security check.'
  };

  function setResult(message, isError) {
    result.textContent = message;
    result.classList.toggle('form-error', Boolean(isError));
    result.classList.toggle('form-success', !isError);
  }

  function configurationReady() {
    return endpoint.startsWith('https://') && siteKey && siteKey !== 'TURNSTILE_SITE_KEY_REQUIRED';
  }

  function renderIssues() {
    issue.innerHTML = (issues[category.value] || issues.other).map(([value, en, ko]) => `<option value="${value}">${isKorean ? ko : en}</option>`).join('');
    const purchaseRequired = category.value === 'billing' || category.value === 'refund';
    purchasePanel.hidden = !purchaseRequired;
    purchasePanel.querySelectorAll('input').forEach((field) => { field.disabled = !purchaseRequired; });
    syncPurchaseEmail();
  }

  function syncPurchaseEmail() {
    if (purchasePanel.hidden) return;
    if (samePurchaseEmail.checked) {
      purchaseEmail.value = email.value;
      purchaseEmail.readOnly = true;
    } else {
      purchaseEmail.readOnly = false;
    }
  }

  renderIssues();
  category.addEventListener('change', renderIssues);
  email.addEventListener('input', syncPurchaseEmail);
  samePurchaseEmail.addEventListener('change', syncPurchaseEmail);

  function renderTurnstile() {
    if (!configurationReady() || !window.turnstile || turnstileWidgetId !== null) return;
    turnstileWidgetId = window.turnstile.render(turnstileContainer, { sitekey: siteKey, theme: 'light' });
  }

  if (!configurationReady()) {
    button.disabled = true;
    setResult(copy.setup, true);
  } else {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.addEventListener('load', renderTurnstile);
    document.head.appendChild(script);
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!configurationReady()) return;
    const turnstileToken = turnstileWidgetId === null ? '' : window.turnstile.getResponse(turnstileWidgetId);
    if (!turnstileToken) { setResult(copy.captcha, true); return; }

    const data = new FormData(form);
    const payload = {
      category: data.get('category'), issueCode: data.get('issue_code'), title: data.get('request_title'),
      name: data.get('name'), email: data.get('email'), message: data.get('message'),
      appVersion: data.get('app_version'), buildNumber: data.get('build_number'),
      deviceModel: data.get('device_model'), osVersion: data.get('os_version'),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '', locale: isKorean ? 'ko' : 'en',
      purchaseEmail: data.get('purchase_email'), orderId: data.get('order_id'),
      purchaseDate: data.get('purchase_date'), purchaseCountry: data.get('purchase_country'),
      privacyConsent: data.get('privacy_consent') === 'accepted', website: data.get('website'), turnstileToken
    };

    button.disabled = true;
    button.textContent = copy.sending;
    setResult('', false);
    try {
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), credentials: 'omit'
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || !body.ok) throw new Error(body.code || 'REQUEST_FAILED');
      form.reset();
      setResult(copy.success(body.ticket), false);
    } catch {
      setResult(copy.error, true);
    } finally {
      if (turnstileWidgetId !== null) window.turnstile.reset(turnstileWidgetId);
      button.disabled = false;
      button.textContent = copy.send;
    }
  });
});

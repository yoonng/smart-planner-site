document.addEventListener('DOMContentLoaded', function () {
  const links = {
    group: 'https://groups.google.com/d/forum/feathly-closed-testers',
    optIn: 'https://play.google.com/apps/testing/com.feathly.planner',
    android: 'https://play.google.com/store/apps/details?id=com.feathly.planner',
    feedback: 'https://forms.gle/phouKRfRpPJs2F9D9'
  };

  const popup = document.querySelector('[data-closed-test-popup]');
  if (popup) {
    const locale = document.documentElement.lang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
    const storageKey = `feathly-closed-test-popup-hide-date-${locale}`;
    const todayKey = function () {
      const now = new Date();
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    };
    const shouldShow = window.localStorage.getItem(storageKey) !== todayKey();
    const panel = popup.querySelector('.closed-test-popup-panel');
    const actions = popup.querySelector('.closed-test-popup-actions');
    const closeButtons = popup.querySelectorAll('[data-closed-test-popup-close]');

    let hideTodayCheckbox = popup.querySelector('[data-closed-test-hide-today]');
    if (!hideTodayCheckbox && panel && actions) {
      const wrapper = document.createElement('label');
      wrapper.className = 'closed-test-popup-day-hide';
      wrapper.innerHTML = `<input type="checkbox" data-closed-test-hide-today><span>${locale === 'ko' ? '오늘은 그만 띄우기' : 'Do not show again today'}</span>`;
      actions.before(wrapper);
      hideTodayCheckbox = wrapper.querySelector('[data-closed-test-hide-today]');
    }

    const rememberTodayIfRequested = function () {
      if (hideTodayCheckbox && hideTodayCheckbox.checked) {
        window.localStorage.setItem(storageKey, todayKey());
      }
    };

    const closePopup = function () {
      rememberTodayIfRequested();
      popup.hidden = true;
    };

    closeButtons.forEach((button) => button.addEventListener('click', closePopup));
    popup.addEventListener('click', function (event) {
      if (event.target === popup) closePopup();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !popup.hidden) closePopup();
    });
    popup.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', rememberTodayIfRequested);
    });

    if (shouldShow) {
      window.setTimeout(function () {
        popup.hidden = false;
        const closeButton = popup.querySelector('.closed-test-popup-close');
        if (closeButton) closeButton.focus({ preventScroll: true });
      }, 450);
    }
  }

  const form = document.querySelector('[data-closed-test-form]');
  if (!form) return;

  const isKorean = document.documentElement.lang.toLowerCase().startsWith('ko');
  const endpoint = form.dataset.apiEndpoint || '';
  const siteKey = document.querySelector('meta[name="feathly-turnstile-site-key"]')?.content.trim() || '';
  const result = form.querySelector('[data-closed-test-result]');
  const success = form.querySelector('[data-closed-test-success]');
  const submitButton = form.querySelector('button[type="submit"]');
  const turnstileContainer = form.querySelector('[data-turnstile-container]');
  let turnstileWidgetId = null;

  const copy = isKorean ? {
    setup: '신청 서비스를 준비하지 못했습니다. 잠시 후 다시 시도해 주세요.',
    sending: '신청 중…',
    send: '테스터 신청하기',
    captcha: '보안 확인을 완료해 주세요.',
    success: (id) => `신청이 접수되었습니다. 신청 번호: ${id}`,
    error: '신청을 전송하지 못했습니다. 잠시 후 다시 시도해 주세요.',
    rate: '신청 횟수가 너무 많습니다. 잠시 후 다시 시도해 주세요.'
  } : {
    setup: 'The application service is not ready. Please try again later.',
    sending: 'Submitting…',
    send: 'Apply as a tester',
    captcha: 'Please complete the security check.',
    success: (id) => `Application received. Reference: ${id}`,
    error: 'The application could not be sent. Please try again later.',
    rate: 'Too many submissions. Please wait and try again.'
  };

  function setResult(message, isError) {
    if (!result) return;
    result.textContent = message;
    result.classList.toggle('form-error', Boolean(isError));
    result.classList.toggle('form-success', !isError && Boolean(message));
  }

  function configurationReady() {
    return endpoint.startsWith('https://') && siteKey && siteKey !== 'TURNSTILE_SITE_KEY_REQUIRED';
  }

  function renderTurnstile() {
    if (!configurationReady() || !window.turnstile || turnstileWidgetId !== null || !turnstileContainer) return;
    turnstileWidgetId = window.turnstile.render(turnstileContainer, { sitekey: siteKey, theme: 'light' });
  }

  function showSuccess(applicationId) {
    if (!success) return;
    success.hidden = false;
    success.innerHTML = '';

    const strong = document.createElement('strong');
    strong.textContent = copy.success(applicationId);
    success.appendChild(strong);

    const steps = document.createElement('p');
    steps.style.margin = '10px 0 0';
    steps.appendChild(document.createTextNode(isKorean ? '다음 단계: ' : 'Next step: '));

    const groupLink = document.createElement('a');
    groupLink.href = links.group;
    groupLink.target = '_blank';
    groupLink.rel = 'noopener';
    groupLink.textContent = isKorean ? 'Google Group 가입' : 'Join Google Group';
    steps.appendChild(groupLink);
    steps.appendChild(document.createTextNode(' → '));

    const optInLink = document.createElement('a');
    optInLink.href = links.optIn;
    optInLink.target = '_blank';
    optInLink.rel = 'noopener';
    optInLink.textContent = isKorean ? 'Google Play 테스터 참여(Opt-in)' : 'Google Play test opt-in';
    steps.appendChild(optInLink);
    success.appendChild(steps);

    const emailNote = document.createElement('p');
    emailNote.style.margin = '8px 0 0';
    emailNote.textContent = isKorean
      ? '입력한 이메일로 동일한 단계가 포함된 확인메일도 발송됩니다.'
      : 'A confirmation email with the same next steps is also sent to your application email.';
    success.appendChild(emailNote);
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  if (!configurationReady()) {
    submitButton.disabled = true;
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
    if (!turnstileToken) {
      setResult(copy.captcha, true);
      return;
    }

    const data = new FormData(form);
    const payload = {
      email: data.get('email'),
      androidVersion: data.get('android_version'),
      deviceModel: data.get('device_model'),
      locale: isKorean ? 'ko' : 'en',
      testerConsent: data.get('tester_consent') === 'accepted',
      website: data.get('website'),
      turnstileToken
    };

    submitButton.disabled = true;
    submitButton.textContent = copy.sending;
    setResult('', false);
    if (success) success.hidden = true;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'omit'
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || !body.ok) {
        if (response.status === 429 || body.code === 'RATE_LIMITED') throw new Error('RATE_LIMITED');
        throw new Error(body.code || 'REQUEST_FAILED');
      }

      form.reset();
      showSuccess(body.applicationId || 'CT');
      setResult('', false);
    } catch (error) {
      setResult(error instanceof Error && error.message === 'RATE_LIMITED' ? copy.rate : copy.error, true);
    } finally {
      if (turnstileWidgetId !== null) window.turnstile.reset(turnstileWidgetId);
      submitButton.disabled = false;
      submitButton.textContent = copy.send;
    }
  });
});

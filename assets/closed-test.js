document.addEventListener('DOMContentLoaded', function () {
  const groupUrl = 'https://groups.google.com/d/forum/feathly-closed-testers';
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
  if (form) {
    const email = form.querySelector('input[name="email"]');
    const replyTo = form.querySelector('input[name="_replyto"]');
    const autoresponse = form.querySelector('input[name="_autoresponse"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const isKorean = document.documentElement.lang.toLowerCase().startsWith('ko');

    form.addEventListener('submit', function () {
      if (email && replyTo) replyTo.value = email.value;
      if (autoresponse) {
        autoresponse.value = isKorean
          ? `Feathly: Smart Planner Closed Test 신청이 접수되었습니다. 다음 단계로, 테스트에 사용할 동일한 Google 계정으로 Feathly Closed Testers Google Group에 가입해 주세요: ${groupUrl} . Google Group 가입만으로 14일 테스트가 시작되는 것은 아닙니다. Google Play Closed Test opt-in 안내를 받은 뒤 opt-in해야 합니다.`
          : `Your Feathly: Smart Planner Closed Test application has been received. Next, join the Feathly Closed Testers Google Group using the same Google account you will use for testing: ${groupUrl} . Joining the Google Group does not start the 14-day test period. The period starts after you opt in to the Google Play Closed Test.`;
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = isKorean ? '신청 중…' : 'Submitting…';
      }
    });
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('submitted') === '1') {
    const success = document.querySelector('[data-closed-test-success]');
    if (success) {
      const isKorean = document.documentElement.lang.toLowerCase().startsWith('ko');
      success.hidden = false;
      if (!success.querySelector('[data-closed-test-group-link]')) {
        const nextStep = document.createElement('p');
        nextStep.setAttribute('data-closed-test-group-link', '');
        nextStep.style.margin = '10px 0 0';
        const link = document.createElement('a');
        link.href = groupUrl;
        link.target = '_blank';
        link.rel = 'noopener';
        link.style.fontWeight = '800';
        link.style.textDecoration = 'underline';
        link.textContent = isKorean ? 'Feathly Closed Testers Google Group 가입' : 'Join the Feathly Closed Testers Google Group';
        nextStep.appendChild(document.createTextNode(isKorean ? '다음 단계: ' : 'Next step: '));
        nextStep.appendChild(link);
        success.appendChild(nextStep);
      }
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});

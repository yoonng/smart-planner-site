document.addEventListener('DOMContentLoaded', function () {
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

    const style = document.createElement('style');
    style.textContent = `
      .closed-test-popup-day-hide { display:flex; align-items:center; gap:10px; margin:20px 0 0; padding:14px 16px; border:1px solid #e2e8f0; border-radius:16px; background:#f8fafc; color:#475569; font-size:14px; font-weight:700; cursor:pointer; }
      .closed-test-popup-day-hide input { width:18px; height:18px; margin:0; accent-color:#6d5dfc; }
      .closed-test-popup-window-label { margin:0 0 4px; color:#94a3b8; font-size:12px; font-weight:800; letter-spacing:.06em; text-transform:uppercase; }
    `;
    document.head.appendChild(style);

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
    const submitButton = form.querySelector('button[type="submit"]');
    const isKorean = document.documentElement.lang.toLowerCase().startsWith('ko');

    form.addEventListener('submit', function () {
      if (email && replyTo) replyTo.value = email.value;
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
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});

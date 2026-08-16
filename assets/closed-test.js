document.addEventListener('DOMContentLoaded', function () {
  const popup = document.querySelector('[data-closed-test-popup]');
  if (popup) {
    const locale = document.documentElement.lang.toLowerCase().startsWith('ko') ? 'ko' : 'en';
    const storageKey = `feathly-closed-test-popup-dismissed-${locale}`;
    const dismissedAt = Number(window.localStorage.getItem(storageKey) || 0);
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const shouldShow = !dismissedAt || Date.now() - dismissedAt > sevenDays;
    const closeButtons = popup.querySelectorAll('[data-closed-test-popup-close]');

    const closePopup = function () {
      popup.hidden = true;
      window.localStorage.setItem(storageKey, String(Date.now()));
    };

    closeButtons.forEach((button) => button.addEventListener('click', closePopup));
    popup.addEventListener('click', function (event) {
      if (event.target === popup) closePopup();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !popup.hidden) closePopup();
    });

    if (shouldShow) {
      window.setTimeout(function () {
        popup.hidden = false;
      }, 650);
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

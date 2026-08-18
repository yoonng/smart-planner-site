document.addEventListener('DOMContentLoaded', function () {
  const isKorean = document.documentElement.lang === 'ko';
  const topicButtons = Array.from(document.querySelectorAll('[data-guide-topic]'));
  const topics = Array.from(document.querySelectorAll('.full-guide-topic[id]'));
  if (!topicButtons.length || !topics.length) return;

  const accessTopic = document.querySelector('.full-guide-topic#access');
  if (accessTopic && !accessTopic.querySelector('.closed-test-become-tester-figure')) {
    const steps = accessTopic.querySelector('.full-guide-steps');
    if (steps) {
      const figure = document.createElement('figure');
      figure.className = 'closed-test-become-tester-figure';
      figure.style.margin = '24px 0';

      const image = document.createElement('img');
      image.src = '/assets/closed-test/feathly-google-play-become-a-tester.webp';
      image.alt = isKorean
        ? 'Feathly Google Play Closed Test 페이지의 Become a tester 버튼'
        : 'Google Play Closed Test page for Feathly with the Become a tester button';
      image.loading = 'lazy';
      image.width = 650;
      image.height = 267;
      image.style.cssText = 'display:block;width:100%;height:auto;border:1px solid #e2e8f0;border-radius:18px;';

      const caption = document.createElement('figcaption');
      caption.style.cssText = 'margin-top:10px;color:#64748b;font-size:14px;line-height:1.6;';
      caption.innerHTML = isKorean
        ? 'Google Play Closed Test 페이지에서 초대받은 Google 계정으로 로그인되어 있는지 확인한 뒤 <strong>Become a tester</strong> 버튼을 선택하세요.'
        : 'On the Google Play Closed Test page, confirm that you are signed in with the invited Google account, then select <strong>Become a tester</strong>.';

      figure.append(image, caption);
      steps.insertAdjacentElement('afterend', figure);
    }
  }

  const languageSelect = document.querySelector('.language-switcher select');
  if (languageSelect) {
    const cleanSelect = languageSelect.cloneNode(true);
    languageSelect.replaceWith(cleanSelect);
    cleanSelect.value = isKorean ? 'ko' : 'en';
    cleanSelect.addEventListener('change', () => {
      const locale = cleanSelect.value;
      window.localStorage.setItem('feathly-language', locale);
      const targetPath = locale === 'ko'
        ? '/ko/smart-planner/closed-test-guide.html'
        : '/smart-planner/closed-test-guide.html';
      window.location.assign(`${targetPath}${window.location.search}${window.location.hash}`);
    });
  }

  const topicIds = new Set(topics.map((topic) => topic.id));
  const defaultTopic = topicIds.has('welcome') ? 'welcome' : topics[0].id;

  const openAncestors = (button) => {
    let node = button.parentElement;
    while (node) {
      if (node.tagName === 'DETAILS') node.open = true;
      node = node.parentElement;
      if (node && node.classList && node.classList.contains('full-guide-tree')) break;
    }
  };

  const activate = (topicId, options = {}) => {
    const id = topicIds.has(topicId) ? topicId : defaultTopic;
    topics.forEach((topic) => {
      const active = topic.id === id;
      topic.hidden = !active;
      topic.classList.toggle('is-active', active);
    });
    topicButtons.forEach((button) => {
      const active = button.dataset.guideTopic === id;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-current', active ? 'page' : 'false');
      if (active) openAncestors(button);
    });
    if (options.updateHash !== false) {
      const nextHash = `#${id}`;
      if (window.location.hash !== nextHash) history.pushState(null, '', nextHash);
    }
    if (options.scrollPanel) {
      const panel = document.querySelector('.full-guide-panel');
      if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  topicButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activate(button.dataset.guideTopic, { updateHash: true, scrollPanel: window.innerWidth <= 920 });
    });
  });

  document.querySelectorAll('[data-guide-jump]').forEach((button) => {
    button.addEventListener('click', () => {
      activate(button.dataset.guideJump, { updateHash: true, scrollPanel: true });
    });
  });

  window.addEventListener('hashchange', () => {
    activate(window.location.hash.replace(/^#/, ''), { updateHash: false, scrollPanel: false });
  });

  activate(window.location.hash.replace(/^#/, '') || defaultTopic, { updateHash: false, scrollPanel: false });
});
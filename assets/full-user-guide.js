document.addEventListener('DOMContentLoaded', function () {
  const topicButtons = Array.from(document.querySelectorAll('[data-guide-topic]'));
  const topics = Array.from(document.querySelectorAll('.full-guide-topic[id]'));
  if (!topicButtons.length || !topics.length) return;

  const languageSelect = document.querySelector('.language-switcher select');
  if (languageSelect) {
    const cleanSelect = languageSelect.cloneNode(true);
    languageSelect.replaceWith(cleanSelect);
    cleanSelect.value = document.documentElement.lang === 'ko' ? 'ko' : 'en';
    cleanSelect.addEventListener('change', () => {
      const locale = cleanSelect.value;
      window.localStorage.setItem('feathly-language', locale);
      const targetPath = locale === 'ko'
        ? '/ko/smart-planner/full-user-guide.html'
        : '/smart-planner/full-user-guide.html';
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

    const activeButton = topicButtons.find((button) => button.dataset.guideTopic === id);
    if (options.focusButton && activeButton) activeButton.focus({ preventScroll: true });
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
      activate(button.dataset.guideJump, { updateHash: true, scrollPanel: true, focusButton: false });
    });
  });

  window.addEventListener('hashchange', () => {
    activate(window.location.hash.replace(/^#/, ''), { updateHash: false, scrollPanel: false });
  });

  activate(window.location.hash.replace(/^#/, '') || defaultTopic, { updateHash: false, scrollPanel: false });
});

document.addEventListener('DOMContentLoaded', function () {
  const isKorean = document.documentElement.lang === 'ko';
  const supportButton = document.querySelector('[data-guide-topic="support"]');
  const supportArticle = document.querySelector('.full-guide-topic#support');

  if (supportButton && supportArticle && !document.querySelector('[data-guide-topic="copy-support-info"]')) {
    const copySupportButton = document.createElement('button');
    copySupportButton.className = 'full-guide-link';
    copySupportButton.type = 'button';
    copySupportButton.dataset.guideTopic = 'copy-support-info';
    copySupportButton.textContent = isKorean
      ? '6.2.1 Copy Support Info'
      : '6.2.1 Copy Support Info';
    supportButton.before(copySupportButton);
    supportButton.textContent = isKorean
      ? '6.2.2 Support 문의'
      : '6.2.2 Contact support';

    const copySupportArticle = document.createElement('article');
    copySupportArticle.className = 'full-guide-topic';
    copySupportArticle.id = 'copy-support-info';
    copySupportArticle.hidden = true;
    copySupportArticle.innerHTML = isKorean
      ? `<div class="full-guide-breadcrumb">문제 해결과 지원 · 도움받기</div>
          <h2>Copy Support Info</h2>
          <p class="full-guide-lead"><strong>Copy Support Info</strong>는 문제를 문의할 때 Feathly Support가 사용 환경을 더 빠르게 파악할 수 있도록 앱의 지원 정보를 클립보드에 복사하는 기능입니다.</p>
          <p>앱에서 <strong>Copy Support Info</strong>를 실행한 뒤, 복사된 내용을 Feathly 웹사이트의 Q&amp;A / Support 문의 내용에 함께 붙여 넣어 주세요.</p>
          <div class="full-guide-steps">
            <div class="full-guide-step">앱에서 <strong>Copy Support Info</strong>를 선택해 지원 정보를 복사합니다.</div>
            <div class="full-guide-step">Feathly Q&amp;A / Support Form을 열고 발생한 문제와 재현 과정을 작성합니다.</div>
            <div class="full-guide-step">문의 내용 아래에 복사한 Support Info를 그대로 붙여 넣습니다.</div>
          </div>
          <p>이 정보는 앱 버전, 기기 및 Android 환경처럼 문제 분석에 필요한 기본 환경 정보를 확인하는 데 도움이 됩니다. Support 담당자가 같은 조건을 파악하는 시간을 줄일 수 있어 <strong>문제 확인과 요청 처리에 도움이 됩니다.</strong></p>
          <div class="full-guide-tip"><strong>권장:</strong> 오류나 알림 문제를 문의할 때는 문제 설명, 발생 시각, 재현 순서와 함께 Copy Support Info를 첨부해 주세요.</div>
          <div class="full-guide-warning"><strong>주의:</strong> 문의 전에 복사된 내용을 한 번 확인하고, 개인 메모·비밀번호·결제정보 등 별도의 민감한 정보는 추가하지 마세요.</div>
          <div class="full-guide-next"><button type="button" data-guide-jump="support">다음: Support 문의</button></div>`
      : `<div class="full-guide-breadcrumb">Troubleshooting and support · Get help</div>
          <h2>Copy Support Info</h2>
          <p class="full-guide-lead"><strong>Copy Support Info</strong> copies useful app and device support information to your clipboard so Feathly Support can understand your environment more quickly.</p>
          <p>After using <strong>Copy Support Info</strong> in the app, paste the copied information into the message field when you submit a Q&amp;A or Support request on the Feathly website.</p>
          <div class="full-guide-steps">
            <div class="full-guide-step">Select <strong>Copy Support Info</strong> in the app to copy the support information.</div>
            <div class="full-guide-step">Open the Feathly Q&amp;A / Support form and describe the problem and the steps that reproduce it.</div>
            <div class="full-guide-step">Paste the copied Support Info below your description.</div>
          </div>
          <p>The copied information helps identify basic diagnostic context such as the app version, device, and Android environment. Providing it can reduce the time needed to identify your setup and <strong>help Feathly handle your request more efficiently.</strong></p>
          <div class="full-guide-tip"><strong>Recommended:</strong> for errors or notification problems, include Copy Support Info together with what happened, the approximate time, and the steps that reproduce the issue.</div>
          <div class="full-guide-warning"><strong>Privacy:</strong> review the copied text before submitting it and do not add passwords, payment details, or other sensitive personal information.</div>
          <div class="full-guide-next"><button type="button" data-guide-jump="support">Next: Contact support</button></div>`;
    supportArticle.before(copySupportArticle);
  }

  const topicButtons = Array.from(document.querySelectorAll('[data-guide-topic]'));
  const topics = Array.from(document.querySelectorAll('.full-guide-topic[id]'));
  if (!topicButtons.length || !topics.length) return;

  const languageSelect = document.querySelector('.language-switcher select');
  if (languageSelect) {
    const cleanSelect = languageSelect.cloneNode(true);
    languageSelect.replaceWith(cleanSelect);
    cleanSelect.value = isKorean ? 'ko' : 'en';
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

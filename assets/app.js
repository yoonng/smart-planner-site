document.addEventListener('DOMContentLoaded', function () {
  const normalizePath = (rawPath) => {
    let value = rawPath || '/';
    value = value.replace(/\/{2,}/g, '/');
    if (value === '/index.html') return '/';
    if (value.endsWith('/index.html')) return value.slice(0, -10) || '/';
    return value;
  };

  const englishToKorean = {
    '/': '/ko/',
    '/smart-planner/': '/ko/smart-planner/',
    '/smart-planner/user-guide.html': '/ko/smart-planner/user-guide.html',
    '/smart-planner/download.html': '/ko/smart-planner/download.html',
    '/smart-planner/faq.html': '/ko/smart-planner/faq.html',
    '/smart-planner/support.html': '/ko/smart-planner/support.html',
    '/smart-planner/build-history.html': '/ko/smart-planner/build-history.html',
    '/smart-planner/privacy.html': '/ko/smart-planner/privacy.html',
    '/smart-planner/terms.html': '/ko/smart-planner/terms.html',
    '/smart-planner/refund.html': '/ko/smart-planner/refund.html',
  };
  const koreanToEnglish = Object.fromEntries(
    Object.entries(englishToKorean).map(([englishPath, koreanPath]) => [koreanPath, englishPath]),
  );

  const path = normalizePath(window.location.pathname);
  const isKoreanPage = path === '/ko/' || path.startsWith('/ko/');
  const currentLocale = isKoreanPage ? 'ko' : 'en';
  const params = new URLSearchParams(window.location.search);
  const explicitLocale = params.get('lang');
  const savedLocale = window.localStorage.getItem('feathly-language');
  const browserLocale = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
  const browserPreferredLocale = browserLocale.toLowerCase().startsWith('ko') ? 'ko' : 'en';

  const buildLocalizedUrl = (targetPath) => {
    const nextParams = new URLSearchParams(window.location.search);
    nextParams.delete('lang');
    const query = nextParams.toString();
    return `${targetPath}${query ? `?${query}` : ''}${window.location.hash || ''}`;
  };

  const localizedPathFor = (locale) => {
    if (locale === 'ko') {
      if (isKoreanPage) return path;
      return englishToKorean[path] || '/ko/';
    }
    if (!isKoreanPage) return path;
    return koreanToEnglish[path] || '/';
  };

  if (explicitLocale === 'ko' || explicitLocale === 'en') {
    window.localStorage.setItem('feathly-language', explicitLocale);
    const targetPath = localizedPathFor(explicitLocale);
    if (targetPath !== path) {
      window.location.replace(buildLocalizedUrl(targetPath));
      return;
    }
  } else if (!savedLocale && currentLocale === 'en' && browserPreferredLocale === 'ko' && englishToKorean[path]) {
    window.location.replace(buildLocalizedUrl(englishToKorean[path]));
    return;
  }

  document.documentElement.lang = currentLocale;

  const faviconHref = '/assets/favicon.svg';
  if (!document.querySelector('link[rel="icon"]')) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = faviconHref;
    document.head.appendChild(favicon);
  }
  if (!document.querySelector('link[rel="shortcut icon"]')) {
    const shortcutIcon = document.createElement('link');
    shortcutIcon.rel = 'shortcut icon';
    shortcutIcon.type = 'image/svg+xml';
    shortcutIcon.href = faviconHref;
    document.head.appendChild(shortcutIcon);
  }

  if (!document.querySelector('link[href*="/assets/feathly-theme.css"]')) {
    const theme = document.createElement('link');
    theme.rel = 'stylesheet';
    theme.href = '/assets/feathly-theme.css?v=20260805-contrast1';
    document.head.appendChild(theme);
  }
  if (!document.querySelector('link[href$="navigation.css"]')) {
    const navigation = document.createElement('link');
    navigation.rel = 'stylesheet';
    navigation.href = '/assets/navigation.css';
    document.head.appendChild(navigation);
  }

  if (params.get('embedded') === '1') {
    document.documentElement.classList.add('embedded');
    document.body.classList.add('embedded');
  }

  const labels = currentLocale === 'ko'
    ? {
        home: '홈',
        planner: 'Smart Planner',
        guide: '사용자 설명서',
        download: '다운로드',
        build: '빌드 기록',
        support: '지원',
        community: '커뮤니티',
        menu: '메뉴',
        openMenu: '사이트 메뉴 열기',
        primary: '주요 메뉴',
        mobile: '모바일 메뉴',
        language: '언어',
      }
    : {
        home: 'Home',
        planner: 'Smart Planner',
        guide: 'User Guide',
        download: 'Download',
        build: 'Build History',
        support: 'Support',
        community: 'Community',
        menu: 'Menu',
        openMenu: 'Open site menu',
        primary: 'Primary navigation',
        mobile: 'Mobile navigation',
        language: 'Language',
      };

  const links = currentLocale === 'ko'
    ? [
        ['/ko/', labels.home],
        ['/ko/smart-planner/', labels.planner],
        ['/ko/smart-planner/download.html', labels.download],
        ['/ko/smart-planner/build-history.html', labels.build],
        ['/ko/smart-planner/support.html', labels.support],
        ['/community/', labels.community],
      ]
    : [
        ['/', labels.home],
        ['/smart-planner/', labels.planner],
        ['/smart-planner/download.html', labels.download],
        ['/smart-planner/build-history.html', labels.build],
        ['/smart-planner/support.html', labels.support],
        ['/community/', labels.community],
      ];

  const navLinks = document.querySelector('.nav-links');
  const linksMarkup = links.map(([href, label]) => `<a href="${href}">${label}</a>`).join('');
  if (navLinks) {
    navLinks.setAttribute('aria-label', labels.primary);
    navLinks.innerHTML = linksMarkup;
  }

  const headerNav = document.querySelector('.site-header .nav');
  if (headerNav && !headerNav.querySelector('.language-switcher')) {
    const languageSwitcher = document.createElement('label');
    languageSwitcher.className = 'language-switcher';
    languageSwitcher.innerHTML = `<span class="sr-only">${labels.language}</span><select aria-label="${labels.language}"><option value="en">English</option><option value="ko">한국어</option></select>`;
    const languageSelect = languageSwitcher.querySelector('select');
    languageSelect.value = currentLocale;
    languageSelect.addEventListener('change', () => {
      const nextLocale = languageSelect.value;
      window.localStorage.setItem('feathly-language', nextLocale);
      window.location.assign(buildLocalizedUrl(localizedPathFor(nextLocale)));
    });
    headerNav.appendChild(languageSwitcher);
  }

  if (headerNav && !headerNav.querySelector('.mobile-nav')) {
    const mobileNav = document.createElement('details');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `<summary aria-label="${labels.openMenu}">${labels.menu}</summary><nav class="mobile-nav-panel" aria-label="${labels.mobile}">${linksMarkup}</nav>`;
    headerNav.appendChild(mobileNav);
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileNav.removeAttribute('open'));
    });
  }

  const foot = document.querySelector('footer .foot');
  if (foot) {
    const brand = foot.querySelector('div:first-child');
    if (brand) brand.classList.add('foot-brand');
    const groups = currentLocale === 'ko'
      ? [
          [
            ['다운로드', '/ko/smart-planner/download.html'],
            ['빌드 기록', '/ko/smart-planner/build-history.html'],
          ],
          [
            ['지원', '/ko/smart-planner/support.html'],
            ['FAQ', '/ko/smart-planner/faq.html'],
          ],
          [
            ['개인정보 처리방침', '/ko/smart-planner/privacy.html'],
            ['이용약관', '/ko/smart-planner/terms.html'],
            ['환불 정책', '/ko/smart-planner/refund.html'],
          ],
        ]
      : [
          [
            ['Learning Science', '/smart-planner/learning-science.html'],
            ['Download', '/smart-planner/download.html'],
            ['Build History', '/smart-planner/build-history.html'],
          ],
          [
            ['Support', '/smart-planner/support.html'],
            ['FAQ', '/smart-planner/faq.html'],
          ],
          [
            ['Privacy', '/smart-planner/privacy.html'],
            ['Terms', '/smart-planner/terms.html'],
            ['Refund', '/smart-planner/refund.html'],
          ],
        ];
    const grouped = document.createElement('div');
    grouped.className = 'footer-link-groups';
    grouped.innerHTML = groups.map((group) => `<div class="footer-link-group">${group.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}</div>`).join('');
    const oldLinks = foot.querySelector('div:last-child');
    if (oldLinks) oldLinks.replaceWith(grouped);
    else foot.appendChild(grouped);
  }

  if (path === '/smart-planner/user-guide.html') {
    const homeSection = document.querySelector('#home');
    if (homeSection) {
      homeSection.querySelectorAll('figure.guide-shot').forEach((figure) => figure.remove());
      const figure = document.createElement('figure');
      figure.className = 'guide-shot';
      const image = document.createElement('img');
      image.src = '/assets/user-guide/80e063a9-4c8a-48bc-81e1-47865585a72b.png';
      image.alt = 'Feathly Home screen with NOW, TODAY and LATER sections highlighted';
      image.loading = 'eager';
      figure.appendChild(image);
      const caption = document.createElement('figcaption');
      caption.textContent = 'NOW shows items ready now, TODAY shows items scheduled later today, and LATER shows items scheduled after today.';
      figure.appendChild(caption);
      homeSection.appendChild(figure);
    }
  }

  const legacyShortName = String.fromCharCode(80, 79, 68, 79);
  const legacyLongName = String.fromCharCode(80, 111, 109, 111, 100, 111, 114, 111);
  const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const shortNamePattern = escapeRegExp(legacyShortName);
  const focusSlashPattern = new RegExp(`Focus\\s*\\/\\s*${shortNamePattern}`, 'gi');
  const longNamePattern = new RegExp(escapeRegExp(legacyLongName), 'gi');
  const shortNameOnlyPattern = new RegExp(shortNamePattern, 'gi');

  const normalizeFocusTimerTerminology = (value) => value
    .replace(focusSlashPattern, 'Focus Timer')
    .replace(longNamePattern, 'Focus Timer')
    .replace(shortNameOnlyPattern, 'Focus Timer');

  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (textWalker.nextNode()) textNodes.push(textWalker.currentNode);
  textNodes.forEach((node) => {
    const parentTag = node.parentElement?.tagName;
    if (parentTag === 'SCRIPT' || parentTag === 'STYLE') return;
    const normalized = normalizeFocusTimerTerminology(node.nodeValue || '');
    if (normalized !== node.nodeValue) node.nodeValue = normalized;
  });

  document.querySelectorAll('[title], [aria-label], [alt]').forEach((element) => {
    ['title', 'aria-label', 'alt'].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const current = element.getAttribute(attribute) || '';
      element.setAttribute(attribute, normalizeFocusTimerTerminology(current));
    });
  });
  document.title = normalizeFocusTimerTerminology(document.title);
});

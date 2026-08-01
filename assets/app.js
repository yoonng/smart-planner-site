document.addEventListener('DOMContentLoaded', function () {
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

  const path = window.location.pathname;
  const isCommunityPage = path.includes('/community/');
  const isSmartPlannerPage = path.includes('/smart-planner/');
  const isRootPage = !isCommunityPage && !isSmartPlannerPage;
  const assetPrefix = isRootPage ? 'assets/' : '../assets/';
  const themePath = `${assetPrefix}feathly-theme.css`;
  if (!document.querySelector('link[href$="feathly-theme.css"]')) {
    const theme = document.createElement('link');
    theme.rel = 'stylesheet';
    theme.href = themePath;
    document.head.appendChild(theme);
  }
  if (!document.querySelector('link[href$="navigation.css"]')) {
    const navigation = document.createElement('link');
    navigation.rel = 'stylesheet';
    navigation.href = `${assetPrefix}navigation.css`;
    document.head.appendChild(navigation);
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('embedded') === '1') {
    document.documentElement.classList.add('embedded');
    document.body.classList.add('embedded');
  }

  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    const links = isRootPage
      ? [
          ['index.html', 'Home'],
          ['smart-planner/', 'Smart Planner'],
          ['smart-planner/user-guide.html', 'User Guide'],
          ['smart-planner/download.html', 'Download'],
          ['smart-planner/build-history.html', 'Build History'],
          ['smart-planner/support.html', 'Support'],
          ['community/', 'Community'],
        ]
      : isCommunityPage
        ? [
            ['../index.html', 'Home'],
            ['../smart-planner/', 'Smart Planner'],
            ['../smart-planner/user-guide.html', 'User Guide'],
            ['../smart-planner/download.html', 'Download'],
            ['../smart-planner/build-history.html', 'Build History'],
            ['../smart-planner/support.html', 'Support'],
            ['index.html', 'Community'],
          ]
        : [
            ['../index.html', 'Home'],
            ['index.html', 'Smart Planner'],
            ['user-guide.html', 'User Guide'],
            ['download.html', 'Download'],
            ['build-history.html', 'Build History'],
            ['support.html', 'Support'],
            ['../community/', 'Community'],
          ];

    const linksMarkup = links.map(([href, label]) => `<a href="${href}">${label}</a>`).join('');
    navLinks.innerHTML = linksMarkup;

    const headerNav = document.querySelector('.site-header .nav');
    if (headerNav && !headerNav.querySelector('.mobile-nav')) {
      const mobileNav = document.createElement('details');
      mobileNav.className = 'mobile-nav';
      mobileNav.innerHTML = `<summary aria-label="Open site menu">Menu</summary><nav class="mobile-nav-panel" aria-label="Mobile navigation">${linksMarkup}</nav>`;
      headerNav.appendChild(mobileNav);
      mobileNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => mobileNav.removeAttribute('open'));
      });
    }
  }

  const foot = document.querySelector('footer .foot');
  if (foot) {
    const prefix = isRootPage ? 'smart-planner/' : isCommunityPage ? '../smart-planner/' : '';
    const brand = foot.querySelector('div:first-child');
    if (brand) brand.classList.add('foot-brand');
    const groups = [
      [
        ['User Guide', `${prefix}user-guide.html`],
        ['Learning Science', `${prefix}learning-science.html`],
        ['Download', `${prefix}download.html`],
        ['Build History', `${prefix}build-history.html`],
      ],
      [
        ['Support', `${prefix}support.html`],
        ['FAQ', `${prefix}faq.html`],
      ],
      [
        ['Privacy', `${prefix}privacy.html`],
        ['Terms', `${prefix}terms.html`],
        ['Refund', `${prefix}refund.html`],
      ],
    ];
    const grouped = document.createElement('div');
    grouped.className = 'footer-link-groups';
    grouped.innerHTML = groups.map((group) => `<div class="footer-link-group">${group.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}</div>`).join('');
    const oldLinks = foot.querySelector('div:last-child');
    if (oldLinks) oldLinks.replaceWith(grouped);
    else foot.appendChild(grouped);
  }

  const normalizeFocusTimerTerminology = (value) => value
    .replace(/Focus\s*\/\s*PODO/gi, 'Focus Timer')
    .replace(/Pomodoro/gi, 'Focus Timer')
    .replace(/PODO/gi, 'Focus Timer');

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

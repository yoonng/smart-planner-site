document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  if (params.get('embedded') === '1') {
    document.documentElement.classList.add('embedded');
    document.body.classList.add('embedded');
  }

  const path = window.location.pathname;
  const isCommunityPage = path.includes('/community/');
  const isSmartPlannerPage = path.includes('/smart-planner/');
  const isRootPage = !isCommunityPage && !isSmartPlannerPage;

  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    const links = isRootPage
      ? [
          ['index.html', 'Home'],
          ['smart-planner/', 'Smart Planner'],
          ['smart-planner/download.html', 'Download'],
          ['smart-planner/build-history.html', 'Build History'],
          ['community/', 'Community'],
        ]
      : isCommunityPage
        ? [
            ['../index.html', 'Home'],
            ['../smart-planner/', 'Smart Planner'],
            ['../smart-planner/download.html', 'Download'],
            ['../smart-planner/build-history.html', 'Build History'],
            ['index.html', 'Community'],
          ]
        : [
            ['../index.html', 'Home'],
            ['index.html', 'Smart Planner'],
            ['download.html', 'Download'],
            ['build-history.html', 'Build History'],
            ['../community/', 'Community'],
          ];

    navLinks.innerHTML = links.map(([href, label]) => `<a href="${href}">${label}</a>`).join('');
  }

  const foot = document.querySelector('footer .foot');
  if (foot) {
    const prefix = isRootPage ? 'smart-planner/' : isCommunityPage ? '../smart-planner/' : '';
    const brand = foot.querySelector('div:first-child');
    if (brand) brand.classList.add('foot-brand');

    const groups = [
      [
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
    grouped.innerHTML = groups.map((group) => {
      return `<div class="footer-link-group">${group.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}</div>`;
    }).join('');

    const oldLinks = foot.querySelector('div:last-child');
    if (oldLinks) oldLinks.replaceWith(grouped);
    else foot.appendChild(grouped);
  }
});
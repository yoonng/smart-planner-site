document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  if (params.get('embedded') === '1') {
    document.documentElement.classList.add('embedded');
    document.body.classList.add('embedded');
  }

  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  const path = window.location.pathname;
  const isRootPage = path.endsWith('/') || path.endsWith('/index.html') && !path.includes('/smart-planner/') && !path.includes('/community/');
  const isCommunityPage = path.includes('/community/');

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
});
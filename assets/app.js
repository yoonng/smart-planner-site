document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  if (params.get('embedded') === '1') {
    document.documentElement.classList.add('embedded');
    document.body.classList.add('embedded');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('.guide-content img'));
  if (!images.length) return;

  const zoom = document.createElement('div');
  zoom.className = 'guide-image-zoom';
  zoom.setAttribute('role', 'dialog');
  zoom.setAttribute('aria-modal', 'true');
  zoom.setAttribute('aria-label', 'Larger guide image');

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close larger image');
  closeButton.textContent = '×';

  const largeImage = document.createElement('img');
  zoom.append(closeButton, largeImage);
  document.body.appendChild(zoom);

  let previousFocus = null;

  const closeZoom = () => {
    if (!zoom.classList.contains('is-open')) return;
    zoom.classList.remove('is-open');
    document.body.classList.remove('guide-zoom-open');
    largeImage.removeAttribute('src');
    previousFocus?.focus();
  };

  const openZoom = (image) => {
    previousFocus = image;
    largeImage.src = image.currentSrc || image.src;
    largeImage.alt = image.alt || 'Guide image';
    zoom.classList.add('is-open');
    document.body.classList.add('guide-zoom-open');
    closeButton.focus();
  };

  images.forEach((image) => {
    image.classList.add('is-zoomable');
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Open larger image: ${image.alt || 'guide image'}`);
    image.addEventListener('click', () => openZoom(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openZoom(image);
      }
    });
  });

  closeButton.addEventListener('click', closeZoom);
  zoom.addEventListener('click', (event) => {
    if (event.target === zoom) closeZoom();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeZoom();
  });
});

window.addEventListener('dblclick', (e) => {
  console.log(e.target.parentElement);
  const el = e.target;
  const parentEl = el.parentElement;

  if (parentEl.previousSibling?.tagName === 'VIDEO') {
    parentEl.style.display = 'none';
    const video = parentEl.previousSibling;
    video.controls = true;
    video.play();
  }

  if (el.classList.contains('_aagw')) {
    const img = el.previousSibling?.querySelector('img')?.src;
    if (img) {
      window.open(img, '_blank');
    }
  }
});

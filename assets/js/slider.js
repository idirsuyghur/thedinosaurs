document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dotsWrap = document.querySelector('.slider-dots');
  const prev = document.querySelector('[data-slider="prev"]');
  const next = document.querySelector('[data-slider="next"]');
  if (!slides.length || !dotsWrap) return;

  let current = 0;
  let timer;

  function renderDots() {
    dotsWrap.innerHTML = slides
      .map((_, i) => `<button class="slider-dot ${i === current ? 'active' : ''}" data-index="${i}" aria-label="slide ${i + 1}"></button>`)
      .join('');
  }

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    renderDots();
  }

  function start() {
    clearInterval(timer);
    timer = setInterval(() => show(current + 1), 5000);
  }

  dotsWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.slider-dot');
    if (!btn) return;
    show(Number(btn.dataset.index));
    start();
  });

  prev?.addEventListener('click', () => {
    show(current - 1);
    start();
  });

  next?.addEventListener('click', () => {
    show(current + 1);
    start();
  });

  show(0);
  start();
});

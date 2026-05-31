/* Serramenti Brescia — interactions */
(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const mobile = document.getElementById('navMobile');

  /* Nav background on scroll */
  const onScroll = () => {
    if (window.scrollY > 10) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu toggle */
  const closeMenu = () => {
    burger.setAttribute('aria-expanded', 'false');
    mobile.classList.remove('is-open');
  };
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    mobile.classList.toggle('is-open', !open);
  });
  mobile.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  /* Reveal on scroll */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* Stagger product / gallery / card reveals slightly for polish */
  document.querySelectorAll('.product-grid, .why-grid, .gallery, .stats').forEach((grid) => {
    Array.from(grid.children).forEach((child, i) => {
      if (child.classList.contains('reveal')) {
        child.style.transitionDelay = (i * 80) + 'ms';
      }
    });
  });
})();

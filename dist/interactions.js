(() => {
  const motion = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  const links = document.querySelectorAll('[data-magnetic]');
  const reset = link => {
    link.style.removeProperty('--magnet-x');
    link.style.removeProperty('--magnet-y');
  };
  links.forEach(link => {
    link.addEventListener('pointermove', event => {
      if (!motion.matches || event.pointerType === 'touch' || link.matches(':focus-visible')) return;
      const box = link.getBoundingClientRect();
      const cap = link.classList.contains('contact-arrow') ? 9 : 5;
      const x = Math.max(-cap, Math.min(cap, (event.clientX - box.left - box.width / 2) * .12));
      const y = Math.max(-cap, Math.min(cap, (event.clientY - box.top - box.height / 2) * .12));
      link.style.setProperty('--magnet-x', `${x}px`);
      link.style.setProperty('--magnet-y', `${y}px`);
    }, { passive:true });
    ['pointerleave','pointercancel','blur','click'].forEach(type => link.addEventListener(type, () => reset(link)));
    link.addEventListener('focus', () => reset(link));
  });
  motion.addEventListener('change', () => links.forEach(reset));
})();

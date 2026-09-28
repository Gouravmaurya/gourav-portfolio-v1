(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  const animate = (el, frames, options) => {
    const animation = el.animate(frames, options);
    active.add(animation);
    animation.finished.catch(() => {}).finally(() => { active.delete(animation); animation.cancel(); });
  };
  // One gentle opening; no scroll lock or loading gate.
  if (!reduced.matches && Element.prototype.animate && !location.hash) {
    animate(document.querySelector('.hero-portrait'), [{opacity:.3,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}], {duration:700,easing:'cubic-bezier(.16,1,.3,1)'});
    animate(document.querySelector('.hero-copy'), [{opacity:.6},{opacity:1}], {duration:550,easing:'linear'});
  }
  reduced.addEventListener('change', () => { if(reduced.matches) active.forEach(a => a.cancel()); });
  // Native disclosures keep project context in place and remain usable without JS.
  document.querySelectorAll('details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      if (detail.open && !reduced.matches && Element.prototype.animate) {
        animate(detail.querySelector('.project-detail'), [{opacity:.3},{opacity:1}], {duration:200,easing:'linear'});
      }
    });
  });
  const copy=document.querySelector('#copy-email');
  const status=document.querySelector('#copy-status');
  let reset;
  copy.addEventListener('click', async () => {
    clearTimeout(reset);
    try {
      await navigator.clipboard.writeText('gouravmaurya351@gmail.com');
      copy.textContent='Copied'; status.textContent='Email copied to clipboard.';
      reset=setTimeout(()=>{copy.textContent='Copy email';status.textContent='';},3000);
    } catch { status.textContent='Copy unavailable. Select the address or use the email link.'; }
  });
})();

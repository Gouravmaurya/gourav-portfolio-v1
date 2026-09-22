const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('anuragmaurya51489@gmail.com');
    copyStatus.textContent = 'Email copied';
    copyButton.textContent = 'Copied ✓';
    setTimeout(() => { copyButton.textContent = 'Copy email ↗'; copyStatus.textContent = ''; }, 3000);
  } catch {
    copyStatus.textContent = 'Please select and copy the email address, or use the email link.';
  }
});

/* Motion: sticky header, opening sequence, scroll reveals, one delighter.
   Nothing here changes layout or content. */
(() => {
  const root = document.documentElement;

  /* The sticky header needs its backdrop the moment the page leaves the top:
     content scrolling under a transparent nav is unreadable. That is
     legibility, not decoration, so it runs before the reduced-motion gate. */
  addEventListener('scroll', () => root.classList.toggle('stuck', scrollY > 4), { passive: true });

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { root.classList.remove('intro'); return; }

  /* --- Scroll reveals: play once, stay put --- */
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });

  const mark = (sel, { scope = document, cls = 'r', base = 0, step = 0, soft = false } = {}) =>
    scope.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add(cls);
      if (soft) el.classList.add('r-soft');
      if (base || step) el.style.setProperty('--mo-d', `${base + i * step}ms`);
      io.observe(el);
    });

  mark('.work .section-heading h2 .r-line, .work .section-heading h2 > span', { step: 90, soft: true });
  mark('.work-intro', { base: 120 });
  /* A card reveals as one object: artwork, then its text. */
  document.querySelectorAll('.project').forEach(p => {
    mark('.project-kicker', { scope: p });
    mark('.project-image', { scope: p, cls: 'r-img' });
    mark('.project-heading, .project-description, .tags', { scope: p, base: 120 });
  });
  mark('.all-work');
  mark('.about-photo');
  mark('.about-copy', { base: 130 });
  mark('.expertise h3', { soft: true });
  mark('.skill-row', { base: 60, step: 90 });
  mark('.experience h2', { soft: true });
  mark('.timeline article', { base: 80, step: 110 });
  mark('.contact-main > p');
  mark('.contact-bottom', { base: 120 });

  /* --- Line-masked display type: two deliberate moments --- */
  const lineMask = el => {
    if (!el) return;
    /* Freeze the inherited colours first: wrapping breaks the direct-child
       selectors the accent colours are written against. */
    el.querySelectorAll('*').forEach(n => { n.style.color = getComputedStyle(n).color; });
    const lines = [[]];
    [...el.childNodes].forEach(n => n.nodeName === 'BR' ? lines.push([]) : lines[lines.length - 1].push(n));
    el.textContent = '';
    lines.forEach((nodes, i) => {
      const outer = document.createElement('span'), inner = document.createElement('span');
      outer.className = 'ln';
      outer.style.setProperty('--ln-d', `${i * 90}ms`);
      nodes.forEach(n => inner.appendChild(n));
      outer.appendChild(inner);
      el.appendChild(outer);
    });
    el.classList.add('lines');
    io.observe(el);
  };
  lineMask(document.querySelector('.contact-main h2'));

  /* --- One delighter, at the end of the page where it is earned --- */
  const arrow = document.querySelector('.contact-arrow');
  const zone = document.querySelector('.contact-main');
  if (arrow && zone && matchMedia('(pointer: fine)').matches) {
    const REACH = 130, MAX = 8;
    zone.addEventListener('pointermove', e => {
      const b = arrow.getBoundingClientRect();
      const dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      if (d > REACH) return void (arrow.style.transform = '');
      const pull = MAX * (1 - d / REACH);
      arrow.style.transform = `translate(${dx / d * pull}px,${dy / d * pull}px)`;
    }, { passive: true });
    zone.addEventListener('pointerleave', () => { arrow.style.transform = ''; });
  }

  /* --- Opening sequence --- */
  if (!root.classList.contains('intro')) return;
  const fig = document.querySelector('.hero-photo');
  const img = fig && fig.querySelector('img');
  if (!img || scrollY > 0) { root.classList.remove('intro'); return; }
  try { sessionStorage.introSeen = '1'; } catch {}

  const HOLD = 300, DUR = 980;
  const SKIP_ON = ['wheel', 'touchmove', 'keydown', 'pointerdown', 'scroll', 'resize'];
  const anims = [];
  let skipBtn = null, over = false;

  const finish = () => {
    if (over) return;
    over = true;
    anims.forEach(a => a.cancel());
    root.classList.remove('intro', 'intro-go', 'intro-reveal');
    if (skipBtn) skipBtn.remove();
    SKIP_ON.forEach(t => removeEventListener(t, finish));
  };

  const start = () => {
    /* The head failsafe may have already released the page (e.g. a tab left in the
       background, where rAF never fires): then the sequence is simply skipped. */
    if (over || !root.classList.contains('intro')) return;
    const r = fig.getBoundingClientRect();
    const vw = innerWidth, vh = innerHeight;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    if (!r.width || !r.height || !iw || !ih) return finish();

    /* Where the photo sits now (object-fit: cover, in its hero box) ... */
    const pos = getComputedStyle(img).objectPosition.split(' ').map(v => parseFloat(v) / 100);
    const ox = isNaN(pos[0]) ? .5 : pos[0], oy = isNaN(pos[1]) ? .38 : pos[1];
    const sf = Math.max(r.width / iw, r.height / ih);
    const x1 = r.left + (r.width - iw * sf) * ox, y1 = r.top + (r.height - ih * sf) * oy;
    /* ... and where it starts: covering the viewport, framed on the face.
       FACE/AIM are calibrated to this photo — retune them if the portrait changes.
       A phone's viewport is far taller than the photo, so it needs a tighter crop. */
    const FACE = .24, AIM = .32, zoom = vw < 700 ? 1.45 : 1;
    const s0 = Math.max(vw / iw, vh / ih) * zoom;
    const x0 = (vw - iw * s0) * .5;
    const y0 = Math.min(0, Math.max(vh - ih * s0, AIM * vh - FACE * ih * s0));
    /* Uniform scale, so the portrait is cropped and never stretched. */
    const k = s0 / sf;
    const tx = x0 - r.left - k * (x1 - r.left), ty = y0 - r.top - k * (y1 - r.top);
    /* The window opens to the whole viewport; closing it back to inset(0) lands
       on the untouched hero layout, so the handover is exact. */
    const open = `inset(${-r.top}px ${r.right - vw}px ${r.bottom - vh}px ${-r.left}px)`;

    const opts = { duration: DUR, delay: HOLD, easing: 'cubic-bezier(.62,0,.24,1)', fill: 'both' };
    anims.push(fig.animate([{ clipPath: open }, { clipPath: 'inset(0px)' }], opts));
    anims.push(img.animate([{ transform: `translate(${tx}px,${ty}px) scale(${k})` }, { transform: 'none' }], opts));
    root.classList.add('intro-go');

    skipBtn = document.createElement('button');
    skipBtn.type = 'button';
    skipBtn.className = 'intro-skip';
    skipBtn.textContent = 'SKIP';
    skipBtn.addEventListener('click', finish);
    document.body.appendChild(skipBtn);
    SKIP_ON.forEach(t => addEventListener(t, finish, { passive: true }));

    setTimeout(() => !over && root.classList.add('intro-reveal'), HOLD + DUR * .55);
    setTimeout(finish, HOLD + DUR + 1000);
  };

  /* Wait for the photo and the display typefaces, not for a made-up timer. */
  const ready = Promise.all([img.decode().catch(() => {}), document.fonts && document.fonts.ready]);
  Promise.race([ready, new Promise(r => setTimeout(r, 1500))]).then(() => requestAnimationFrame(start));
})();

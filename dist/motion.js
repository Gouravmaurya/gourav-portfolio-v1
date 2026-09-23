/* Motion system.
   Lenis owns the scroll. GSAP owns everything scroll-linked. Motion owns pointer
   springs. Each library has one job so they never animate the same property.

   Note the reveals use gsap.set()/gsap.to() rather than CSS opacity:0 — if this
   script fails to load, the page is fully visible rather than blank. */
(() => {
  const { gsap, ScrollTrigger, SplitText, Lenis } = window;
  const root = document.documentElement;

  /* The sticky header needs its backdrop the moment the page leaves the top:
     content under a transparent header is unreadable. That is legibility, not
     decoration, so it is wired before any motion gate and never disabled. */
  addEventListener('scroll', () => root.classList.toggle('stuck', scrollY > 4), { passive: true });

  if (!gsap || !ScrollTrigger || !Lenis) { root.classList.remove('intro'); return; }
  gsap.registerPlugin(ScrollTrigger);
  if (SplitText) gsap.registerPlugin(SplitText);

  /* --- Lenis owns the scroll, GSAP's ticker drives it --- */
  /* Lenis wraps the real window scroll, so position:sticky and IntersectionObserver
     keep working and ScrollTrigger needs no scrollerProxy — just this sync. */
  const lenis = new Lenis({ autoRaf: false, duration: 1.05 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  /* Anchors route through Lenis so they land clear of the sticky header. */
  const headerOffset = () => (innerWidth <= 600 ? 74 : 90) + 14;
  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -headerOffset() });
  }));

  /* --- Opening sequence --------------------------------------------------- */
  /* html.intro is set by the inline head script before first paint. The geometry
     below is the verified maths from the previous implementation, ported onto a
     GSAP timeline: the figure's clip window opens to the whole viewport while the
     image scales uniformly, so the portrait is cropped and never stretched, and
     the last frame lands on the untouched hero layout. */
  const fig = document.querySelector('.hero-photo');
  const heroImg = fig && fig.querySelector('img');
  const runIntro = root.classList.contains('intro') && heroImg && scrollY === 0;

  if (root.classList.contains('intro') && !runIntro) root.classList.remove('intro');

  const introDone = () => {
    root.classList.remove('intro', 'intro-go');
    lenis.start();
  };

  if (runIntro) {
    try { sessionStorage.introSeen = '1'; } catch {}
    lenis.stop();

    const HOLD = 0.3, DUR = 0.98;
    let skipBtn = null, tl = null, over = false;

    const finish = () => {
      /* progress(1) fires the timeline's own onComplete, which lands back here —
         the guard is what stops that re-entry from running finish twice. */
      if (over) return;
      over = true;
      if (tl) { tl.progress(1); tl.kill(); tl = null; }
      gsap.set([fig, heroImg], { clearProps: 'all' });
      introDone();
      if (skipBtn) { skipBtn.remove(); skipBtn = null; }
      SKIP_ON.forEach(t => removeEventListener(t, finish));
    };
    const SKIP_ON = ['wheel', 'touchmove', 'keydown', 'pointerdown', 'resize'];

    const start = () => {
      if (over || !root.classList.contains('intro')) return;
      const r = fig.getBoundingClientRect();
      const vw = innerWidth, vh = innerHeight;
      const iw = heroImg.naturalWidth, ih = heroImg.naturalHeight;
      if (!r.width || !r.height || !iw || !ih) return finish();

      /* Where the photo rests now (object-fit: cover in its hero box) ... */
      const pos = getComputedStyle(heroImg).objectPosition.split(' ').map(v => parseFloat(v) / 100);
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
      const k = s0 / sf;
      const tx = x0 - r.left - k * (x1 - r.left), ty = y0 - r.top - k * (y1 - r.top);
      const open = `inset(${-r.top}px ${r.right - vw}px ${r.bottom - vh}px ${-r.left}px)`;

      const ease = 'power3.inOut';
      tl = gsap.timeline({ onComplete: finish });
      tl.fromTo(fig, { clipPath: open }, { clipPath: 'inset(0px)', duration: DUR, ease }, HOLD)
        .fromTo(heroImg,
          { x: tx, y: ty, scale: k, transformOrigin: '0 0' },
          { x: 0, y: 0, scale: 1, duration: DUR, ease }, HOLD);

      root.classList.add('intro-go');

      /* The hero settles in as the space opens. */
      const stage = [
        ['.nav', 0], ['.hero-top', .05], ['#hero-title', .11], ['.hero-intro', .19],
        ['.hero-aside', .25], ['.hero-photo figcaption', .25], ['.hero-bottom', .31],
        ['.surname', .38],
      ];
      const settle = HOLD + DUR * .55;
      stage.forEach(([sel, d]) => {
        const el = document.querySelector(sel);
        if (el) tl.to(el, { opacity: 1, y: 0, duration: .55, ease: 'power2.out' }, settle + d);
      });

      skipBtn = document.createElement('button');
      skipBtn.type = 'button';
      skipBtn.className = 'intro-skip';
      skipBtn.textContent = 'SKIP';
      skipBtn.addEventListener('click', finish);
      document.body.appendChild(skipBtn);
      SKIP_ON.forEach(t => addEventListener(t, finish, { passive: true }));
    };

    /* Wait for the photo and the display typefaces, not for a made-up timer. */
    const ready = Promise.all([heroImg.decode().catch(() => {}), document.fonts && document.fonts.ready]);
    Promise.race([ready, new Promise(r => setTimeout(r, 1500))]).then(() => requestAnimationFrame(start));
  } else {
    lenis.start();
  }

  /* --- Scroll choreography ------------------------------------------------ */
  /* Everything below is gated on no-preference. The site's global
     *{transition:none} reduced-motion rule does NOT cover GSAP tweens, so this
     matchMedia is the only thing standing between a reduced-motion user and a
     pinned, scrubbed page. */
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const rise = (targets, opts = {}) => {
      const els = gsap.utils.toArray(targets);
      if (!els.length) return;
      const y = innerWidth <= 600 ? 14 : 22;
      gsap.set(els, { opacity: 0, y, ...(opts.setVars || {}) });
      ScrollTrigger.batch(els, {
        start: 'top 92%',
        once: true,
        onEnter: batch => gsap.to(batch, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: opts.duration || .5,
          stagger: opts.stagger != null ? opts.stagger : .09,
          ease: 'power3.out',
          overwrite: true,
        }),
      });
    };

    /* Display headings come into focus rather than sliding. */
    const soft = { setVars: { filter: 'blur(6px)' } };

    rise('.work .section-heading h2 .r-line, .work .section-heading h2 > span', soft);
    rise('.work-intro');
    document.querySelectorAll('.project').forEach(p => {
      /* A card reveals as one object: artwork, then its text. */
      rise([p.querySelector('.project-kicker'), p.querySelector('.project-image')].filter(Boolean), { stagger: .06 });
      rise(p.querySelectorAll('.project-heading, .project-description, .tags'), { stagger: 0 });
    });
    rise('.all-work');
    rise('.about-photo');
    rise('.about-copy');
    rise('.expertise h3', soft);
    rise('.skill-row');
    rise('.experience h2', soft);
    rise('.timeline article');
    rise('.contact-main > p');
    rise('.contact-main h2', soft);
    rise('.contact-bottom');
    /* No cleanup function needed: gsap.matchMedia() reverts every tween and
       ScrollTrigger created inside this scope when the query stops matching. */
  });
})();

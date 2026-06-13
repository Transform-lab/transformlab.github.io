/* ============================================================
   Transform·Lab — JS principal (vanilla, sin dependencias)
   ============================================================ */

(function () {
  'use strict';

  /* ─── NAV: clase .scrolled al hacer scroll ─── */
  const nav = document.getElementById('siteNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ─── CURSOR GLOW (solo desktop) ─── */
  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    let visible = false;
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
      if (!visible) { glow.style.opacity = '1'; visible = true; }
    }, { passive: true });
    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; visible = false; });
  }

  /* ─── REVEAL — las animaciones son CSS puro, no se necesita JS ─── */

  /* ─── FAQ ACORDEÓN ─── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Cierra todos
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Abre el pulsado si estaba cerrado
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ─── SCROLL STORYTELLING + CROSSFADE DE VÍDEOS ─── */
  (function initStory() {
    const phases      = document.querySelectorAll('.story-phase');
    const storyPanels = document.getElementById('storyPanels');
    if (!phases.length || !storyPanels) return;

    /* TODO: ajusta estos valores si cambias el objetivo/peso del reto */
    const phaseData = [
      { weightPct: 0,   fianza: 0,   weightLabel: '95 kg' },
      { weightPct: 20,  fianza: 50,  weightLabel: '94 kg' },
      { weightPct: 60,  fianza: 125, weightLabel: '92 kg' },
      { weightPct: 100, fianza: 199, weightLabel: '90 kg' },
    ];

    const weightBar    = document.getElementById('weightBar');
    const weightDisp   = document.getElementById('weightDisplay');
    const fianzaAmount = document.getElementById('fianzaAmount');

    function setPhase(idx) {
      phases.forEach((p, i) => p.classList.toggle('active', i === idx));
      const d = phaseData[idx];
      if (weightBar)    weightBar.style.width       = d.weightPct + '%';
      if (weightDisp)   weightDisp.textContent      = d.weightLabel;
      if (fianzaAmount) fianzaAmount.textContent    = d.fianza + ' €';
    }

    // Desktop: IntersectionObserver por fase
    if (window.innerWidth >= 769) {
      const phaseObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setPhase(parseInt(e.target.dataset.phase));
        });
      }, { threshold: 0.5 });
      phases.forEach(p => phaseObs.observe(p));
    }

    setPhase(0); // estado inicial

    /* ─── Crossfade de vídeos según scroll ─── */
    const videoVolumen  = document.getElementById('videoVolumen');
    const videoAtletico = document.getElementById('videoAtletico');

    if (videoVolumen && videoAtletico) {
      function updateCrossfade() {
        const rect        = storyPanels.getBoundingClientRect();
        const totalHeight = storyPanels.offsetHeight - window.innerHeight;
        const scrolled    = Math.max(0, -rect.top);
        const progress    = Math.min(1, scrolled / totalHeight); // 0 → 1

        // Ventana de crossfade: 45 % → 70 % del recorrido total
        const fadeStart = 0.45, fadeEnd = 0.70;
        const fade = Math.min(1, Math.max(0,
          (progress - fadeStart) / (fadeEnd - fadeStart)
        ));

        videoAtletico.style.opacity = fade;
        videoVolumen.style.opacity  = 1 - fade * 0.6;
      }

      window.addEventListener('scroll', updateCrossfade, { passive: true });
      updateCrossfade();
    }
  })();

  /* ─── PAUSA DE VÍDEOS cuando el hero sale de la vista ─── */
  (function initVideoPause() {
    const heroSection   = document.getElementById('hero');
    const videoVolumen  = document.getElementById('videoVolumen');
    const videoAtletico = document.getElementById('videoAtletico');
    const videos        = [videoVolumen, videoAtletico].filter(Boolean);
    if (!heroSection || !videos.length) return;

    // El panel sticky del avatar está en #story, no en #hero.
    // Pausamos cuando el panel sticky desaparece (usuario llega a #pricing y más abajo).
    const storyRight = document.getElementById('storyRight');
    const target     = storyRight || heroSection;

    const pauseObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        videos.forEach(v => {
          if (e.isIntersecting) {
            v.play().catch(() => {}); // autoplay puede estar bloqueado
          } else {
            v.pause();
          }
        });
      });
    }, { threshold: 0 });

    pauseObs.observe(target);
  })();

})();

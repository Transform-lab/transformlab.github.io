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

  /* ─── AVATAR: visibilidad + crossfade + fases ─── */
  (function initAvatar() {
    const storyRight = document.getElementById('storyRight');
    const videoV     = document.getElementById('videoVolumen');
    const videoA     = document.getElementById('videoAtletico');
    if (!storyRight || !videoV || !videoA) return;

    /* ── Mostrar/ocultar avatar según posición de scroll ── */
    const hero     = document.getElementById('hero');
    const finalCta = document.getElementById('final-cta');
    let heroGone = false, ctaVisible = false;

    function syncVisibility() {
      storyRight.classList.toggle('is-visible', heroGone && !ctaVisible);
    }

    if (hero) {
      new IntersectionObserver(([e]) => {
        heroGone = !e.isIntersecting;
        syncVisibility();
      }, { threshold: 0.15 }).observe(hero);
    }
    if (finalCta) {
      new IntersectionObserver(([e]) => {
        ctaVisible = e.isIntersecting;
        syncVisibility();
      }, { threshold: 0.15 }).observe(finalCta);
    }

    /* ── Rotación + crossfade sincronizados con el scroll ── */
    // En desktop: pausa los vídeos y controla el frame con currentTime
    const isDesktop = window.innerWidth >= 769;

    if (isDesktop) {
      // Elimina autoplay para que el scroll controle el frame
      videoV.removeAttribute('autoplay');
      videoA.removeAttribute('autoplay');
      videoV.loop = false;
      videoA.loop = false;
      videoV.pause();
      videoA.pause();
      // Segundo intento por si el navegador lo ha reanudado
      setTimeout(() => { videoV.pause(); videoA.pause(); }, 200);
    }

    function updateScroll() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress  = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;

      // Rotación: mapea el scroll al tiempo del vídeo (una vuelta completa)
      if (isDesktop) {
        if (videoV.duration) videoV.currentTime = progress * videoV.duration;
        if (videoA.duration) videoA.currentTime = progress * videoA.duration;
      }

      // Crossfade: de volumen (gordo) a atlético entre el 20 % y el 70 % del scroll
      const fade = Math.min(1, Math.max(0, (progress - 0.20) / (0.70 - 0.20)));
      videoA.style.opacity = fade;
      videoV.style.opacity = 1 - fade * 0.55;
    }

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    /* ── Fases de progreso (barra de peso + fianza) ── */
    const phases = document.querySelectorAll('.story-phase');
    if (!phases.length) return;

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
      if (weightBar)    weightBar.style.width    = d.weightPct + '%';
      if (weightDisp)   weightDisp.textContent   = d.weightLabel;
      if (fianzaAmount) fianzaAmount.textContent = d.fianza + ' €';
    }
    setPhase(0);

    if (window.innerWidth >= 769) {
      const phaseObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setPhase(parseInt(e.target.dataset.phase));
        });
      }, { threshold: 0.5 });
      phases.forEach(p => phaseObs.observe(p));
    }
  })();

})();

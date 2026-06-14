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

  /* ─── FAQ ACORDEÓN ─── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

})();

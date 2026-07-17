/* ───────────────────────────────────────────
   1. LENIS SMOOTH SCROLL
─────────────────────────────────────────── */
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.005 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 1.5,
    wheelMultiplier: 1,
    infinite: false,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

/* ───────────────────────────────────────────
   2. GSAP REGISTRATION + LENIS SYNC
─────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);
}

/* ───────────────────────────────────────────
   3. SMOOTH ANCHOR LINKS & RESERVE BUTTONS
─────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId === '#' || targetId.length < 2) return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -20, duration: 1.8 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Attach smooth scroll to reserve buttons by ID
const navReserveBtn = document.getElementById('navReserve');
const heroReserveBtn = document.getElementById('heroReserve');
const visitSection = document.getElementById('visit');

if (navReserveBtn && visitSection) {
  navReserveBtn.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(visitSection, { offset: -20, duration: 1.8 });
    else visitSection.scrollIntoView({ behavior: 'smooth' });
  });
}
if (heroReserveBtn && visitSection) {
  heroReserveBtn.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(visitSection, { offset: -20, duration: 1.8 });
    else visitSection.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ───────────────────────────────────────────
   4. HERO PARTICLES
─────────────────────────────────────────── */
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 24;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.max(1, Math.random() * 4 + 1);
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 12) + 's';
    p.style.animationDelay = (Math.random() * -20) + 's';
    p.style.opacity = Math.random() * 0.6 + 0.2;
    container.appendChild(p);
  }
})();

/* ───────────────────────────────────────────
   5. WEATHER WIDGET RAYS
─────────────────────────────────────────── */
(function createWeatherRays() {
  const rays = document.getElementById('weatherRays');
  if (!rays) return;
  for (let i = 0; i < 8; i++) {
    const ray = document.createElement('span');
    ray.style.transform = `translate(-50%, -50%) rotate(${i * 45}deg)`;
    rays.appendChild(ray);
  }
})();

/* ───────────────────────────────────────────
   6. HERO ENTRANCE ANIMATION
─────────────────────────────────────────── */
gsap.set('#heroKicker', { opacity: 0, y: 20 });
gsap.set('#heroTagline', { opacity: 0, y: 20 });

const heroTl = gsap.timeline({ delay: 0.4 });
heroTl
  .to('#heroKicker', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
  .from('#heroTitle', { opacity: 0, y: 80, duration: 1.8, ease: 'power4.out' }, '-=0.7')
  .to('#heroTagline', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.9')
  .to('#heroReserve', { opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.7');

/* ───────────────────────────────────────────
   7. HERO PARALLAX
─────────────────────────────────────────── */
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  gsap.to(heroBg, {
    yPercent: 25,
    scale: 1.12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
    }
  });
}

gsap.to('.hero-sun', {
  yPercent: 40,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5
  }
});

gsap.to('.hero-content', {
  yPercent: 15,
  opacity: 0.2,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5
  }
});

gsap.to('.hero-birds', {
  yPercent: -30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 2
  }
});

/* ───────────────────────────────────────────
   8. TAGLINES STAGGERED REVEAL
─────────────────────────────────────────── */
ScrollTrigger.batch('[data-stagger]', {
  start: 'top 85%',
  onEnter: (elements) => {
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: 'power3.out',
      stagger: 0.28
    });
  },
  once: true
});

/* ───────────────────────────────────────────
   9. INFO SECTION LINE DRAWING + ENTRANCE
─────────────────────────────────────────── */
document.querySelectorAll('.info-line path').forEach((path) => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  ScrollTrigger.create({
    trigger: path,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: 'power2.inOut'
      });
    },
    once: true
  });
});

gsap.from('.info-block', {
  y: 60,
  opacity: 0,
  duration: 1.2,
  stagger: 0.2,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.info',
    start: 'top 75%'
  }
});

/* ───────────────────────────────────────────
   10. MENU CARDS STAGGERED ENTRANCE
─────────────────────────────────────────── */
ScrollTrigger.batch('[data-menu-card]', {
  start: 'top 88%',
  onEnter: (elements) => {
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 1.3,
      ease: 'power3.out',
      stagger: 0.22
    });
  },
  once: true
});

gsap.from('.menu-title-block, .menu-description', {
  y: 50,
  opacity: 0,
  duration: 1.2,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.menu',
    start: 'top 75%'
  }
});

// Menu card image zoom on hover
document.querySelectorAll('.menu-card-image img').forEach((img) => {
  img.parentElement.addEventListener('mousemove', (e) => {
    const rect = img.parentElement.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(img, {
      x: x * 20,
      y: y * 15,
      scale: 1.08,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
  img.parentElement.addEventListener('mouseleave', () => {
    gsap.to(img, {
      x: 0, y: 0, scale: 1,
      duration: 0.8,
      ease: 'power3.out'
    });
  });
});

/* ───────────────────────────────────────────
   11. GALLERY ENTRANCE + PARALLAX
─────────────────────────────────────────── */
gsap.from('.gallery-title-block, .gallery-link', {
  y: 40,
  opacity: 0,
  duration: 1.2,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.gallery',
    start: 'top 75%'
  }
});

ScrollTrigger.batch('.gallery-item', {
  start: 'top 90%',
  onEnter: (elements) => {
    gsap.fromTo(elements,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', stagger: 0.12 }
    );
  },
  once: true
});

document.querySelectorAll('.gallery-item img').forEach((img) => {
  gsap.fromTo(img,
    { yPercent: -8 },
    {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    }
  );
});

/* ───────────────────────────────────────────
   12. STATS COUNTER ANIMATION
─────────────────────────────────────────── */
document.querySelectorAll('[data-count]').forEach((el) => {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals) || 0;
  const suffix = el.dataset.suffix || '';
  const obj = { val: 0 };

  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(obj, {
        val: target,
        duration: 2.4,
        ease: 'power2.out',
        onUpdate: () => {
          el.innerHTML = obj.val.toFixed(decimals) + (suffix ? `<span class="unit">${suffix}</span>` : '');
        }
      });
    },
    once: true
  });
});

gsap.from('.stats-header > *', {
  y: 40,
  opacity: 0,
  duration: 1.2,
  stagger: 0.2,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.stats',
    start: 'top 75%'
  }
});

/* ───────────────────────────────────────────
   13. CTA + WEATHER ENTRANCE
─────────────────────────────────────────── */
gsap.from('.weather-widget, .cta-block', {
  y: 60,
  opacity: 0,
  duration: 1.2,
  stagger: 0.18,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.cta-weather',
    start: 'top 75%'
  }
});

/* ───────────────────────────────────────────
   14. NAVIGATION SCROLL EFFECT
─────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

/* ───────────────────────────────────────────
   15. BACK TO TOP
─────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}, { passive: true });

backToTop.addEventListener('click', () => {
  if (lenis) {
    lenis.scrollTo(0, { duration: 2 });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

/* ───────────────────────────────────────────
   16. STATS BG PARALLAX
─────────────────────────────────────────── */
gsap.to('.stats-bg-text', {
  yPercent: -25,
  ease: 'none',
  scrollTrigger: {
    trigger: '.stats',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.5
  }
});

/* ───────────────────────────────────────────
   17. REFRESH ON LOAD
─────────────────────────────────────────── */
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

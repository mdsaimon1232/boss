// Mobile nav
const hamburger = document.querySelector('.hamburger');
const navMenu = document.getElementById('primary-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('show');
    hamburger.setAttribute('aria-expanded', String(open));
  });
  navMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navMenu.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    })
  );
}

// Active link on scroll
const sections = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('.nav-link')];

function onScroll() {
  const y = window.scrollY + 120;
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop;
    const bottom = top + s.offsetHeight;
    if (y >= top && y < bottom) current = s.id;
  });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
}
document.addEventListener('scroll', onScroll);
onScroll();

// Stat counters
const counters = document.querySelectorAll('.stat-number');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.target, 10);
    let curr = 0;
    const step = Math.max(1, Math.round(target / 60));
    const tick = () => {
      curr += step;
      if (curr >= target) { curr = target; }
      el.textContent = String(curr);
      if (curr < target) requestAnimationFrame(tick);
    };
    tick();
    io.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(c => io.observe(c));

// Contact form demo handler
const form = document.getElementById('contactForm');
const statusEl = document.querySelector('.form-status');
if (form && statusEl) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    statusEl.textContent = 'Sending...';
    setTimeout(() => {
      statusEl.textContent = 'Thanks! I will get back to you soon.';
      form.reset();
    }, 900);
  });
}

// Modern mobile drawer nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navBackdrop = document.getElementById('navBackdrop');
function setMenu(open) {
  if (!navLinks || !hamburger) return;
  navLinks.classList.toggle('open', open);
  navBackdrop?.classList.toggle('show', open);
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
  document.body.classList.toggle('no-scroll', open);
}
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navBackdrop?.addEventListener('click', () => setMenu(false));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) setMenu(false);
  });
  window.matchMedia('(min-width: 901px)').addEventListener?.('change', (e) => {
    if (e.matches) setMenu(false);
  });
}

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.brutal-card, .proj-card, .testi, .exp-item, .focus-card, .contact-card').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Back to top
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) toTop.classList.add('show');
  else toTop.classList.remove('show');
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Lightbox gallery for project screenshots
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
const lbCount = document.getElementById('lbCount');
let lbList = [];
let lbIndex = 0;

function openLightbox(list, index) {
  lbList = list;
  lbIndex = index;
  renderLb();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function renderLb() {
  const item = lbList[lbIndex];
  lbImg.src = item.src;
  lbImg.alt = item.alt;
  lbCap.textContent = item.alt;
  lbCount.textContent = (lbIndex + 1) + ' / ' + lbList.length;
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lbImg.src = '';
}
function stepLb(dir) {
  lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
  renderLb();
}
document.querySelectorAll('.shots').forEach(gallery => {
  const links = Array.from(gallery.querySelectorAll('a'));
  const list = links.map(a => {
    const img = a.querySelector('img');
    return { src: a.getAttribute('href'), alt: img ? img.getAttribute('alt') : '' };
  });
  links.forEach((a, i) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(list, i);
    });
  });
});
document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
document.getElementById('lbPrev')?.addEventListener('click', (e) => { e.stopPropagation(); stepLb(-1); });
document.getElementById('lbNext')?.addEventListener('click', (e) => { e.stopPropagation(); stepLb(1); });
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox || !lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') stepLb(1);
  if (e.key === 'ArrowLeft') stepLb(-1);
});

// Courses filter (courses.html)
const filterBtns = document.querySelectorAll('.filter-btn');
const courseGrid = document.getElementById('courseGrid');
if (filterBtns.length && courseGrid) {
  const cards = Array.from(courseGrid.querySelectorAll('.course-card'));
  const empty = document.getElementById('courseEmpty');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      let shown = 0;
      cards.forEach(c => {
        const show = f === 'all' || c.dataset.cat === f;
        c.style.display = show ? '' : 'none';
        if (show) shown++;
      });
      if (empty) empty.style.display = shown ? 'none' : 'block';
    });
  });
}

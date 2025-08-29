// Intro timing: 36 frames * 100ms = 3600ms + 1000ms fade
const INTRO_MS = 36 * 100;
const FADE_MS = 1000;

const intro = document.getElementById('intro');
const social = document.getElementById('social');
const bee = document.getElementById('bee');
const largeTile = document.getElementById('large-tile');

// Reveal large tile once in view
const ioHero = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    largeTile.classList.add('reveal');
    ioHero.disconnect();
  }
},{threshold:0.1});
ioHero.observe(largeTile);

// Intro logic
setTimeout(() => {
  intro.classList.add('fade-out');
}, INTRO_MS);
setTimeout(() => {
  intro.style.display = 'none';
  // show bee after intro
  bee.style.opacity = '1';
}, INTRO_MS + FADE_MS);

// Randomly move the bee around top section
function moveBee() {
  const top = 10 + Math.random() * 80;
  const left = 10 + Math.random() * 80;
  bee.style.top = top + '%';
  bee.style.left = left + '%';
}
setInterval(moveBee, 4000);
moveBee();

// Scroll effects: hide social when not at top, hide bee below top section,
// and parallax shift for large-tile (max 80px ~ 5cm)
function onScroll() {
  const y = window.scrollY || window.pageYOffset;
  // show/hide social
  if (y > 50) social.classList.add('hidden'); else social.classList.remove('hidden');
  // bee visibility (only near top ~ first 400px)
  bee.style.opacity = (y > 400) ? '0' : '1';
  // parallax shift
  const shift = Math.min(y * 0.3, 80);
  largeTile.style.transform = `translateY(${shift}px)`;
}
window.addEventListener('scroll', onScroll);
onScroll();

// Grid reveal (staggered) with IntersectionObserver
const tiles = document.querySelectorAll('.tile');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      const delay = Number(e.target.getAttribute('data-delay') || 0);
      setTimeout(() => e.target.classList.add('reveal'), delay);
      io.unobserve(e.target);
    }
  });
},{ threshold: 0.15 });
tiles.forEach(t => io.observe(t));

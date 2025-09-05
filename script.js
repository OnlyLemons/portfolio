document.addEventListener('DOMContentLoaded', () => {
  const INTRO_MS = 2000, FADE_MS = 1000;
  const intro = document.getElementById('intro');
  const social = document.getElementById('social');
  const bee = document.getElementById('bee');
  const largeTile = document.getElementById('large-tile');
  const grid = document.getElementById('grid');

  setTimeout(()=>intro.classList.add('fade-out'), INTRO_MS);
  setTimeout(()=>{ intro.style.display='none'; bee.style.opacity='1'; }, INTRO_MS + FADE_MS);

  const ioHero = new IntersectionObserver(([entry]) => {
    if(entry.isIntersecting){ largeTile.classList.add('reveal'); ioHero.disconnect(); }
  }, {threshold: 0.1});
  ioHero.observe(largeTile);

  function moveBee(){ bee.style.top=(10+Math.random()*80)+'%'; bee.style.left=(10+Math.random()*80)+'%'; }
  setInterval(moveBee, 4000); moveBee();
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY || window.pageYOffset;
    social.classList.toggle('hidden', y>50);
    bee.style.opacity = (y>400) ? '0' : '1';
    const shift = Math.min(y*0.3,80);
    largeTile.style.transform = `translateY(${shift}px)`;
  });

  function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  const sources = Array.isArray(MEDIA_SOURCES) ? shuffle([...MEDIA_SOURCES]) : [];
  sources.forEach((src,i)=>{
    const tile = document.createElement('div');
    tile.className = 'tile';
    const img = document.createElement('img');
    img.src = src; img.alt = 'Portfolio item'; img.loading = 'lazy';
    tile.appendChild(img);
    grid.appendChild(tile);
    const delay = 100 + (i % 10) * 150;
    setTimeout(()=>tile.classList.add('reveal'), delay);
  });

  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  function openLightbox(src){
    lbImg.src = src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    lb.classList.remove('open');
    lbImg.src = '';
    document.body.style.overflow = '';
  }
  grid.addEventListener('click', (e)=>{
    const el = e.target;
    if(el && el.tagName === 'IMG'){ openLightbox(el.getAttribute('src')); }
  });
  lb.addEventListener('click', (e)=>{ if(e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && lb.classList.contains('open')) closeLightbox(); });
});
const FALLBACK = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=70";

const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('is-hidden'), 850);
});

const slides = [...document.querySelectorAll('.hero__slide')];
const dots = [...document.querySelectorAll('.dot')];
const progressBar = document.getElementById('progressBar');
let current = 0;
let started = performance.now();
const duration = 5200;

function loadHeroBackground(slide){
  const url = slide.dataset.bg;
  if (!url || slide.dataset.loaded === "true") return;
  const img = new Image();
  img.decoding = "async";
  img.onload = () => {
    slide.style.backgroundImage = `url("${url}")`;
    slide.dataset.loaded = "true";
  };
  img.onerror = () => {
    slide.style.backgroundImage = `url("${FALLBACK}")`;
    slide.dataset.loaded = "true";
  };
  img.src = url;
}
loadHeroBackground(slides[0]);
if (slides[1]) loadHeroBackground(slides[1]);

function setSlide(index){
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  current = index;
  started = performance.now();
  loadHeroBackground(slides[index]);
  loadHeroBackground(slides[(index + 1) % slides.length]);
}
dots.forEach((dot, i) => dot.addEventListener('click', () => setSlide(i)));

function animateSlider(now){
  const elapsed = now - started;
  const ratio = Math.min(elapsed / duration, 1);
  progressBar.style.width = (ratio * 100) + '%';
  if (elapsed >= duration) setSlide((current + 1) % slides.length);
  requestAnimationFrame(animateSlider);
}
requestAnimationFrame(animateSlider);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });
document.querySelectorAll('.reveal, .reveal-block, .reveal-card').forEach(el => revealObserver.observe(el));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.target);
    const start = performance.now();
    const time = 1700;
    function frame(now){
      const progress = Math.min((now - start) / time, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if(progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.7 });
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 10;
    const rotateX = (0.5 - y) * 10;
    card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

document.querySelectorAll('img').forEach(img => {
  img.onerror = () => {
    if (img.src !== FALLBACK) img.src = FALLBACK;
  };
});

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let dpr = window.devicePixelRatio || 1;

function resizeCanvas(){
  const w = window.innerWidth;
  const h = window.innerHeight;
  dpr = window.devicePixelRatio || 1;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  particles = Array.from({length: Math.min(30, Math.max(12, Math.floor(w / 60)))}, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.14,
    vy: (Math.random() - 0.5) * 0.14,
    a: Math.random() * 0.18 + 0.03
  }));
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function renderParticles(){
  const w = window.innerWidth;
  const h = window.innerHeight;
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < -10) p.x = w + 10;
    if (p.x > w + 10) p.x = -10;
    if (p.y < -10) p.y = h + 10;
    if (p.y > h + 10) p.y = -10;
    ctx.beginPath();
    ctx.fillStyle = `rgba(234,216,191,${p.a})`;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(renderParticles);
}
renderParticles();
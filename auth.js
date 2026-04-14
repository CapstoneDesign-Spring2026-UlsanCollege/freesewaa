document.querySelectorAll('.auth-toggle').forEach(toggle => {
  const buttons = [...toggle.querySelectorAll('.toggle-btn')];
  const card = toggle.closest('.auth-card');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const target = btn.dataset.panelTarget;
      card.querySelectorAll('.auth-panel').forEach(panel => {
        panel.classList.toggle('is-active', panel.id === target);
      });
    });
  });
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
  particles = Array.from({length: Math.min(28, Math.max(12, Math.floor(w / 65)))}, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.8 + 0.5,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
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
    p.x += p.vx;
    p.y += p.vy;
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

const STORAGE_KEYS = {
  auth: 'freesewaa-auth',
  currentUserId: 'freesewaa-current-user-id',
  token: 'freesewaa-token'
};

function setSession(auth) {
  localStorage.setItem(STORAGE_KEYS.auth, 'true');
  if (auth.token) localStorage.setItem(STORAGE_KEYS.token, auth.token);
  if (auth.user && auth.user.id) localStorage.setItem(STORAGE_KEYS.currentUserId, auth.user.id);
  window.location.href = 'app.html';
}

function showInlineMessage(form, message, tone = 'default') {
  let el = form.querySelector('.auth-message');
  if (!el) {
    el = document.createElement('p');
    el.className = 'auth-message';
    form.appendChild(el);
  }
  el.textContent = message;
  el.dataset.tone = tone;
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
}

function getPageMode() {
  return window.location.pathname.includes('signup') ? 'signup' : 'signin';
}

function getPanelType(form) {
  return form.closest('#phonePanel') ? 'phone' : 'email';
}

function formValues(form) {
  const inputs = [...form.querySelectorAll('input')];
  return inputs.map(input => input.value.trim());
}

document.querySelectorAll('.social-btn').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      btn.disabled = true;
      btn.textContent = 'Connecting...';
      showInlineMessage(document.querySelector('.auth-form') || document.body, 'Google demo login is not connected in the structured backend yet.', 'error');
      btn.disabled = false;
      btn.textContent = 'Continue with Google';
      return;
    } catch (error) {
      alert(error.message);
      btn.disabled = false;
      btn.textContent = 'Continue with Google';
    }
  });
});

document.querySelectorAll('.secondary-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.textContent = 'Code Sent';
  });
});

document.querySelectorAll('.auth-form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pageMode = getPageMode();
    const panelType = getPanelType(form);
    const submitButton = form.querySelector('.primary-btn');
    const raw = formValues(form);

    try {
      submitButton.disabled = true;
      submitButton.textContent = pageMode === 'signup' ? 'Creating...' : 'Signing in...';

      let payload = {};
      let endpoint = '';

      if (pageMode === 'signup' && panelType === 'email') {
        const [firstName, lastName, email, password] = raw;
        payload = { firstName, lastName, email, password };
        endpoint = '/api/auth/signup';
      }

      if (pageMode === 'signup' && panelType === 'phone') {
        const [firstName, lastName, phone, code] = raw;
        const prefix = form.querySelector('select')?.value || '';
        if (code !== '123456') throw new Error('Use 123456 as the demo verification code.');
        payload = { firstName, lastName, phone: `${prefix}${phone}`, password: 'phone-demo-123456' };
        endpoint = '/api/auth/signup';
      }

      if (pageMode === 'signin' && panelType === 'email') {
        const [email, password] = raw;
        payload = { email, password };
        endpoint = '/api/auth/signin';
      }

      if (pageMode === 'signin' && panelType === 'phone') {
        const [phone, code] = raw;
        const prefix = form.querySelector('select')?.value || '';
        if (code !== '123456') throw new Error('Use 123456 as the demo verification code.');
        payload = { phone: `${prefix}${phone}`, password: 'phone-demo-123456' };
        endpoint = '/api/auth/signin';
      }

      const data = await postJson(endpoint, payload);
      setSession({ token: data.token, user: data.user });
    } catch (error) {
      showInlineMessage(form, error.message, 'error');
      submitButton.disabled = false;
      submitButton.textContent = pageMode === 'signup' ? 'Create Account' : (panelType === 'phone' ? 'Continue' : 'Sign In');
    }
  });
});
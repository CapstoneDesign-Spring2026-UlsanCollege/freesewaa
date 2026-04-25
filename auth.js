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
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let dpr = window.devicePixelRatio || 1;

  function resizeCanvas() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    particles = Array.from(
      { length: Math.min(28, Math.max(12, Math.floor(w / 65))) },
      () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.5,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        a: Math.random() * 0.18 + 0.03
      })
    );
  }

  function renderParticles() {
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

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  renderParticles();
}

const STORAGE_KEYS = {
  auth: 'freesewaa-auth',
  currentUserId: 'freesewaa-current-user-id',
  token: 'freesewaa-token',
  user: 'freesewaa-user'
};

const phoneAuthState = {
  confirmationResult: null,
  verifier: null,
  sendingForForm: null
};

function getApiBaseUrl() {
  let stored = '';
  try {
    stored = localStorage.getItem('freesewaa-api-base-url') || '';
  } catch (error) {}

  const configured = window.FREESEWAA_API_BASE_URL || window.FREESEWAA_API_ORIGIN || stored || '';
  const normalized = String(configured || window.location.origin).replace(/\/+$/, '');

  if (configured) {
    try {
      localStorage.setItem('freesewaa-api-base-url', normalized);
    } catch (error) {}
  }

  return normalized;
}

function apiUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  if (String(path).startsWith('//')) return `${window.location.protocol}${path}`;
  return new URL(String(path), getApiBaseUrl()).toString();
}

function getPageMode() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('signup')) return 'signup';
  if (path.includes('admin_login') || path.includes('admin-login')) return 'admin-signin';
  return 'signin';
}

function getPanelType(form) {
  return form.dataset.authPanel || (form.closest('#phonePanel') ? 'phone' : 'email');
}

function formValues(form) {
  const inputs = [...form.querySelectorAll('input')].filter(input => input.type !== 'checkbox');
  return inputs.map(input => input.value.trim());
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

function clearInlineMessage(form) {
  const el = form.querySelector('.auth-message');
  if (el) {
    el.textContent = '';
    el.dataset.tone = 'default';
  }
}

function showGlobalMessage(message, tone = 'default') {
  const activeForm =
    document.querySelector('.auth-panel.is-active .auth-form') ||
    document.querySelector('.auth-form');
  if (activeForm) showInlineMessage(activeForm, message, tone);
}

async function postJson(url, payload) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Something went wrong.');
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        'Cannot reach the server. Set FREESEWAA_API_BASE_URL for deployment or open the app through the server that hosts the API.'
      );
    }
    throw error;
  }
}

function setSession(data) {
  const user = data.user || {};
  const userId = user.id || data.auth?.userId || '';
  const token = data.token || data.auth?.token || '';
  const sessionRole = user.role || data.auth?.role || 'user';

  if (!userId) throw new Error('Invalid response format from server.');

  user.role = sessionRole;

  localStorage.setItem(STORAGE_KEYS.auth, 'true');
  localStorage.setItem(STORAGE_KEYS.currentUserId, userId);
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));

  if (token) {
    localStorage.setItem(STORAGE_KEYS.token, token);
  } else {
    localStorage.removeItem(STORAGE_KEYS.token);
  }

  window.location.href = sessionRole === 'admin' ? '/admin.html' : '/user_panel.html';
}

function validateSignupEmailForm(form, values) {
  const [firstName, lastName, email, password] = values;
  const agreed = form.querySelector('input[type="checkbox"]')?.checked;

  if (!firstName) throw new Error('Please enter your first name.');
  if (!lastName) throw new Error('Please enter your last name.');
  if (!email) throw new Error('Please enter your email address.');
  if (!password || password.length < 8) throw new Error('Password must be at least 8 characters.');
  if (!agreed) throw new Error('Please agree to the Terms and Privacy Policy.');
}

function validateSigninEmailForm(values) {
  const [email, password] = values;
  if (!email) throw new Error('Please enter your email address.');
  if (!password) throw new Error('Please enter your password.');
}

function getFirebaseConfig() {
  const config = window.FREESEWAA_FIREBASE_CONFIG;

  if (!config || !config.apiKey || String(config.apiKey).includes('YOUR_FIREBASE')) {
    throw new Error(
      'Firebase is not configured yet. Fill in firebase-config.js with your real Firebase web app values.'
    );
  }

  return config;
}

function getFirebaseAuth() {
  if (!window.firebase || !window.firebase.apps) {
    throw new Error('Firebase SDK did not load. Check your script order and reload the page.');
  }

  if (!window.firebase.apps.length) {
    window.firebase.initializeApp(getFirebaseConfig());
  }

  const auth = window.firebase.auth();
  auth.languageCode = 'en';
  return auth;
}

function parseDisplayName(name = '') {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' ')
  };
}

async function syncFirebaseSession({ idToken, provider, firstName = '', lastName = '', phone = '' }) {
  if (!idToken) throw new Error('Missing Firebase ID token.');

  return postJson(apiUrl('/api/auth/firebase'), {
    idToken,
    provider,
    firstName,
    lastName,
    phone
  });
}

async function signInWithGoogle(button) {
  const auth = getFirebaseAuth();
  const provider = new window.firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  button.disabled = true;
  button.textContent = 'Connecting...';

  try {
    const result = await auth.signInWithPopup(provider);
    const firebaseUser = result.user;

    if (!firebaseUser) {
      throw new Error('Google sign in did not return a user.');
    }

    const token = await firebaseUser.getIdToken(true);
    const { firstName, lastName } = parseDisplayName(firebaseUser.displayName || '');

    const data = await syncFirebaseSession({
      idToken: token,
      provider: 'google',
      firstName,
      lastName,
      phone: firebaseUser.phoneNumber || ''
    });

    setSession(data);
  } catch (error) {
    let message = error.message || 'Google sign in failed.';

    if (error.code === 'auth/popup-closed-by-user') {
      message = 'Google sign in was cancelled.';
    } else if (error.code === 'auth/popup-blocked') {
      message = 'Popup was blocked by the browser. Please allow popups and try again.';
    } else if (error.code === 'auth/unauthorized-domain') {
      message = 'This domain is not authorized in Firebase. Add localhost to Authorized domains.';
    }

    showGlobalMessage(message, 'error');
  } finally {
    button.disabled = false;
    button.textContent = 'Continue with Google';
  }
}

function normalizePhoneNumber(prefix, phone) {
  const cleanedPrefix = String(prefix || '').trim();
  const cleanedPhone = String(phone || '').replace(/\s+/g, '').replace(/-/g, '');

  if (!cleanedPhone) {
    throw new Error('Please enter your phone number.');
  }

  let localPhone = cleanedPhone;
  if (localPhone.startsWith('0')) {
    localPhone = localPhone.slice(1);
  }

  const fullPhone = `${cleanedPrefix}${localPhone}`;

  if (!fullPhone.startsWith('+')) {
    throw new Error('Phone number must include a valid country code.');
  }

  return fullPhone;
}

function getPhoneNumberFromForm(form) {
  const prefix = form.querySelector('select')?.value || '';
  const phoneInput = form.querySelector('input[type="tel"]');
  const phone = phoneInput?.value.trim() || '';
  return normalizePhoneNumber(prefix, phone);
}

function ensurePhonePrechecks(form, pageMode) {
  if (pageMode === 'signup') {
    const raw = formValues(form);
    const firstName = raw[0] || '';
    const lastName = raw[1] || '';
    const agreed = form.querySelector('input[type="checkbox"]')?.checked;

    if (!firstName) throw new Error('Please enter your first name.');
    if (!lastName) throw new Error('Please enter your last name.');
    if (!agreed) throw new Error('Please agree to the Terms and Privacy Policy.');
  }
}

function resetRecaptcha() {
  if (phoneAuthState.verifier) {
    try {
      phoneAuthState.verifier.clear();
    } catch (error) {
      console.warn('Failed to clear reCAPTCHA:', error);
    }
    phoneAuthState.verifier = null;
  }
}

function getPhoneVerifier() {
  const auth = getFirebaseAuth();

  if (!phoneAuthState.verifier) {
    const container = document.getElementById('recaptcha-container');

    if (!container) {
      throw new Error('Phone auth container is missing from the page.');
    }

    phoneAuthState.verifier = new window.firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => {},
        'expired-callback': () => {
          showGlobalMessage('Verification expired. Please send the code again.', 'error');
          resetRecaptcha();
        }
      },
      auth
    );
  }

  return { auth, verifier: phoneAuthState.verifier };
}

async function sendPhoneCode(button) {
  const form = button.closest('.auth-form');
  const pageMode = getPageMode();

  try {
    clearInlineMessage(form);
    ensurePhonePrechecks(form, pageMode);

    const fullPhone = getPhoneNumberFromForm(form);
    const { auth, verifier } = getPhoneVerifier();

    button.disabled = true;
    button.textContent = 'Sending...';
    showInlineMessage(form, 'Preparing secure verification...', 'default');

    phoneAuthState.confirmationResult = await auth.signInWithPhoneNumber(fullPhone, verifier);
    phoneAuthState.sendingForForm = form;

    showInlineMessage(form, 'Verification code sent. Check your SMS and enter the code below.', 'success');
    button.textContent = 'Code Sent';
  } catch (error) {
    resetRecaptcha();
    phoneAuthState.confirmationResult = null;
    phoneAuthState.sendingForForm = null;

    button.disabled = false;
    button.textContent = 'Send Verification Code';
    showInlineMessage(form, error.message || 'Failed to send verification code.', 'error');
  }
}

async function handlePhoneSubmit(form) {
  const pageMode = getPageMode();
  const raw = formValues(form);

  if (!phoneAuthState.confirmationResult || phoneAuthState.sendingForForm !== form) {
    throw new Error('Please click "Send Verification Code" first.');
  }

  let code = '';
  let firstName = '';
  let lastName = '';
  let phone = '';

  if (pageMode === 'signup') {
    firstName = raw[0] || '';
    lastName = raw[1] || '';
    phone = raw[2] || '';
    code = raw[3] || '';

    const agreed = form.querySelector('input[type="checkbox"]')?.checked;
    if (!firstName) throw new Error('Please enter your first name.');
    if (!lastName) throw new Error('Please enter your last name.');
    if (!agreed) throw new Error('Please agree to the Terms and Privacy Policy.');
  } else {
    phone = raw[0] || '';
    code = raw[1] || '';
  }

  if (!phone) throw new Error('Please enter your phone number.');
  if (!code) throw new Error('Please enter the verification code.');

  const credential = await phoneAuthState.confirmationResult.confirm(code);
  const firebaseUser = credential.user;

  if (!firebaseUser) {
    throw new Error('Phone verification did not return a user.');
  }

  const token = await firebaseUser.getIdToken(true);

  const data = await syncFirebaseSession({
    idToken: token,
    provider: 'phone',
    firstName,
    lastName,
    phone: firebaseUser.phoneNumber || getPhoneNumberFromForm(form)
  });

  resetRecaptcha();
  phoneAuthState.confirmationResult = null;
  phoneAuthState.sendingForForm = null;

  setSession(data);
}

document.querySelectorAll('.social-btn[data-auth-provider="google"]').forEach(btn => {
  btn.addEventListener('click', async e => {
    e.preventDefault();
    await signInWithGoogle(btn);
  });
});

document.querySelectorAll('.secondary-btn[data-phone-action="send-code"]').forEach(btn => {
  btn.addEventListener('click', async e => {
    e.preventDefault();
    await sendPhoneCode(btn);
  });
});

document.querySelectorAll('.auth-form').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const pageMode = getPageMode();
    const panelType = getPanelType(form);
    const submitButton = form.querySelector('.primary-btn');
    const defaultButtonText =
      pageMode === 'signup' ? 'Create Account' : panelType === 'phone' ? 'Continue' : 'Sign In';

    try {
      clearInlineMessage(form);
      submitButton.disabled = true;
      submitButton.textContent = pageMode === 'signup' ? 'Creating...' : 'Signing in...';

      if (panelType === 'phone') {
        await handlePhoneSubmit(form);
        return;
      }

      const raw = formValues(form);
      let payload = {};
      let endpoint = '';

      if (pageMode === 'signup') {
        validateSignupEmailForm(form, raw);
        const [firstName, lastName, email, password] = raw;
        payload = { firstName, lastName, email, password };
        endpoint = apiUrl('/api/auth/signup');
      } else if (pageMode === 'signin') {
        validateSigninEmailForm(raw);
        const [email, password] = raw;
          payload = { email, password };
          endpoint = apiUrl('/api/auth/signin');
      } else if (pageMode === 'admin-signin') {
        validateSigninEmailForm(raw);
        const [email, password] = raw;
        payload = { email, password };
          endpoint = apiUrl('/api/auth/admin/signin');
      }

      const data = await postJson(endpoint, payload);
      setSession(data);
    } catch (error) {
      showInlineMessage(form, error.message || 'Authentication failed.', 'error');
      submitButton.disabled = false;
      submitButton.textContent = defaultButtonText;
    }
  });
});

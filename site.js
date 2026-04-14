(function () {
  const page = document.body.dataset.page || '';

  const STORAGE_KEYS = {
    theme: 'freesewaa-theme',
    app: 'freesewaa-app-state',
    auth: 'freesewaa-auth',
    currentUserId: 'freesewaa-current-user-id'
  };

  const defaultState = {
    user: {
      id: 'user-alisha',
      name: 'Alisha Shrestha',
      firstName: 'Alisha',
      lastName: 'Shrestha',
      email: 'alisha@example.com',
      phone: '+82 10-5558-2211',
      city: 'Ulsan',
      region: 'Nam-gu',
      joinedAt: '2025-06-01T09:00:00',
      bio: 'ECE graduate and community donor who shares useful items with families and students.',
      pickupAvailability: 'Weekdays after 6 PM · Saturday afternoon',
      savedListingIds: [102, 104],
      requestedListingIds: [104, 105],
      drafts: {},
      preferences: {
        theme: 'dark',
        language: 'English',
        notifications: true,
        pickupReminders: true,
        marketing: false
      }
    },
    listings: [
      {
        id: 101,
        ownerId: 'user-alisha',
        ownerName: 'Alisha Shrestha',
        title: 'Winter Jacket',
        category: 'Clothing',
        condition: 'Good',
        location: 'Ulsan, Samsan-dong',
        distanceKm: 4,
        pickup: 'Pickup only',
        pickupWindow: 'Today after 6 PM',
        description: 'Warm, clean, and wearable right away. Best fit for teen or adult. No major damage.',
        notes: 'Near the main road pickup point.',
        image: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=900&q=80',
        createdAt: '2026-04-10T08:30:00',
        requestCount: 3,
        saveCount: 8,
        urgent: false,
        status: 'active'
      },
      {
        id: 102,
        ownerId: 'user-alisha',
        ownerName: 'Alisha Shrestha',
        title: 'Story Books Set',
        category: 'Books',
        condition: 'Like new',
        location: 'Ulsan, Dal-dong',
        distanceKm: 7,
        pickup: 'Flexible',
        pickupWindow: 'Weekend mornings',
        description: "Children's story collection with colorful illustrations and clean pages.",
        notes: 'Can bundle with crayons if needed.',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
        createdAt: '2026-04-09T18:05:00',
        requestCount: 1,
        saveCount: 11,
        urgent: false,
        status: 'reserved'
      },
      {
        id: 103,
        ownerId: 'user-alisha',
        ownerName: 'Alisha Shrestha',
        title: 'School Supply Pack',
        category: 'Essentials',
        condition: 'New',
        location: 'Ulsan, Mugeo-dong',
        distanceKm: 11,
        pickup: 'Meet halfway',
        pickupWindow: 'Any weekday afternoon',
        description: 'Notebooks, pencils, crayons, markers, glue, and other useful school items.',
        notes: 'Great for one child starting school this month.',
        image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80',
        createdAt: '2026-04-08T10:15:00',
        requestCount: 4,
        saveCount: 14,
        urgent: true,
        status: 'active'
      },
      {
        id: 104,
        ownerId: 'community-1',
        ownerName: 'Mina Park',
        title: 'Compact Storage Shelf',
        category: 'Home',
        condition: 'Good',
        location: 'Ulsan, Seongnam-dong',
        distanceKm: 14,
        pickup: 'Pickup only',
        pickupWindow: 'Saturday afternoon',
        description: 'A small but sturdy storage shelf for home organization. Easy to carry in a car.',
        notes: 'Top edge has a minor scratch.',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
        createdAt: '2026-04-07T13:42:00',
        requestCount: 2,
        saveCount: 9,
        urgent: false,
        status: 'active'
      },
      {
        id: 105,
        ownerId: 'community-2',
        ownerName: 'Joon Lee',
        title: 'Rice & Pantry Bundle',
        category: 'Food',
        condition: 'New',
        location: 'Ulsan, Ok-dong',
        distanceKm: 5,
        pickup: 'Flexible',
        pickupWindow: 'Tonight before 8 PM',
        description: 'Unopened rice, ramen, canned food, and pantry basics prepared as a support bundle.',
        notes: 'Please message only if you can collect within two days.',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
        createdAt: '2026-04-10T06:45:00',
        requestCount: 6,
        saveCount: 13,
        urgent: true,
        status: 'active'
      },
      {
        id: 106,
        ownerId: 'community-3',
        ownerName: 'Ana Lopez',
        title: 'Laptop Study Desk',
        category: 'Home',
        condition: 'Used',
        location: 'Ulsan, Sinjeong-dong',
        distanceKm: 19,
        pickup: 'Pickup only',
        pickupWindow: 'Sunday afternoon',
        description: 'Simple desk for study or laptop work. Stable and usable with visible signs of use.',
        notes: 'Disassembles into two parts for transport.',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
        createdAt: '2026-04-06T17:40:00',
        requestCount: 3,
        saveCount: 5,
        urgent: false,
        status: 'active'
      }
    ],
    requests: [
      { id: 'req-104', listingId: 104, status: 'pending', requestedAt: '2026-04-10T07:30:00', note: 'Can pick up this weekend.' },
      { id: 'req-105', listingId: 105, status: 'approved', requestedAt: '2026-04-10T08:10:00', note: 'Need it for this week.' }
    ],
    conversations: [
      {
        id: 'conv-101-sarah',
        listingId: 101,
        participant: 'Sarah Kim',
        participantCity: 'Ulsan',
        unread: 1,
        updatedAt: '2026-04-10T09:00:00',
        messages: [
          { sender: 'Sarah Kim', text: 'Hi! I saw your jacket listing. Is it still available?', time: '9:02 AM', type: 'received' },
          { sender: 'You', text: 'Yes, it is still available. Pickup is possible this evening.', time: '9:04 AM', type: 'sent' },
          { sender: 'Sarah Kim', text: 'Great. Can I come around 6:30 PM?', time: '9:05 AM', type: 'received' }
        ]
      },
      {
        id: 'conv-102-rohan',
        listingId: 102,
        participant: 'Rohan Patel',
        participantCity: 'Ulsan',
        unread: 0,
        updatedAt: '2026-04-09T18:30:00',
        messages: [
          { sender: 'Rohan Patel', text: 'Thank you, I can pick up the books tomorrow.', time: '6:20 PM', type: 'received' },
          { sender: 'You', text: 'Perfect. I will keep them ready for you.', time: '6:28 PM', type: 'sent' }
        ]
      }
    ],
    notifications: [
      { id: 'n1', text: 'Sarah Kim requested your Winter Jacket listing.', type: 'request', read: false, createdAt: '2026-04-10T09:00:00' },
      { id: 'n2', text: 'Your Story Books Set has 1 new save.', type: 'save', read: true, createdAt: '2026-04-09T18:45:00' }
    ]
  };

  function clone(value) { return JSON.parse(JSON.stringify(value)); }

  function normalizeState(parsed = {}) {
    const base = clone(defaultState);
    return {
      ...base,
      ...parsed,
      user: { ...base.user, ...(parsed.user || {}), preferences: { ...base.user.preferences, ...((parsed.user || {}).preferences || {}) } }
    };
  }

  function getCurrentUserId() { return localStorage.getItem(STORAGE_KEYS.currentUserId) || ''; }
  function isAuthenticated() { return localStorage.getItem(STORAGE_KEYS.auth) === 'true' && Boolean(getCurrentUserId()); }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.app);
      if (!raw) { localStorage.setItem(STORAGE_KEYS.app, JSON.stringify(defaultState)); return defaultState; }
      const parsed = JSON.parse(raw);
      localStorage.setItem(STORAGE_KEYS.app, JSON.stringify(normalizeState(parsed)));
      return normalizeState(parsed);
    } catch (error) { localStorage.setItem(STORAGE_KEYS.app, JSON.stringify(defaultState)); return defaultState; }
  }

  let appState = loadState();
  function saveState() { localStorage.setItem(STORAGE_KEYS.app, JSON.stringify(appState)); }

  function timeAgo(dateString) {
    const diffMs = Date.now() - new Date(dateString).getTime();
    const diffMin = Math.max(1, Math.floor(diffMs / 60000));
    if (diffMin < 60) return `${diffMin}m`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h`;
    return `${Math.floor(diffHr / 24)}d`;
  }

  function formatCreated(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  function initials(name) { return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase(); }

  function escapeHtml(text) {
    return String(text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function showToast(message, tone = 'default') {
    let toast = document.getElementById('appToast');
    if (!toast) { toast = document.createElement('div'); toast.id = 'appToast'; toast.className = 'app-toast'; document.body.appendChild(toast); }
    toast.textContent = message;
    toast.dataset.tone = tone;
    toast.classList.add('is-visible');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModals() {
    document.querySelectorAll('.modal-shell').forEach(modal => { modal.classList.add('hidden'); modal.setAttribute('aria-hidden', 'true'); });
    document.body.classList.remove('modal-open');
  }

  document.addEventListener('click', event => {
    if (event.target.matches('[data-close-modal]')) closeModals();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModals(); });

  const revealTargets = document.querySelectorAll('.reveal, .reveal-block, .reveal-card');
  if (revealTargets.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.18 });
    revealTargets.forEach(el => observer.observe(el));
  }

  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.target);
        const start = performance.now();
        const duration = 1700;
        function frame(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased).toLocaleString();
          if (progress < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.7 });
    counters.forEach(el => counterObserver.observe(el));
  }

  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      card.style.transform = `perspective(1100px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  document.querySelectorAll('.settings-trigger').forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.stopPropagation();
      const dropdown = trigger.closest('.settings-dropdown');
      document.querySelectorAll('.settings-dropdown').forEach(item => { if (item !== dropdown) item.classList.remove('open'); });
      dropdown.classList.toggle('open');
      trigger.setAttribute('aria-expanded', dropdown.classList.contains('open') ? 'true' : 'false');
    });
  });

  document.addEventListener('click', event => {
    if (event.target.closest('.settings-dropdown')) return;
    document.querySelectorAll('.settings-dropdown').forEach(dropdown => dropdown.classList.remove('open'));
  });

  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
  if (savedTheme === 'light') document.body.classList.add('light-mode');

  document.querySelectorAll('[data-theme-toggle="true"]').forEach(button => {
    button.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      localStorage.setItem(STORAGE_KEYS.theme, document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
  });

  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resizeCanvas() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const density = window.innerWidth < 768 ? 8 : Math.min(22, Math.max(10, Math.floor(w / 95)));
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12, a: Math.random() * 0.12 + 0.02
      }));
    }
    function renderParticles() {
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
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    renderParticles();
  }

  function addNotification(text, type = 'general') {
    appState.notifications.unshift({ id: `n${Date.now()}`, text, type, read: false, createdAt: new Date().toISOString() });
    saveState();
  }

  function getListingById(id) { return appState.listings.find(listing => listing.id === id); }
  function getSavedCount() { return appState.user.savedListingIds.length; }
  function getRequestedCount() { return appState.user.requestedListingIds.length; }
  function getUserListings() { return appState.listings.filter(listing => listing.ownerId === appState.user.id); }

  function toggleSaveListing(id) {
    const savedIds = appState.user.savedListingIds;
    const listing = getListingById(id);
    if (!listing) return false;
    const index = savedIds.indexOf(id);
    if (index >= 0) { savedIds.splice(index, 1); listing.saveCount = Math.max(0, listing.saveCount - 1); showToast('Removed from saved items.'); }
    else { savedIds.unshift(id); listing.saveCount += 1; addNotification(`You saved ${listing.title}.`); showToast('Saved to your items.', 'success'); }
    saveState();
    return savedIds.includes(id);
  }

  function requestListing(id) {
    const listing = getListingById(id);
    if (!listing) return;
    if (listing.ownerId === appState.user.id) { showToast('You cannot request your own listing.', 'error'); return; }
    const existingRequest = appState.requests.find(r => r.listingId === id);
    if (!existingRequest) { listing.requestCount += 1; appState.requests.unshift({ id: `req-${id}-${Date.now()}`, listingId: id, status: 'pending', requestedAt: new Date().toISOString(), note: '' }); }
    if (!appState.user.requestedListingIds.includes(id)) appState.user.requestedListingIds.unshift(id);
    addNotification(`Your request for ${listing.title} was sent.`);
    saveState();
    showToast('Request sent.', 'success');
  }

  function initCurrentPage() {
    if (page === 'browse') initBrowsePage();
    if (page === 'donate') initDonatePage();
  }

  function initBrowsePage() {
    const grid = document.getElementById('listingGrid');
    if (!grid) return;
    function render() {
      const items = appState.listings.filter(l => l.status === 'active');
      grid.innerHTML = items.map(l => `
        <article class="listing-card">
          <div class="listing-card__media" style="background-image:url('${escapeHtml(l.image)}')"></div>
          <div class="listing-card__body">
            <div class="listing-meta"><span>${escapeHtml(l.category)}</span><span>${l.distanceKm} km</span></div>
            <h3>${escapeHtml(l.title)}</h3>
            <p>${escapeHtml(l.description)}</p>
            <div class="listing-footer">
              <button class="btn btn-soft" data-action="save" data-id="${l.id}">${appState.user.savedListingIds.includes(l.id) ? 'Saved' : 'Save'}</button>
              <button class="btn btn-hero" data-action="request" data-id="${l.id}">Request</button>
            </div>
          </div>
        </article>
      `).join('');
    }
    grid.addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const id = Number(btn.dataset.id);
      if (btn.dataset.action === 'save') toggleSaveListing(id);
      if (btn.dataset.action === 'request') requestListing(id);
      render();
    });
    render();
  }

  function initDonatePage() {
    const form = document.getElementById('donateForm');
    if (!form) return;
    let step = 1;
    const nextBtn = document.getElementById('nextStepButton');
    const prevBtn = document.getElementById('prevStepButton');
    function updateStep() {
      document.querySelectorAll('.donate-step').forEach(s => s.classList.toggle('is-active', Number(s.dataset.step) === step));
      if (prevBtn) prevBtn.disabled = step === 1;
      if (nextBtn) nextBtn.textContent = step === 4 ? 'Publish' : 'Continue';
    }
    if (nextBtn) nextBtn.addEventListener('click', () => { if (step < 4) { step++; updateStep(); } });
    if (prevBtn) prevBtn.addEventListener('click', () => { if (step > 1) { step--; updateStep(); } });
    updateStep();
  }

  async function bootApp() {
    if (!isAuthenticated()) { window.location.replace('signin.html'); return; }
    initCurrentPage();
  }

  bootApp();
})();
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
      name: 'Pathak Ram',
      firstName: 'Ram',
      lastName: 'Pathak',
      email: 'ram@example.com',
      phone: '+82 010-9664-6162',
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
        ownerId: 'user-Ram',
        ownerName: 'Ram pathak',
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
        ownerId: 'user-Ram',
        ownerName: 'Ram Pathak',
        title: 'Story Books Set',
        category: 'Books',
        condition: 'Like new',
        location: 'Ulsan, Dal-dong',
        distanceKm: 7,
        pickup: 'Flexible',
        pickupWindow: 'Weekend mornings',
        description: 'Children’s story collection with colorful illustrations and clean pages.',
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
      },
      {
        id: 'conv-103-ana',
        listingId: 103,
        participant: 'Ana Lopez',
        participantCity: 'Ulsan',
        unread: 2,
        updatedAt: '2026-04-10T07:45:00',
        messages: [
          { sender: 'Ana Lopez', text: 'Can you share the exact pickup location?', time: '7:31 AM', type: 'received' },
          { sender: 'Ana Lopez', text: 'I can come after work if that helps.', time: '7:43 AM', type: 'received' }
        ]
      },
      {
        id: 'conv-104-mina',
        listingId: 104,
        participant: 'Mina Park',
        participantCity: 'Ulsan',
        unread: 0,
        updatedAt: '2026-04-10T07:32:00',
        messages: [
          { sender: 'You', text: 'Hi! I’m interested in your Compact Storage Shelf. Is it still available?', time: '7:30 AM', type: 'sent' },
          { sender: 'Mina Park', text: 'Yes, it is still available. Weekend pickup works best.', time: '7:32 AM', type: 'received' }
        ]
      }
    ],
    notifications: [
      { id: 'n1', text: 'Sarah Kim requested your Winter Jacket listing.', type: 'request', read: false, createdAt: '2026-04-10T09:00:00' },
      { id: 'n2', text: 'Your Story Books Set has 1 new save.', type: 'save', read: true, createdAt: '2026-04-09T18:45:00' },
      { id: 'n3', text: 'Mina Park replied to your shelf request.', type: 'message', read: false, createdAt: '2026-04-10T07:32:00' }
    ]
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function normalizeState(parsed = {}) {
    const base = clone(defaultState);
    const state = {
      ...base,
      ...parsed,
      user: {
        ...base.user,
        ...(parsed.user || {}),
        preferences: {
          ...base.user.preferences,
          ...((parsed.user || {}).preferences || {})
        }
      }
    };

    state.listings = Array.isArray(parsed.listings) ? parsed.listings.map(listing => ({
      ...listing,
      ownerId: listing.ownerId || ([101, 102, 103].includes(listing.id) ? state.user.id : `community-${listing.id}`),
      ownerName: listing.ownerName || (((listing.ownerId || ([101, 102, 103].includes(listing.id) ? state.user.id : `community-${listing.id}`)) === state.user.id) ? state.user.name : 'Community Member'),
      status: listing.status || 'active'
    })) : base.listings;

    const validIds = new Set(state.listings.map(item => item.id));
    state.user.savedListingIds = (state.user.savedListingIds || []).filter(id => validIds.has(id));
    state.user.requestedListingIds = (state.user.requestedListingIds || []).filter(id => validIds.has(id));
    state.requests = Array.isArray(parsed.requests) ? parsed.requests.filter(item => validIds.has(item.listingId)) : base.requests;
    if (!state.requests.length && state.user.requestedListingIds.length) {
      state.requests = state.user.requestedListingIds.map(id => ({
        id: `req-${id}`,
        listingId: id,
        status: 'pending',
        requestedAt: new Date().toISOString(),
        note: ''
      }));
    }
    state.notifications = (Array.isArray(parsed.notifications) ? parsed.notifications : base.notifications).map(item => ({
      read: false,
      type: 'general',
      ...item
    }));
    state.conversations = Array.isArray(parsed.conversations) ? parsed.conversations : base.conversations;
    return state;
  }

  function getCurrentUserId() {
    return localStorage.getItem(STORAGE_KEYS.currentUserId) || '';
  }

  function isAuthenticated() {
    return localStorage.getItem(STORAGE_KEYS.auth) === 'true' && Boolean(getCurrentUserId());
  }

  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.user) || '{}');
    } catch (error) {
      return {};
    }
  }

  function isAdmin() {
    return getCurrentUser().role === 'admin';
  }

  const liveChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('freesewaa-live') : null;

  function getSessionHeaders(extra = {}) {
    const token = localStorage.getItem('freesewaa-token') || '';
    return token ? { ...extra, Authorization: `Bearer ${token}` } : { ...extra };
  }
  let suppressBroadcast = false;


  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.app);
      if (!raw) {
        const seed = normalizeState();
        localStorage.setItem(STORAGE_KEYS.app, JSON.stringify(seed));
        return seed;
      }
      const parsed = JSON.parse(raw);
      const normalized = normalizeState(parsed);
      localStorage.setItem(STORAGE_KEYS.app, JSON.stringify(normalized));
      return normalized;
    } catch (error) {
      const fallback = normalizeState();
      localStorage.setItem(STORAGE_KEYS.app, JSON.stringify(fallback));
      return fallback;
    }
  }

  async function fetchRemoteState() {
    const userId = getCurrentUserId();
    if (!userId) return null;
    try {
      const response = await fetch(`/api/state?userId=${encodeURIComponent(userId)}`, { headers: getSessionHeaders() });
      if (!response.ok) throw new Error('Unable to load server state.');
      const data = await response.json();
      return data.state || null;
    } catch (error) {
      console.warn(error);
      return null;
    }
  }

  let remoteSyncTimer = null;
  async function persistStateRemote() {
    const userId = getCurrentUserId();
    if (!userId) return;
    try {
      await fetch(`/api/state?userId=${encodeURIComponent(userId)}`, {
        method: 'PUT',
        headers: getSessionHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(appState)
      });
    } catch (error) {
      console.warn('Remote sync failed:', error);
    }
  }

  function scheduleRemoteSync() {
    clearTimeout(remoteSyncTimer);
    remoteSyncTimer = setTimeout(() => {
      persistStateRemote();
    }, 120);
  }

  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEYS.app && event.newValue) {
      try {
        appState = normalizeState(JSON.parse(event.newValue));
        enhanceMenus();
    initCurrentPage();
      } catch (error) {
        console.warn('Storage sync failed', error);
      }
    }
  });

  if (liveChannel) {
    liveChannel.onmessage = event => {
      if (event.data?.type === 'state-updated' && event.data.state) {
        suppressBroadcast = true;
        appState = normalizeState(event.data.state);
        localStorage.setItem(STORAGE_KEYS.app, JSON.stringify(appState));
        suppressBroadcast = false;
        initCurrentPage();
      }
    };
  }

  async function fetchAuditData() {
    try {
      const response = await fetch('/api/audits');
      if (!response.ok) throw new Error('Unable to load audits.');
      return await response.json();
    } catch (error) {
      console.warn(error);
      return null;
    }
  }

  async function fetchAdminOverview() {
    const userId = getCurrentUserId();
    if (!userId) return null;
    try {
      const response = await fetch('/api/admin/overview', { headers: getSessionHeaders() });
      if (!response.ok) throw new Error('Unable to load admin overview.');
      return await response.json();
    } catch (error) {
      console.warn(error);
      return null;
    }
  }

  let appState = loadState();

  function saveState() {
    localStorage.setItem(STORAGE_KEYS.app, JSON.stringify(appState));
    if (!suppressBroadcast && liveChannel) {
      liveChannel.postMessage({ type: 'state-updated', state: appState, at: Date.now() });
    }
    scheduleRemoteSync();
  }

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

  function initials(name) {
    return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
  }

  function escapeHtml(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function showToast(message, tone = 'default') {
    let toast = document.getElementById('appToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'appToast';
      toast.className = 'app-toast';
      document.body.appendChild(toast);
    }
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
    document.querySelectorAll('.modal-shell').forEach(modal => {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    });
    document.body.classList.remove('modal-open');
  }

  document.addEventListener('click', event => {
    if (event.target.matches('[data-close-modal]')) {
      closeModals();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModals();
  });
  document.addEventListener('click', event => {
    const accountModal = event.target.closest('#accountListingModal');
    if (!accountModal) return;
    const saveButton = event.target.closest('.modal-save-button');
    const requestButton = event.target.closest('.modal-request-button');
    if (saveButton) {
      const id = Number(saveButton.dataset.id);
      toggleSaveListing(id);
      renderListingModal(getListingById(id), 'accountListingContent');
    }
    if (requestButton) {
      const id = Number(requestButton.dataset.id);
      const conversationId = requestListing(id);
      if (conversationId) {
        sessionStorage.setItem('freesewaa-open-conversation', conversationId);
        window.location.href = 'messages.html';
      }
    }
  });


  const revealTargets = document.querySelectorAll('.reveal, .reveal-block, .reveal-card');
  if (revealTargets.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
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
    if (window.matchMedia('(hover: none)').matches) return;
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 8;
      const rotateX = (0.5 - y) * 8;
      card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  document.querySelectorAll('.settings-trigger').forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.stopPropagation();
      const dropdown = trigger.closest('.settings-dropdown');
      document.querySelectorAll('.settings-dropdown').forEach(item => {
        if (item !== dropdown) item.classList.remove('open');
      });
      dropdown.classList.toggle('open');
      trigger.setAttribute('aria-expanded', dropdown.classList.contains('open') ? 'true' : 'false');
    });
  });

  document.addEventListener('click', event => {
    if (event.target.closest('.settings-dropdown')) return;
    document.querySelectorAll('.settings-dropdown').forEach(dropdown => dropdown.classList.remove('open'));
    document.querySelectorAll('.settings-trigger').forEach(button => button.setAttribute('aria-expanded', 'false'));
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
      const density = window.innerWidth < 768 ? 8 : Math.min(22, Math.max(10, Math.floor(w / 95)));
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.12 + 0.02
      }));
    }

    function renderParticles() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -10) particle.x = w + 10;
        if (particle.x > w + 10) particle.x = -10;
        if (particle.y < -10) particle.y = h + 10;
        if (particle.y > h + 10) particle.y = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(234,216,191,${particle.a})`;
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(renderParticles);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    renderParticles();
  }

  function addNotification(text, type = 'general') {
    appState.notifications.unshift({
      id: `n${Date.now()}`,
      text,
      type,
      read: false,
      createdAt: new Date().toISOString()
    });
    saveState();
  }

  function getListingById(id) {
    return appState.listings.find(listing => listing.id === id);
  }

  function getSavedCount() {
    return appState.user.savedListingIds.length;
  }

  function getRequestedCount() {
    return appState.user.requestedListingIds.length;
  }
  function getUserListings() {
    return appState.listings.filter(listing => listing.ownerId === appState.user.id);
  }

  function getSavedListings() {
    return appState.user.savedListingIds
      .map(id => getListingById(id))
      .filter(Boolean);
  }

  function getRequestRecord(listingId) {
    return appState.requests.find(item => item.listingId === listingId);
  }

  function getRequestedListings() {
    return appState.requests
      .map(request => ({ request, listing: getListingById(request.listingId) }))
      .filter(item => item.listing);
  }

  function getConversationByListingId(listingId) {
    return appState.conversations.find(item => item.listingId === listingId);
  }

  function createConversationForListing(listingId, introText) {
    const listing = getListingById(listingId);
    if (!listing) return null;
    const existing = getConversationByListingId(listingId);
    if (existing) return existing;
    const conversation = {
      id: `conv-${listingId}-${Date.now()}`,
      listingId,
      participant: listing.ownerId === appState.user.id ? 'Interested Member' : (listing.ownerName || 'Community Member'),
      participantCity: listing.location.split(',')[0],
      unread: 0,
      updatedAt: new Date().toISOString(),
      messages: introText ? [{
        sender: 'You',
        text: introText,
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        type: 'sent'
      }] : []
    };
    appState.conversations.unshift(conversation);
    saveState();
    return conversation;
  }

  function createOrUpdateRequest(listingId, status = 'pending', note = '') {
    let request = getRequestRecord(listingId);
    if (!request) {
      request = {
        id: `req-${listingId}-${Date.now()}`,
        listingId,
        status,
        requestedAt: new Date().toISOString(),
        note
      };
      appState.requests.unshift(request);
    } else {
      request.status = status;
      if (note) request.note = note;
    }
    if (!appState.user.requestedListingIds.includes(listingId)) {
      appState.user.requestedListingIds.unshift(listingId);
    }
    saveState();
    return request;
  }

  function removeRequest(listingId) {
    appState.requests = appState.requests.filter(item => item.listingId !== listingId);
    appState.user.requestedListingIds = appState.user.requestedListingIds.filter(id => id !== listingId);
    addNotification(`You cancelled your request for ${getListingById(listingId)?.title || 'a listing'}.`);
    saveState();
  }

  function markListingStatus(listingId, status) {
    const listing = getListingById(listingId);
    if (!listing) return;
    listing.status = status;
    addNotification(`${listing.title} is now marked as ${status}.`);
    saveState();
    return listing;
  }

  function deleteListingById(listingId) {
    const listing = getListingById(listingId);
    if (!listing) return;
    appState.listings = appState.listings.filter(item => item.id !== listingId);
    appState.user.savedListingIds = appState.user.savedListingIds.filter(id => id !== listingId);
    appState.user.requestedListingIds = appState.user.requestedListingIds.filter(id => id !== listingId);
    appState.requests = appState.requests.filter(item => item.listingId !== listingId);
    appState.conversations = appState.conversations.filter(item => item.listingId !== listingId);
    addNotification(`You removed the listing ${listing.title}.`);
    saveState();
  }

  function getUserStats() {
    const userListings = getUserListings();
    const completed = userListings.filter(item => item.status === 'donated').length;
    const active = userListings.filter(item => item.status === 'active').length;
    const reserved = userListings.filter(item => item.status === 'reserved').length;
    const totalRequests = userListings.reduce((sum, item) => sum + (item.requestCount || 0), 0);
    return {
      active,
      reserved,
      completed,
      totalRequests,
      saved: getSavedCount(),
      requested: getRequestedCount()
    };
  }


  function toggleSaveListing(id) {
    const savedIds = appState.user.savedListingIds;
    const listing = getListingById(id);
    if (!listing) return false;
    const index = savedIds.indexOf(id);
    if (index >= 0) {
      savedIds.splice(index, 1);
      listing.saveCount = Math.max(0, listing.saveCount - 1);
      showToast('Removed from saved items.');
    } else {
      savedIds.unshift(id);
      listing.saveCount += 1;
      addNotification(`You saved ${listing.title}.`);
      showToast('Saved to your items.', 'success');
    }
    saveState();
    return savedIds.includes(id);
  }

  function requestListing(id) {
    const listing = getListingById(id);
    if (!listing) return;
    if (listing.ownerId === appState.user.id) {
      showToast('You cannot request your own listing.', 'error');
      return null;
    }
    const existingRequest = getRequestRecord(id);
    if (!existingRequest) {
      listing.requestCount += 1;
      createOrUpdateRequest(id, 'pending');
      const conversation = createConversationForListing(id, `Hi! I’m interested in your ${listing.title}. Is it still available?`);
      addNotification(`Your request for ${listing.title} was sent.`);
      saveState();
      showToast('Request sent. Conversation added to Messages.', 'success');
      return conversation?.id;
    }
    showToast('You already requested this listing.');
    return getConversationByListingId(id)?.id;
  }

  function renderListingModal(listing, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !listing) return;
    const isSaved = appState.user.savedListingIds.includes(listing.id);
    const requested = appState.user.requestedListingIds.includes(listing.id);
    container.innerHTML = `
      <div class="modal-listing-layout">
        <div class="modal-listing-image" style="background-image:url('${escapeHtml(listing.image)}')"></div>
        <div class="modal-listing-copy">
          <p class="eyebrow">${escapeHtml(listing.category)} · ${escapeHtml(listing.condition)}</p>
          <h2>${escapeHtml(listing.title)}</h2>
          <p>${escapeHtml(listing.description)}</p>
          <div class="modal-meta-grid">
            <div><span class="mini-label">Location</span><strong>${escapeHtml(listing.location)}</strong></div>
            <div><span class="mini-label">Pickup</span><strong>${escapeHtml(listing.pickup)}</strong></div>
            <div><span class="mini-label">Distance</span><strong>${listing.distanceKm} km away</strong></div>
            <div><span class="mini-label">Posted</span><strong>${formatCreated(listing.createdAt)}</strong></div>
          </div>
          <p class="helper-text">${escapeHtml(listing.notes || 'No extra pickup notes.')}</p>
          <div class="form-actions stack-mobile">
            <button type="button" class="btn btn-soft modal-save-button" data-id="${listing.id}">${isSaved ? 'Saved' : 'Save item'}</button>
            <button type="button" class="btn btn-hero modal-request-button" data-id="${listing.id}">${requested ? 'Open messages' : 'Request item'}</button>
          </div>
        </div>
      </div>
    `;
  }

  function initBrowsePage() {
    const listingGrid = document.getElementById('listingGrid');
    if (!listingGrid) return;

    const state = {
      search: '',
      category: 'All',
      condition: 'All',
      distance: 999,
      sort: 'newest'
    };

    const searchInput = document.getElementById('browseSearch');
    const conditionFilter = document.getElementById('conditionFilter');
    const distanceFilter = document.getElementById('distanceFilter');
    const sortFilter = document.getElementById('sortFilter');
    const activeFilters = document.getElementById('activeFilters');
    const emptyState = document.getElementById('browseEmptyState');
    const resultsSummary = document.getElementById('resultsSummary');
    const savedSummary = document.getElementById('savedSummary');
    const requestsSummary = document.getElementById('requestsSummary');
    const headline = document.getElementById('browseResultsHeadline');
    const subline = document.getElementById('browseResultsSubline');
    const savedCountBadge = document.getElementById('savedCountBadge');
    const requestCountBadge = document.getElementById('requestCountBadge');
    const modal = document.getElementById('listingModal');

    function getFilteredListings() {
      let items = [...appState.listings].filter(listing => listing.status === 'active');
      if (state.search) {
        const term = state.search.toLowerCase();
        items = items.filter(listing =>
          [listing.title, listing.category, listing.location, listing.description].join(' ').toLowerCase().includes(term)
        );
      }
      if (state.category !== 'All') items = items.filter(listing => listing.category === state.category);
      if (state.condition !== 'All') items = items.filter(listing => listing.condition === state.condition);
      items = items.filter(listing => listing.distanceKm <= state.distance);
      items.sort((a, b) => {
        if (state.sort === 'nearest') return a.distanceKm - b.distanceKm;
        if (state.sort === 'popular') return b.requestCount - a.requestCount;
        if (state.sort === 'saved') return b.saveCount - a.saveCount;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return items;
    }

    function renderActiveFilters() {
      const filters = [];
      if (state.search) filters.push(`Search: ${state.search}`);
      if (state.category !== 'All') filters.push(`Category: ${state.category}`);
      if (state.condition !== 'All') filters.push(`Condition: ${state.condition}`);
      if (state.distance < 999) filters.push(`Within ${state.distance} km`);
      activeFilters.innerHTML = filters.length
        ? filters.map(filter => `<span class="filter-tag">${escapeHtml(filter)}</span>`).join('')
        : '<span class="helper-text">No active filters.</span>';
    }

    function renderListings() {
      const listings = getFilteredListings();
      listingGrid.innerHTML = listings.map(listing => {
        const saved = appState.user.savedListingIds.includes(listing.id);
        const requested = appState.user.requestedListingIds.includes(listing.id);
        return `
          <article class="listing-card reveal-card app-listing-card is-visible">
            <div class="listing-card__media app-listing-media" style="background-image:url('${escapeHtml(listing.image)}')">
              <div class="listing-card__topbar">
                <span class="listing-pill">${escapeHtml(listing.category)}</span>
                ${listing.urgent ? '<span class="listing-pill listing-pill--urgent">Urgent</span>' : ''}
              </div>
            </div>
            <div class="listing-card__body">
              <div class="listing-meta"><span>${escapeHtml(listing.condition)}</span><span>${listing.distanceKm} km away</span></div>
              <h3>${escapeHtml(listing.title)}</h3>
              <p>${escapeHtml(listing.description)}</p>
              <div class="listing-stats-row">
                <span>${escapeHtml(listing.location)}</span>
                <span>${listing.requestCount} requests · ${listing.saveCount} saves</span>
              </div>
              <div class="listing-footer listing-footer--actions">
                <button class="btn btn-soft listing-action" type="button" data-action="preview" data-id="${listing.id}">Preview</button>
                <button class="btn btn-soft listing-action" type="button" data-action="save" data-id="${listing.id}">${saved ? 'Saved' : 'Save'}</button>
                <button class="btn btn-hero listing-action" type="button" data-action="request" data-id="${listing.id}">${requested ? 'Open chat' : 'Request'}</button>
              </div>
            </div>
          </article>
        `;
      }).join('');

      emptyState.classList.toggle('hidden', listings.length !== 0);
      resultsSummary.textContent = `${listings.length} Results`;
      savedSummary.textContent = `${getSavedCount()} Saved`;
      requestsSummary.textContent = `${getRequestedCount()} Requested`;
      headline.textContent = `${listings.length} listings available`;
      subline.textContent = listings.length ? 'Updated instantly as you search and filter.' : 'Try changing the filters to reveal more listings.';
      savedCountBadge.textContent = getSavedCount();
      requestCountBadge.textContent = getRequestedCount();
      renderActiveFilters();
    }

    function resetFilters() {
      state.search = '';
      state.category = 'All';
      state.condition = 'All';
      state.distance = 999;
      state.sort = 'newest';
      searchInput.value = '';
      conditionFilter.value = 'All';
      distanceFilter.value = '999';
      sortFilter.value = 'newest';
      document.querySelectorAll('#categoryChips .chip').forEach(chip => {
        chip.classList.toggle('active-chip', chip.dataset.category === 'All');
      });
      renderListings();
    }

    searchInput.addEventListener('input', event => {
      state.search = event.target.value.trim();
      renderListings();
    });
    conditionFilter.addEventListener('change', event => {
      state.condition = event.target.value;
      renderListings();
    });
    distanceFilter.addEventListener('change', event => {
      state.distance = Number(event.target.value);
      renderListings();
    });
    sortFilter.addEventListener('change', event => {
      state.sort = event.target.value;
      renderListings();
    });

    document.querySelectorAll('#categoryChips .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        state.category = chip.dataset.category;
        document.querySelectorAll('#categoryChips .chip').forEach(item => item.classList.remove('active-chip'));
        chip.classList.add('active-chip');
        renderListings();
      });
    });

    document.getElementById('resetFilters')?.addEventListener('click', resetFilters);
    document.getElementById('emptyResetButton')?.addEventListener('click', resetFilters);

    listingGrid.addEventListener('click', event => {
      const actionButton = event.target.closest('[data-action]');
      if (!actionButton) return;
      const id = Number(actionButton.dataset.id);
      const listing = getListingById(id);
      if (!listing) return;
      if (actionButton.dataset.action === 'preview') {
        renderListingModal(listing, 'listingModalContent');
        openModal('listingModal');
        return;
      }
      if (actionButton.dataset.action === 'save') {
        toggleSaveListing(id);
        renderListings();
        return;
      }
      if (actionButton.dataset.action === 'request') {
        const conversationId = requestListing(id);
        renderListings();
        if (actionButton.textContent.includes('Open') || conversationId) {
          if (conversationId) sessionStorage.setItem('freesewaa-open-conversation', conversationId);
          window.location.href = 'messages.html';
        }
      }
    });

    modal?.addEventListener('click', event => {
      const saveButton = event.target.closest('.modal-save-button');
      const requestButton = event.target.closest('.modal-request-button');
      if (saveButton) {
        const id = Number(saveButton.dataset.id);
        toggleSaveListing(id);
        renderListingModal(getListingById(id), 'listingModalContent');
        renderListings();
      }
      if (requestButton) {
        const id = Number(requestButton.dataset.id);
        const conversationId = requestListing(id);
        renderListings();
        closeModals();
        if (conversationId) sessionStorage.setItem('freesewaa-open-conversation', conversationId);
        window.location.href = 'messages.html';
      }
    });

    renderListings();
  }

  function initDonatePage() {
    const form = document.getElementById('donateForm');
    if (!form) return;

    const fields = {
      title: document.getElementById('itemTitle'),
      category: document.getElementById('itemCategory'),
      description: document.getElementById('itemDescription'),
      condition: document.getElementById('itemCondition'),
      pickup: document.getElementById('itemPickup'),
      pickupWindow: document.getElementById('itemPickupWindow'),
      location: document.getElementById('itemLocation'),
      distance: document.getElementById('itemDistance'),
      notes: document.getElementById('itemNotes'),
      urgent: document.getElementById('itemUrgent')
    };

    const uploadInput = document.getElementById('imageUpload');
    const uploadTrigger = document.getElementById('uploadTrigger');
    const uploadPreviewGrid = document.getElementById('uploadPreviewGrid');
    const descriptionCount = document.getElementById('descriptionCount');
    const previewTitle = document.getElementById('listingPreviewTitle');
    const previewMeta = document.getElementById('listingPreviewMeta');
    const previewImage = document.getElementById('listingPreviewImage');
    const qualityScore = document.getElementById('qualityScore');
    const qualityText = document.getElementById('qualityText');
    const donateStatus = document.getElementById('donateStatus');
    const publishReview = document.getElementById('publishReview');
    const publishSuccess = document.getElementById('publishSuccess');
    const nextButton = document.getElementById('nextStepButton');
    const prevButton = document.getElementById('prevStepButton');
    const saveDraftButton = document.getElementById('saveDraftButton');
    const createAnotherButton = document.getElementById('createAnotherListing');
    const stepLabel = document.getElementById('donateStepLabel');
    const stepText = document.getElementById('donateStepText');
    const stepperDots = Array.from(document.querySelectorAll('#donateStepper .step-dot'));

    let imagePreviews = [];
    let currentStep = 1;
    const totalSteps = 4;

    const stepContent = {
      1: 'Start with strong images and a clear title so people can trust the listing quickly.',
      2: 'Describe the item honestly and clearly so the right person can request it faster.',
      3: 'Set pickup expectations and location details to reduce confusion later.',
      4: 'Review everything before publishing the listing into your app data.'
    };

    const draft = appState.user.drafts.donate;
    if (draft) {
      fields.title.value = draft.title || '';
      fields.category.value = draft.category || fields.category.value;
      fields.description.value = draft.description || '';
      fields.condition.value = draft.condition || fields.condition.value;
      fields.pickup.value = draft.pickup || fields.pickup.value;
      fields.pickupWindow.value = draft.pickupWindow || '';
      fields.location.value = draft.location || '';
      fields.distance.value = String(draft.distance || fields.distance.value);
      fields.notes.value = draft.notes || '';
      fields.urgent.checked = Boolean(draft.urgent);
      if (Array.isArray(draft.images)) {
        imagePreviews = draft.images;
        renderUploadPreviews();
      }
    }

    function getFormData() {
      return {
        title: fields.title.value.trim(),
        category: fields.category.value,
        description: fields.description.value.trim(),
        condition: fields.condition.value,
        pickup: fields.pickup.value,
        pickupWindow: fields.pickupWindow.value.trim(),
        location: fields.location.value.trim(),
        distance: Number(fields.distance.value),
        notes: fields.notes.value.trim(),
        urgent: fields.urgent.checked,
        images: imagePreviews
      };
    }

    function setStatus(message = '', tone = 'default') {
      donateStatus.textContent = message;
      donateStatus.dataset.tone = tone;
      donateStatus.classList.toggle('is-visible', Boolean(message));
    }

    function renderUploadPreviews() {
      uploadPreviewGrid.innerHTML = imagePreviews.map((src, index) => `
        <div class="upload-preview" style="background-image:url('${escapeHtml(src)}')">
          <button type="button" class="upload-preview__remove" data-index="${index}" aria-label="Remove image">×</button>
        </div>
      `).join('');
    }

    function formatFileSize(bytes) {
      if (!bytes) return '0 KB';
      if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    function dataUrlSize(dataUrl) {
      const base64 = String(dataUrl || '').split(',')[1] || '';
      return Math.ceil((base64.length * 3) / 4);
    }

    function compressImageFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const image = new Image();
          image.onload = () => {
            const maxEdge = 1600;
            const scale = Math.min(1, maxEdge / Math.max(image.width, image.height));
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(image.width * scale));
            canvas.height = Math.max(1, Math.round(image.height * scale));
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            let quality = 0.82;
            let dataUrl = canvas.toDataURL('image/jpeg', quality);
            while (dataUrlSize(dataUrl) > 700 * 1024 && quality > 0.5) {
              quality -= 0.08;
              dataUrl = canvas.toDataURL('image/jpeg', quality);
            }
            resolve({
              dataUrl,
              originalBytes: file.size,
              compressedBytes: dataUrlSize(dataUrl)
            });
          };
          image.onerror = () => reject(new Error(`Could not load ${file.name}.`));
          image.src = reader.result;
        };
        reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
        reader.readAsDataURL(file);
      });
    }


    function updatePreview() {
      const data = getFormData();
      descriptionCount.textContent = `${data.description.length} / 240`;
      previewTitle.textContent = data.title || 'Your listing preview';
      previewMeta.textContent = [data.category, data.condition, data.location || 'Add location'].filter(Boolean).join(' • ') || 'Add details and watch this card update live.';
      previewImage.style.backgroundImage = `url('${escapeHtml(data.images[0] || 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80')}')`;

      let score = 20;
      if (data.title) score += 15;
      if (data.description.length >= 40) score += 20;
      if (data.location) score += 15;
      if (data.pickupWindow) score += 10;
      if (data.images.length) score += 15;
      if (data.notes) score += 5;
      qualityScore.textContent = `Listing score: ${score}%`;
      qualityText.textContent = score >= 80
        ? 'This listing feels complete and trustworthy.'
        : 'Add a title, description, images, and location to make your listing feel more real.';

      publishReview.innerHTML = `
        <div class="review-card">
          <div class="review-card__image" style="background-image:url('${escapeHtml(data.images[0] || 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80')}')"></div>
          <div>
            <p class="eyebrow">FINAL REVIEW</p>
            <h3>${escapeHtml(data.title || 'Untitled listing')}</h3>
            <p>${escapeHtml(data.description || 'Add a description before publishing so people understand the listing.')}</p>
          </div>
        </div>
        <div class="modal-meta-grid">
          <div><span class="mini-label">Category</span><strong>${escapeHtml(data.category)}</strong></div>
          <div><span class="mini-label">Condition</span><strong>${escapeHtml(data.condition)}</strong></div>
          <div><span class="mini-label">Pickup</span><strong>${escapeHtml(data.pickup)}</strong></div>
          <div><span class="mini-label">Area</span><strong>${escapeHtml(data.location || 'Missing')}</strong></div>
        </div>
      `;
    }

    function saveDraft() {
      appState.user.drafts.donate = getFormData();
      saveState();
      setStatus('Draft saved in your browser app data.', 'success');
      showToast('Draft saved.', 'success');
    }

    function validateStep(step) {
      const data = getFormData();
      if (step === 1) {
        if (!data.title) return 'Add an item title before continuing.';
        return '';
      }
      if (step === 2) {
        if (data.description.length < 20) return 'Write a fuller description so the listing feels useful.';
        return '';
      }
      if (step === 3) {
        if (!data.location) return 'Add a location or area before reviewing.';
        return '';
      }
      return '';
    }

    function renderStep() {
      document.querySelectorAll('.donate-step').forEach(step => {
        step.classList.toggle('is-active', Number(step.dataset.step) === currentStep);
      });
      stepperDots.forEach((dot, index) => dot.classList.toggle('is-active', index + 1 <= currentStep));
      stepLabel.textContent = `Step ${currentStep} of ${totalSteps}`;
      stepText.textContent = stepContent[currentStep];
      prevButton.disabled = currentStep === 1;
      nextButton.textContent = currentStep === totalSteps ? 'Publish Listing' : 'Continue';
      publishSuccess.classList.add('hidden');
      updatePreview();
    }

    function resetForm() {
      form.reset();
      imagePreviews = [];
      renderUploadPreviews();
      delete appState.user.drafts.donate;
      saveState();
      currentStep = 1;
      setStatus('');
      renderStep();
    }

    function publishListing() {
      const data = getFormData();
      const listing = {
        id: Date.now(),
        ownerId: appState.user.id,
        ownerName: appState.user.name,
        title: data.title,
        category: data.category,
        condition: data.condition,
        location: data.location,
        distanceKm: data.distance,
        pickup: data.pickup,
        pickupWindow: data.pickupWindow || 'Flexible timing',
        description: data.description,
        notes: data.notes,
        image: data.images[0] || 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
        createdAt: new Date().toISOString(),
        requestCount: 0,
        saveCount: 0,
        urgent: data.urgent,
        status: 'active'
      };
      appState.listings.unshift(listing);
      delete appState.user.drafts.donate;
      addNotification(`Your listing "${listing.title}" is now live.`);
      saveState();
      publishSuccess.classList.remove('hidden');
      setStatus('Listing published successfully.', 'success');
      showToast('Listing published to Browse.', 'success');
      nextButton.disabled = true;
      prevButton.disabled = true;
      saveDraftButton.disabled = true;
    }

    uploadTrigger.addEventListener('click', () => uploadInput.click());
    uploadInput.addEventListener('change', event => {
      const files = Array.from(event.target.files || []).slice(0, 5);
      if (!files.length) return;
      const readers = files.map(file => new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(file);
      }));
      Promise.all(readers).then(images => {
        imagePreviews = [...imagePreviews, ...images].slice(0, 5);
        renderUploadPreviews();
        updatePreview();
        setStatus('Images added to your listing draft.', 'success');
      });
    });

    uploadPreviewGrid.addEventListener('click', event => {
      const button = event.target.closest('.upload-preview__remove');
      if (!button) return;
      imagePreviews.splice(Number(button.dataset.index), 1);
      renderUploadPreviews();
      updatePreview();
    });

    [fields.title, fields.category, fields.description, fields.condition, fields.pickup, fields.pickupWindow, fields.location, fields.distance, fields.notes, fields.urgent].forEach(field => {
      field.addEventListener(field.type === 'checkbox' ? 'change' : 'input', () => {
        setStatus('');
        updatePreview();
      });
    });

    saveDraftButton.addEventListener('click', saveDraft);
    prevButton.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep -= 1;
        renderStep();
      }
    });

    nextButton.addEventListener('click', () => {
      const error = validateStep(currentStep);
      if (error) {
        setStatus(error, 'error');
        showToast(error, 'error');
        return;
      }
      if (currentStep < totalSteps) {
        currentStep += 1;
        renderStep();
        return;
      }
      publishListing();
    });

    createAnotherButton?.addEventListener('click', () => {
      nextButton.disabled = false;
      prevButton.disabled = false;
      saveDraftButton.disabled = false;
      resetForm();
    });

    form.addEventListener('submit', event => event.preventDefault());
    renderStep();
  }

  function initMessagesPage() {
    const conversationList = document.getElementById('conversationList');
    if (!conversationList) return;

    const messageThread = document.getElementById('messageThread');
    const conversationHead = document.getElementById('conversationHead');
    const conversationSearch = document.getElementById('conversationSearch');
    const unreadSummary = document.getElementById('unreadSummary');
    const conversationCountLabel = document.getElementById('conversationCountLabel');
    const conversationStatusText = document.getElementById('conversationStatusText');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const confirmPickupButton = document.getElementById('confirmPickupButton');
    const listingContent = document.getElementById('conversationListingContent');

    let activeConversationId = sessionStorage.getItem('freesewaa-open-conversation') || appState.conversations[0]?.id;
    sessionStorage.removeItem('freesewaa-open-conversation');

    function getFilteredConversations() {
      const term = conversationSearch.value.trim().toLowerCase();
      const sorted = [...appState.conversations].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      return sorted.filter(conversation => {
        const listing = getListingById(conversation.listingId);
        const haystack = `${conversation.participant} ${listing?.title || ''}`.toLowerCase();
        return !term || haystack.includes(term);
      });
    }

    function renderConversationList() {
      const conversations = getFilteredConversations();
      const unread = appState.conversations.reduce((sum, item) => sum + item.unread, 0);
      unreadSummary.textContent = `${unread} unread`;
      conversationCountLabel.textContent = `${conversations.length} active conversations`;
      conversationStatusText.textContent = conversations.length
        ? 'Requests from Browse show up here automatically.'
        : 'Start by requesting an item from Browse.';

      conversationList.innerHTML = conversations.map(conversation => {
        const listing = getListingById(conversation.listingId);
        const latest = conversation.messages[conversation.messages.length - 1];
        return `
          <button class="chat-item ${conversation.id === activeConversationId ? 'active-chat' : ''}" data-conversation-id="${conversation.id}">
            <div class="chat-avatar avatar-generated">${initials(conversation.participant)}</div>
            <div class="chat-item__body">
              <strong>${escapeHtml(conversation.participant)}</strong>
              <p>${escapeHtml(latest?.text || 'No messages yet')}</p>
              <span class="chat-listing-label">${escapeHtml(listing?.title || 'Unknown listing')}</span>
            </div>
            <div class="chat-meta-block">
              <span class="chat-time">${timeAgo(conversation.updatedAt)}</span>
              ${conversation.unread ? `<span class="chat-unread">${conversation.unread}</span>` : ''}
            </div>
          </button>
        `;
      }).join('');

      if (!conversations.length) {
        conversationList.innerHTML = '<div class="empty-chat-state"><p class="eyebrow">NO CONVERSATIONS</p><p>Request an item from Browse to start talking here.</p></div>';
        messageThread.innerHTML = '';
        conversationHead.innerHTML = '';
        return;
      }

      if (!conversations.some(item => item.id === activeConversationId)) {
        activeConversationId = conversations[0].id;
      }

      renderActiveConversation();
    }

    function renderActiveConversation() {
      const conversation = appState.conversations.find(item => item.id === activeConversationId);
      if (!conversation) return;
      conversation.unread = 0;
      saveState();
      const listing = getListingById(conversation.listingId);
      conversationHead.innerHTML = `
        <div class="conversation-user">
          <div class="chat-avatar avatar-generated large">${initials(conversation.participant)}</div>
          <div>
            <strong>${escapeHtml(conversation.participant)}</strong>
            <p>About: ${escapeHtml(listing?.title || 'Unknown listing')} · ${escapeHtml(listing?.location || '')}</p>
          </div>
        </div>
        <div class="form-actions stack-mobile compact-actions">
          <button class="btn btn-soft" type="button" id="viewListingButton">View Listing</button>
          <button class="btn btn-soft" type="button" id="markReadyButton">Mark Ready</button>
        </div>
      `;

      messageThread.innerHTML = conversation.messages.map(message => `
        <div class="bubble ${message.type === 'sent' ? 'bubble-sent' : 'bubble-received'}">
          <div>${escapeHtml(message.text)}</div>
          <span class="bubble-time">${escapeHtml(message.time)}</span>
        </div>
      `).join('');
      messageThread.scrollTop = messageThread.scrollHeight;

      document.getElementById('viewListingButton')?.addEventListener('click', () => {
        renderListingModal(listing, 'conversationListingContent');
        openModal('conversationListingModal');
      });
      document.getElementById('markReadyButton')?.addEventListener('click', () => {
        pushMessage('Your item is packed and ready for pickup.', 'sent');
      });

      renderConversationListMetaOnly();
    }

    function renderConversationListMetaOnly() {
      const unread = appState.conversations.reduce((sum, item) => sum + item.unread, 0);
      unreadSummary.textContent = `${unread} unread`;
      document.querySelectorAll('[data-conversation-id]').forEach(button => {
        button.classList.toggle('active-chat', button.dataset.conversationId === activeConversationId);
      });
    }

    function pushMessage(text, type = 'sent') {
      const conversation = appState.conversations.find(item => item.id === activeConversationId);
      if (!conversation || !text.trim()) return;
      conversation.messages.push({
        sender: type === 'sent' ? 'You' : conversation.participant,
        text: text.trim(),
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        type
      });
      conversation.updatedAt = new Date().toISOString();
      if (type === 'sent') {
        addNotification(`You replied to ${conversation.participant}.`);
      }
      saveState();
      renderConversationList();
      showToast('Message sent.', 'success');
    }

    conversationList.addEventListener('click', event => {
      const button = event.target.closest('[data-conversation-id]');
      if (!button) return;
      activeConversationId = button.dataset.conversationId;
      renderConversationList();
    });

    conversationSearch.addEventListener('input', renderConversationList);

    messageForm.addEventListener('submit', event => {
      event.preventDefault();
      const text = messageInput.value.trim();
      if (!text) {
        showToast('Write a message first.', 'error');
        return;
      }
      pushMessage(text, 'sent');
      messageInput.value = '';
    });

    document.querySelectorAll('[data-quick-message]').forEach(button => {
      button.addEventListener('click', () => {
        messageInput.value = button.dataset.quickMessage;
        messageInput.focus();
      });
    });

    confirmPickupButton.addEventListener('click', () => {
      pushMessage('Pickup is confirmed. I will be there at the agreed time.', 'sent');
    });

    document.getElementById('conversationListingModal')?.addEventListener('click', event => {
      const saveButton = event.target.closest('.modal-save-button');
      const requestButton = event.target.closest('.modal-request-button');
      if (saveButton) {
        const id = Number(saveButton.dataset.id);
        toggleSaveListing(id);
        const listing = getListingById(id);
        renderListingModal(listing, 'conversationListingContent');
      }
      if (requestButton) {
        const id = Number(requestButton.dataset.id);
        sessionStorage.setItem('freesewaa-open-conversation', activeConversationId);
        closeModals();
        window.location.href = 'browse.html';
      }
    });

    renderConversationList();
  }

  function initMyPostsPage() {
    const grid = document.getElementById('myPostsGrid');
    if (!grid) return;
    const stats = document.getElementById('myPostsStats');
    const filterButtons = Array.from(document.querySelectorAll('[data-post-filter]'));
    let activeFilter = 'all';

    function render() {
      const listings = getUserListings().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const filtered = activeFilter === 'all' ? listings : listings.filter(item => item.status === activeFilter);
      const s = getUserStats();
      stats.innerHTML = `<div><span class="mini-label">Active</span><strong>${s.active}</strong></div><div><span class="mini-label">Reserved</span><strong>${s.reserved}</strong></div><div><span class="mini-label">Completed</span><strong>${s.completed}</strong></div><div><span class="mini-label">Requests</span><strong>${s.totalRequests}</strong></div>`;
      filterButtons.forEach(btn => btn.classList.toggle('active-chip', btn.dataset.postFilter === activeFilter));
      if (!filtered.length) {
        grid.innerHTML = '<article class="panel empty-state"><p class="eyebrow">NO MATCHING POSTS</p><h3>No listings in this status.</h3><p>Publish a new listing or switch the filter to see your full inventory.</p></article>';
        return;
      }
      grid.innerHTML = filtered.map(listing => `
        <article class="panel post-card">
          <div class="post-card__media" style="background-image:url('${escapeHtml(listing.image)}')"></div>
          <div class="post-card__body">
            <div class="post-card__top"><div><p class="eyebrow">${escapeHtml(listing.category)}</p><h3>${escapeHtml(listing.title)}</h3></div><span class="status-pill status-${escapeHtml(listing.status)}">${escapeHtml(listing.status)}</span></div>
            <p class="helper-text">${escapeHtml(listing.description)}</p>
            <div class="post-meta-row"><span>${escapeHtml(listing.location)}</span><span>${listing.requestCount} requests</span><span>${listing.saveCount} saves</span></div>
            <div class="post-actions">
              <button class="btn btn-soft" data-post-action="active" data-id="${listing.id}">Mark Active</button>
              <button class="btn btn-soft" data-post-action="reserved" data-id="${listing.id}">Reserve</button>
              <button class="btn btn-soft" data-post-action="donated" data-id="${listing.id}">Complete</button>
              <button class="btn btn-soft" data-post-open="${listing.id}">Preview</button>
              <button class="btn btn-soft danger-button" data-post-delete="${listing.id}">Delete</button>
            </div>
          </div>
        </article>`).join('');
    }

    filterButtons.forEach(button => button.addEventListener('click', () => {
      activeFilter = button.dataset.postFilter;
      render();
    }));

    grid.addEventListener('click', event => {
      const actionButton = event.target.closest('[data-post-action]');
      const previewButton = event.target.closest('[data-post-open]');
      const deleteButton = event.target.closest('[data-post-delete]');
      if (actionButton) {
        markListingStatus(Number(actionButton.dataset.id), actionButton.dataset.postAction);
        showToast('Listing status updated.', 'success');
        render();
      }
      if (previewButton) {
        renderListingModal(getListingById(Number(previewButton.dataset.postOpen)), 'accountListingContent');
        openModal('accountListingModal');
      }
      if (deleteButton) {
        deleteListingById(Number(deleteButton.dataset.postDelete));
        showToast('Listing deleted.', 'success');
        render();
      }
    });

    render();
  }

  function initSavedPage() {
    const grid = document.getElementById('savedGrid');
    if (!grid) return;
    const count = document.getElementById('savedCount');
    function render() {
      const listings = getSavedListings();
      count.textContent = `${listings.length} saved items`;
      if (!listings.length) {
        grid.innerHTML = '<article class="panel empty-state"><p class="eyebrow">NOTHING SAVED</p><h3>Your shortlist is empty.</h3><p>Save items from Browse to compare them here later.</p></article>';
        return;
      }
      grid.innerHTML = listings.map(listing => {
        const request = getRequestRecord(listing.id);
        return `<article class="panel saved-card"><div class="saved-card__media" style="background-image:url('${escapeHtml(listing.image)}')"></div><div class="saved-card__body"><div class="panel-head--between"><div><p class="eyebrow">${escapeHtml(listing.category)} · ${escapeHtml(listing.condition)}</p><h3>${escapeHtml(listing.title)}</h3></div><span class="status-pill status-${request ? escapeHtml(request.status) : 'active'}">${request ? escapeHtml(request.status) : 'saved'}</span></div><p class="helper-text">${escapeHtml(listing.description)}</p><div class="post-meta-row"><span>${escapeHtml(listing.location)}</span><span>${listing.distanceKm} km</span><span>${listing.ownerName || 'Community Member'}</span></div><div class="post-actions"><button class="btn btn-soft" data-saved-open="${listing.id}">Preview</button><button class="btn btn-soft" data-saved-request="${listing.id}">${request ? 'Open Request Chat' : 'Request Item'}</button><button class="btn btn-soft" data-saved-remove="${listing.id}">Remove</button></div></div></article>`;
      }).join('');
    }

    grid.addEventListener('click', event => {
      const preview = event.target.closest('[data-saved-open]');
      const request = event.target.closest('[data-saved-request]');
      const remove = event.target.closest('[data-saved-remove]');
      if (preview) {
        renderListingModal(getListingById(Number(preview.dataset.savedOpen)), 'accountListingContent');
        openModal('accountListingModal');
      }
      if (request) {
        const id = Number(request.dataset.savedRequest);
        const conversationId = requestListing(id) || getConversationByListingId(id)?.id;
        if (conversationId) {
          sessionStorage.setItem('freesewaa-open-conversation', conversationId);
          window.location.href = 'messages.html';
        }
      }
      if (remove) {
        toggleSaveListing(Number(remove.dataset.savedRemove));
        render();
      }
    });

    render();
  }

  function initRequestsPage() {
    const grid = document.getElementById('requestsGrid');
    if (!grid) return;
    const stats = document.getElementById('requestsStats');

    function render() {
      const items = getRequestedListings().sort((a, b) => new Date(b.request.requestedAt) - new Date(a.request.requestedAt));
      const pending = items.filter(item => item.request.status === 'pending').length;
      const approved = items.filter(item => item.request.status === 'approved').length;
      const completed = items.filter(item => item.request.status === 'completed').length;
      stats.innerHTML = `<div><span class="mini-label">Pending</span><strong>${pending}</strong></div><div><span class="mini-label">Approved</span><strong>${approved}</strong></div><div><span class="mini-label">Completed</span><strong>${completed}</strong></div>`;
      if (!items.length) {
        grid.innerHTML = '<article class="panel empty-state"><p class="eyebrow">NO REQUESTS</p><h3>You have not requested anything yet.</h3><p>Browse community listings and send a request to see the workflow here.</p></article>';
        return;
      }
      grid.innerHTML = items.map(({ request, listing }) => `
        <article class="panel request-card">
          <div class="request-card__media" style="background-image:url('${escapeHtml(listing.image)}')"></div>
          <div class="request-card__body">
            <div class="panel-head--between"><div><p class="eyebrow">${escapeHtml(listing.category)} · Requested ${formatCreated(request.requestedAt)}</p><h3>${escapeHtml(listing.title)}</h3></div><span class="status-pill status-${escapeHtml(request.status)}">${escapeHtml(request.status)}</span></div>
            <p class="helper-text">Owner: ${escapeHtml(listing.ownerName || 'Community Member')} · ${escapeHtml(listing.location)}</p>
            <p class="helper-text">${escapeHtml(request.note || listing.pickupWindow || 'Waiting for the owner to confirm details.')}</p>
            <div class="post-actions">
              <button class="btn btn-soft" data-request-message="${listing.id}">Open Chat</button>
              <button class="btn btn-soft" data-request-status="approved" data-id="${listing.id}">Mark Approved</button>
              <button class="btn btn-soft" data-request-status="completed" data-id="${listing.id}">Mark Received</button>
              <button class="btn btn-soft danger-button" data-request-cancel="${listing.id}">Cancel</button>
            </div>
          </div>
        </article>`).join('');
    }

    grid.addEventListener('click', event => {
      const msg = event.target.closest('[data-request-message]');
      const setStatus = event.target.closest('[data-request-status]');
      const cancel = event.target.closest('[data-request-cancel]');
      if (msg) {
        const listingId = Number(msg.dataset.requestMessage);
        const conversation = createConversationForListing(listingId, 'Hi again — following up on my request.');
        sessionStorage.setItem('freesewaa-open-conversation', conversation.id);
        window.location.href = 'messages.html';
      }
      if (setStatus) {
        const listingId = Number(setStatus.dataset.id);
        const request = createOrUpdateRequest(listingId, setStatus.dataset.requestStatus);
        if (request.status === 'completed') addNotification(`You marked ${getListingById(listingId)?.title || 'a listing'} as received.`);
        render();
        showToast('Request updated.', 'success');
      }
      if (cancel) {
        removeRequest(Number(cancel.dataset.requestCancel));
        render();
        showToast('Request cancelled.', 'success');
      }
    });

    render();
  }

  function initNotificationsPage() {
    const list = document.getElementById('notificationsList');
    if (!list) return;
    const unreadEl = document.getElementById('notificationsUnread');
    const markAll = document.getElementById('markAllReadButton');

    function render() {
      const items = [...appState.notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const unread = items.filter(item => !item.read).length;
      unreadEl.textContent = `${unread} unread`;
      if (!items.length) {
        list.innerHTML = '<article class="panel empty-state"><p class="eyebrow">ALL CLEAR</p><h3>No notifications yet.</h3><p>New saves, requests, and replies will appear here automatically.</p></article>';
        return;
      }
      list.innerHTML = items.map(item => `<article class="panel notification-card notification-card--app ${item.read ? '' : 'notification-card--unread'}"><div class="notification-dot ${item.read ? '' : 'new-dot'}"></div><div><strong>${escapeHtml(item.text)}</strong><p>${escapeHtml(item.type)} update · ${timeAgo(item.createdAt)} ago</p></div><div class="notification-actions"><span class="notification-time">${formatCreated(item.createdAt)}</span><button class="btn btn-soft notification-btn" data-notification-read="${item.id}">${item.read ? 'Read' : 'Mark read'}</button></div></article>`).join('');
    }

    list.addEventListener('click', event => {
      const btn = event.target.closest('[data-notification-read]');
      if (!btn) return;
      const item = appState.notifications.find(n => n.id === btn.dataset.notificationRead);
      if (item) item.read = true;
      saveState();
      render();
    });

    markAll?.addEventListener('click', () => {
      appState.notifications.forEach(item => { item.read = true; });
      saveState();
      render();
      showToast('All notifications marked as read.', 'success');
    });

    render();
  }

  function initProfilePage() {
    const form = document.getElementById('profileForm');
    if (!form) return;
    const summary = document.getElementById('profileSummary');
    const stats = document.getElementById('profileStats');
    const status = document.getElementById('profileStatus');
    const fields = {
      firstName: document.getElementById('profileFirstName'),
      lastName: document.getElementById('profileLastName'),
      email: document.getElementById('profileEmail'),
      phone: document.getElementById('profilePhone'),
      city: document.getElementById('profileCity'),
      region: document.getElementById('profileRegion'),
      bio: document.getElementById('profileBio'),
      pickupAvailability: document.getElementById('profilePickupAvailability'),
      language: document.getElementById('profileLanguage'),
      notifications: document.getElementById('profileNotifications'),
      pickupReminders: document.getElementById('profilePickupReminders')
    };

    function fill() {
      Object.keys(fields).forEach(key => {
        if (fields[key]?.type === 'checkbox') {
          fields[key].checked = Boolean(appState.user.preferences[key]);
        } else if (fields[key]) {
          fields[key].value = appState.user[key] || appState.user.preferences[key] || '';
        }
      });
      const userStats = getUserStats();
      summary.innerHTML = `<div class="profile-avatar-large">${initials(appState.user.name)}</div><div><p class="eyebrow">COMMUNITY PROFILE</p><h2>${escapeHtml(appState.user.name)}</h2><p class="helper-text">Member since ${formatCreated(appState.user.joinedAt)} · ${escapeHtml(appState.user.city)}, ${escapeHtml(appState.user.region)}</p><p class="helper-text">${escapeHtml(appState.user.bio)}</p></div>`;
      stats.innerHTML = `<div><span class="mini-label">Donations completed</span><strong>${userStats.completed}</strong></div><div><span class="mini-label">Active listings</span><strong>${userStats.active}</strong></div><div><span class="mini-label">Saved items</span><strong>${userStats.saved}</strong></div><div><span class="mini-label">Requests sent</span><strong>${userStats.requested}</strong></div>`;
    }

    form.addEventListener('submit', event => {
      event.preventDefault();
      appState.user.firstName = fields.firstName.value.trim();
      appState.user.lastName = fields.lastName.value.trim();
      appState.user.name = `${appState.user.firstName} ${appState.user.lastName}`.trim();
      appState.user.email = fields.email.value.trim();
      appState.user.phone = fields.phone.value.trim();
      appState.user.city = fields.city.value.trim();
      appState.user.region = fields.region.value.trim();
      appState.user.bio = fields.bio.value.trim();
      appState.user.pickupAvailability = fields.pickupAvailability.value.trim();
      appState.user.preferences.language = fields.language.value;
      appState.user.preferences.notifications = fields.notifications.checked;
      appState.user.preferences.pickupReminders = fields.pickupReminders.checked;
      appState.listings = appState.listings.map(listing => listing.ownerId === appState.user.id ? { ...listing, ownerName: appState.user.name } : listing);
      saveState();
      status.textContent = 'Profile saved. Your connected pages now use the updated information.';
      status.classList.add('is-visible');
      fill();
      showToast('Profile updated.', 'success');
    });

    fill();
  }


  function enhanceMenus() {
    const settingsMenu = document.querySelector('.settings-menu');
    if (settingsMenu && !settingsMenu.querySelector('[data-dynamic-panel-link]')) {
      const panelLink = document.createElement('a');
      panelLink.href = isAdmin() ? 'admin.html' : 'user-panel.html';
      panelLink.textContent = isAdmin() ? 'Admin Panel' : 'User Panel';
      panelLink.setAttribute('data-dynamic-panel-link', 'true');
      settingsMenu.prepend(panelLink);
    }
    const nav = document.querySelector('.main-nav');
    if (nav && !nav.querySelector('[data-dynamic-audit-link]')) {
      const link = document.createElement('a');
      link.href = isAdmin() ? 'admin.html' : 'user-panel.html';
      link.className = 'nav-link';
      link.textContent = isAdmin() ? 'Admin' : 'Dashboard';
      link.setAttribute('data-dynamic-audit-link', 'true');
      nav.appendChild(link);
    }
  }

  function initUserPanelPage() {
    const nameEls = document.querySelectorAll('[data-user-name]');
    nameEls.forEach(el => el.textContent = appState.user.name || 'Member');
    const stats = getUserStats();
    document.querySelectorAll('[data-stat-active]').forEach(el => el.textContent = stats.active);
    document.querySelectorAll('[data-stat-requested]').forEach(el => el.textContent = stats.requested);
    document.querySelectorAll('[data-stat-saved]').forEach(el => el.textContent = stats.saved);
    document.querySelectorAll('[data-stat-completed]').forEach(el => el.textContent = stats.completed);
    const recent = document.getElementById('userPanelListings');
    if (recent) {
      const items = getUserListings().slice(0, 4);
      recent.innerHTML = items.length ? items.map(item => `
        <article class="mini-panel-card">
          <div class="mini-panel-card__thumb" style="background-image:url('${escapeHtml(item.image)}')"></div>
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.category)} · ${escapeHtml(item.status)}</p>
          </div>
        </article>
      `).join('') : '<p class="muted-copy">No listings yet. Start with your first donation post.</p>';
    }
  }

  async function initAdminPage() {
    if (!isAdmin()) {
      window.location.replace('user-panel.html');
      return;
    }
    const data = await fetchAdminOverview();
    const summary = data?.summary;
    if (!summary) return;
    const mapping = {
      users: summary.users,
      listings: summary.listings,
      active: summary.activeListings,
      donated: summary.donatedListings,
      reserved: summary.reservedListings,
      conversations: summary.conversations
    };
    Object.entries(mapping).forEach(([key, value]) => {
      document.querySelectorAll(`[data-admin-${key}]`).forEach(el => el.textContent = value);
    });
    const adminList = document.getElementById('adminUserList');
    if (adminList) {
      adminList.innerHTML = (data.users || []).map(user => `
        <article class="mini-panel-card mini-panel-card--row">
          <div>
            <strong>${escapeHtml(user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Member')}</strong>
            <p>${escapeHtml(user.email || user.phone || 'No contact')}</p>
          </div>
          <span class="badge-pill">${escapeHtml(user.role || 'user')}</span>
        </article>
      `).join('');
    }
  }

  async function initAuditPage(type) {
    const data = await fetchAuditData();
    if (!data) return;
    const findings = data[type] || [];
    const target = document.getElementById('auditFindings');
    if (target) {
      target.innerHTML = findings.map(item => `
        <article class="audit-card audit-card--${escapeHtml(item.status)}">
          <span class="badge-pill">${escapeHtml(item.status)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `).join('');
    }
    document.querySelectorAll('[data-audit-generated-at]').forEach(el => {
      el.textContent = new Date(data.product?.generatedAt || Date.now()).toLocaleString();
    });
  }


  function initCurrentPage() {
    if (page === 'browse') initBrowsePage();
    if (page === 'donate') initDonatePage();
    if (page === 'messages') initMessagesPage();
    if (page === 'my-posts') initMyPostsPage();
    if (page === 'saved') initSavedPage();
    if (page === 'requests') initRequestsPage();
    if (page === 'notifications') initNotificationsPage();
    if (page === 'profile') initProfilePage();
    if (page === 'user-panel') initUserPanelPage();
    if (page === 'admin') initAdminPage();
    if (page === 'security-audit') initAuditPage('security');
    if (page === 'accessibility-audit') initAuditPage('accessibility');
  }

  async function bootApp() {
    if (!isAuthenticated()) {
      window.location.replace('signin.html');
      return;
    }

    const remoteState = await fetchRemoteState();
    if (remoteState) {
      appState = normalizeState(remoteState);
      localStorage.setItem(STORAGE_KEYS.app, JSON.stringify(appState));
    }

    initCurrentPage();
  }

  bootApp();
})();

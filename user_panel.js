(function(){
  if (document.body.dataset.page !== 'user-panel') return;

  const STORAGE = {
    user: 'freesewaa-user',
    currentUserId: 'freesewaa-current-user-id',
    token: 'freesewaa-token'
  };

  function getStoredUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE.user) || '{}');
    } catch {
      return {};
    }
  }

  function currentUserId(){
    const user = getStoredUser();
    return user.id || localStorage.getItem(STORAGE.currentUserId) || '';
  }

  function escapeHtml(value){
    return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  function fmtDate(value){
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '—';
    return d.toLocaleDateString([], { month:'short', day:'numeric' });
  }

  function authHeaders() {
    const token = localStorage.getItem(STORAGE.token) || '';
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async function fetchJson(url){
    const response = await fetch(url, { headers: authHeaders() });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Request failed.');
    return data;
  }

  async function loadPanel(){
    const user = getStoredUser();
    if (!user.id) {
      window.location.replace('signin.html');
      return;
    }
    if (user.role === 'admin') {
      window.location.replace('admin.html');
      return;
    }

    const payload = await fetchJson(`/api/state?userId=${encodeURIComponent(currentUserId())}`);
    const state = payload.state || {};
    const listings = state.listings || [];
    const myListings = listings.filter(item => String(item.ownerId) === String(user.id));
    const requests = state.requests || [];
    const savedIds = new Set((state.user?.savedListingIds || []));
    const saved = listings.filter(item => savedIds.has(item.id));
    const unreadMessages = (state.conversations || []).reduce((sum, item) => sum + (item.unread || 0), 0);

    document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = user.name || 'Member');
    const roleBadge = document.querySelector('[data-user-role-badge]');
    if (roleBadge) roleBadge.textContent = user.role === 'admin' ? 'Admin' : 'User member';

    const setMetric = (selector, value) => document.querySelectorAll(selector).forEach(el => el.textContent = value);
    setMetric('[data-user-active]', myListings.filter(item => item.status === 'active').length);
    setMetric('[data-user-requests]', requests.length);
    setMetric('[data-user-saved]', saved.length);
    setMetric('[data-user-unread]', unreadMessages);

    const summary = document.getElementById('userProfileSummary');
    if (summary) {
      summary.innerHTML = `
        <div class="user-summary-card__avatar">${escapeHtml((user.name || 'M').charAt(0).toUpperCase())}</div>
        <div>
          <strong>${escapeHtml(user.name || 'Member')}</strong>
          <p>${escapeHtml(user.email || user.phone || 'No contact')}</p>
          <p>${escapeHtml((state.user?.city || user.city || 'Ulsan'))}, ${escapeHtml((state.user?.region || user.region || 'Nam-gu'))}</p>
        </div>
      `;
    }

    const postsEl = document.getElementById('userPostsList');
    if (postsEl) {
      postsEl.innerHTML = myListings.length ? myListings.slice(0, 5).map(item => `
        <article class="mini-panel-card mini-panel-card--row">
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.category)} · ${escapeHtml(item.status || 'active')} · ${escapeHtml(fmtDate(item.createdAt))}</p>
          </div>
          <span class="badge-pill">${escapeHtml(String(item.requestCount || 0))} requests</span>
        </article>
      `).join('') : '<div class="admin-empty">You have not created any donation posts yet.</div>';
    }

    const requestsEl = document.getElementById('userRequestsList');
    if (requestsEl) {
      requestsEl.innerHTML = requests.length ? requests.slice(0, 5).map(item => {
        const listing = listings.find(listing => String(listing.id) === String(item.listingId));
        return `
          <article class="mini-panel-card mini-panel-card--row">
            <div>
              <strong>${escapeHtml(listing?.title || `Listing #${item.listingId}`)}</strong>
              <p>${escapeHtml(item.status || 'pending')} · ${escapeHtml(fmtDate(item.requestedAt))}</p>
            </div>
            <span class="badge-pill">${escapeHtml(item.note || 'No note')}</span>
          </article>
        `;
      }).join('') : '<div class="admin-empty">You have not sent any requests yet.</div>';
    }

    const savedEl = document.getElementById('userSavedList');
    if (savedEl) {
      savedEl.innerHTML = saved.length ? saved.slice(0, 5).map(item => `
        <article class="mini-panel-card mini-panel-card--row">
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.location || 'No location')} · ${escapeHtml(item.category || 'General')}</p>
          </div>
          <span class="badge-pill">saved</span>
        </article>
      `).join('') + `
      <article class="mini-panel-card mini-panel-card--row">
        <div>
          <strong>Unread messages</strong>
          <p>${escapeHtml(String(unreadMessages))} unread messages in your conversations</p>
        </div>
        <a class="btn btn-soft" href="messages.html">Open messages</a>
      </article>` : `
      <article class="mini-panel-card mini-panel-card--row">
        <div>
          <strong>No saved items yet</strong>
          <p>Browse the marketplace and save helpful items for later.</p>
        </div>
        <a class="btn btn-soft" href="browse.html">Browse items</a>
      </article>
      <article class="mini-panel-card mini-panel-card--row">
        <div>
          <strong>Unread messages</strong>
          <p>${escapeHtml(String(unreadMessages))} unread messages in your conversations</p>
        </div>
        <a class="btn btn-soft" href="messages.html">Open messages</a>
      </article>`;
    }
  }

  loadPanel().catch(error => {
    console.error(error);
  });
})();

(() => {
  const state = {
    data: null,
    audits: null,
    queueFilter: 'all',
    userFilter: '',
    userStatusFilter: 'all',
    listingFilter: '',
    listingStatusFilter: 'all'
  };

  const token = () => localStorage.getItem('freesewaa-token') || '';
  const currentUser = () => {
    try { return JSON.parse(localStorage.getItem('freesewaa-user') || '{}'); }
    catch { return {}; }
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

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  function fmtDate(value) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat('en-CA', {
      month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
    }).format(date);
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(el => { el.textContent = value; });
  }

  function showToast(message, tone = 'default') {
    const toast = document.getElementById('adminToast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `admin-toast is-visible tone-${tone}`;
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      toast.className = 'admin-toast';
    }, 2600);
  }

  async function api(path, options = {}) {
    const headers = Object.assign({ 'Content-Type': 'application/json' }, options.headers || {});
    const sessionToken = token();
    const userId = currentUser().id || localStorage.getItem('freesewaa-current-user-id') || '';
    if (sessionToken) headers.Authorization = `Bearer ${sessionToken}`;
    if (userId) headers['x-user-id'] = userId;
    const response = await fetch(apiUrl(path), { ...options, headers });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || 'Request failed.');
    }
    return data;
  }

  async function logoutToIndex() {
    try {
      const sessionToken = token();
      const userId = currentUser().id || localStorage.getItem('freesewaa-current-user-id') || '';
      await fetch(apiUrl('/api/auth/logout'), {
        method: 'POST',
        headers: {
          ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}),
          ...(userId ? { 'x-user-id': userId } : {})
        }
      });
    } catch (error) {}
    localStorage.removeItem('freesewaa-auth');
    localStorage.removeItem('freesewaa-current-user-id');
    localStorage.removeItem('freesewaa-token');
    localStorage.removeItem('freesewaa-user');
    window.location.replace('/index.html');
  }

  document.getElementById('adminLogoutButton')?.addEventListener('click', logoutToIndex);

  function ensureAdminAccess() {
    const user = currentUser();
    const authed = localStorage.getItem('freesewaa-auth') === 'true';
    if (!authed || !user?.id || user.role !== 'admin') {
      window.location.replace('/admin_login.html');
      return false;
    }
    return true;
  }

  async function loadDashboard() {
    try {
      const [overview, audits] = await Promise.all([
        api('/api/admin/overview'),
        api('/api/audits')
      ]);
      state.data = overview;
      state.audits = audits;
      render();
    } catch (error) {
      if (/Admin access required/i.test(error.message)) {
        localStorage.removeItem('freesewaa-auth');
        localStorage.removeItem('freesewaa-token');
        window.location.replace('/admin_login.html');
        return;
      }
      showToast(error.message || 'Could not load admin panel.', 'error');
    }
  }

  function getSummary() {
    return state.data?.summary || {};
  }

  function updateOverview() {
    const summary = getSummary();
    setText('[data-admin-users]', String(summary.users || 0));
    setText('[data-admin-admins]', String(summary.admins || 0));
    setText('[data-admin-blocked-users]', String(summary.blockedUsers || 0));
    setText('[data-admin-listings]', String(summary.listings || 0));
    setText('[data-admin-active]', String(summary.activeListings || 0));
    setText('[data-admin-hidden]', String((summary.listings || 0) - (summary.activeListings || 0) - (summary.reservedListings || 0) - (summary.donatedListings || 0) + ((state.data?.listings || []).filter(item => item.status === 'hidden').length || 0)));
    setText('[data-admin-featured]', String(summary.featuredListings || 0));
    setText('[data-admin-flagged]', String(summary.flaggedListings || 0));
    setText('[data-admin-unread]', String(summary.unreadNotifications || 0));
    setText('[data-admin-conversations]', String(summary.conversations || 0));
    setText('[data-admin-open-risks]', String(summary.openRisks || 0));
    setText('[data-admin-last-updated]', fmtDate(summary.lastUpdatedAt));
    setText('[data-admin-health-score]', `${summary.healthScore || 0}/100`);
    setText('[data-admin-health-score-big]', String(summary.healthScore || 0));

    const score = Math.max(0, Math.min(100, Number(summary.healthScore || 0)));
    const bar = document.querySelector('[data-admin-health-bar]');
    if (bar) bar.style.width = `${score}%`;

    const healthText = score >= 90
      ? 'Marketplace health is strong. Risks are low and review volume is manageable.'
      : score >= 78
        ? 'Marketplace health is stable. A few items still need moderation attention.'
        : 'Marketplace health needs attention. Review the queue and blocked-user list.';
    setText('[data-admin-health-text]', healthText);
  }

  function queueMatches(item) {
    if (state.queueFilter === 'urgent') return !!item.urgent;
    if (state.queueFilter === 'reviewed') return !!item.reviewed;
    return true;
  }

  function renderModeration() {
    const target = document.getElementById('adminModerationQueue');
    if (!target) return;
    const queue = (state.data?.moderationQueue || []).filter(queueMatches);
    if (!queue.length) {
      target.innerHTML = '<div class="admin-empty">No listings match this moderation view.</div>';
      return;
    }
    target.innerHTML = queue.map(item => {
      const flags = (item.flags || []).map(flag => `<span class="admin-tag admin-tag--warning">${escapeHtml(flag)}</span>`).join('');
      const statusTag = `<span class="admin-tag">${escapeHtml(item.status || 'active')}</span>`;
      const reviewedTag = item.reviewed ? '<span class="admin-tag admin-tag--success">reviewed</span>' : '';
      const urgentTag = item.urgent ? '<span class="admin-tag admin-tag--danger">urgent</span>' : '';
      return `
        <article class="admin-v2-itemcard admin-v2-itemcard--priority">
          <div class="admin-v2-itemcard__top">
            <div>
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.ownerName || 'Unknown owner')} · ${escapeHtml(item.category || 'General')} · ${escapeHtml(item.location || 'No location')}</p>
            </div>
            <div class="admin-v2-tags">${flags}${reviewedTag}${urgentTag}${statusTag}</div>
          </div>
          <p>${escapeHtml(item.description || 'No description')}</p>
          <div class="admin-row-actions">
            <button class="admin-btn admin-btn--soft" data-listing-action="${item.featured ? 'unfeature' : 'feature'}" data-listing-id="${escapeHtml(item.id)}">${item.featured ? 'Remove feature' : 'Feature'}</button>
            <button class="admin-btn" data-listing-action="review" data-listing-id="${escapeHtml(item.id)}">${item.reviewed ? 'Reviewed' : 'Mark reviewed'}</button>
            <button class="admin-btn" data-listing-action="${item.status === 'hidden' ? 'restore' : 'hide'}" data-listing-id="${escapeHtml(item.id)}">${item.status === 'hidden' ? 'Restore' : 'Hide'}</button>
            <button class="admin-btn admin-btn--danger" data-listing-action="delete" data-listing-id="${escapeHtml(item.id)}">Delete</button>
          </div>
        </article>`;
    }).join('');
  }

  function userMatches(user) {
    const query = state.userFilter.trim().toLowerCase();
    const hay = `${user.name || ''} ${user.email || ''} ${user.phone || ''}`.toLowerCase();
    if (query && !hay.includes(query)) return false;
    if (state.userStatusFilter === 'active' && user.isBlocked) return false;
    if (state.userStatusFilter === 'blocked' && !user.isBlocked) return false;
    if (state.userStatusFilter === 'admins' && user.role !== 'admin') return false;
    return true;
  }

  function renderUsers() {
    const target = document.getElementById('adminUsersList');
    if (!target) return;
    const me = String(currentUser().id || '');
    const users = (state.data?.users || []).filter(userMatches);
    if (!users.length) {
      target.innerHTML = '<div class="admin-empty">No users match this filter.</div>';
      return;
    }
    target.innerHTML = users.map(user => {
      const self = String(user.id) === me;
      return `
        <article class="admin-v2-itemcard">
          <div class="admin-v2-itemcard__top">
            <div>
              <strong>${escapeHtml(user.name || 'Member')}</strong>
              <p>${escapeHtml(user.email || user.phone || 'No contact')} · Joined ${escapeHtml(fmtDate(user.createdAt))}</p>
            </div>
            <div class="admin-v2-tags">
              <span class="admin-tag">${escapeHtml(user.role || 'user')}</span>
              ${user.isBlocked ? '<span class="admin-tag admin-tag--danger">blocked</span>' : '<span class="admin-tag admin-tag--success">active</span>'}
              <span class="admin-tag">${escapeHtml(String(user.listingCount || 0))} posts</span>
            </div>
          </div>
          <p>${self ? 'This is your current admin account. Self-destructive actions are disabled.' : 'Use admin actions carefully to protect trust and safety across the platform.'}</p>
          <div class="admin-row-actions">
            ${self ? '<span class="admin-tag">current admin</span>' : `
              <button class="admin-btn ${user.isBlocked ? '' : 'admin-btn--danger'}" data-user-action="${user.isBlocked ? 'unblock' : 'block'}" data-user-id="${escapeHtml(user.id)}">${user.isBlocked ? 'Unblock' : 'Block'}</button>
              ${user.role === 'admin'
                ? `<button class="admin-btn" data-user-action="remove-admin" data-user-id="${escapeHtml(user.id)}">Remove admin</button>`
                : `<button class="admin-btn admin-btn--soft" data-user-action="make-admin" data-user-id="${escapeHtml(user.id)}">Make admin</button>`}
              <button class="admin-btn admin-btn--danger" data-user-action="delete-user" data-user-id="${escapeHtml(user.id)}">Delete user</button>`}
          </div>
        </article>`;
    }).join('');
  }

  function listingMatches(item) {
    const query = state.listingFilter.trim().toLowerCase();
    const hay = `${item.title || ''} ${item.category || ''} ${item.ownerName || ''} ${item.location || ''}`.toLowerCase();
    if (query && !hay.includes(query)) return false;
    if (state.listingStatusFilter === 'flagged' && !(item.flags || []).length) return false;
    if (state.listingStatusFilter === 'hidden' && item.status !== 'hidden') return false;
    if (state.listingStatusFilter === 'featured' && !item.featured) return false;
    if (state.listingStatusFilter === 'active' && item.status !== 'active') return false;
    return true;
  }

  function enrichedListings() {
    return (state.data?.listings || []).map(item => {
      const flags = [];
      if (item.urgent) flags.push('Urgent');
      if ((item.requestCount || 0) >= 4) flags.push('High demand');
      if (!item.reviewed && ((item.requestCount || 0) >= 2 || item.urgent)) flags.push('Needs review');
      return { ...item, flags };
    });
  }

  function renderListings() {
    const target = document.getElementById('adminListingsList');
    if (!target) return;
    const listings = enrichedListings().filter(listingMatches);
    if (!listings.length) {
      target.innerHTML = '<div class="admin-empty">No listings match this filter.</div>';
      return;
    }
    target.innerHTML = listings.map(item => `
      <article class="admin-v2-itemcard">
        <div class="admin-v2-itemcard__top">
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.ownerName || 'Unknown owner')} · ${escapeHtml(item.category || 'General')} · ${escapeHtml(item.location || 'No location')}</p>
          </div>
          <div class="admin-v2-tags">
            ${(item.flags || []).map(flag => `<span class="admin-tag admin-tag--warning">${escapeHtml(flag)}</span>`).join('')}
            ${item.featured ? '<span class="admin-tag admin-tag--success">featured</span>' : ''}
            ${item.reviewed ? '<span class="admin-tag">reviewed</span>' : ''}
            <span class="admin-tag">${escapeHtml(item.status || 'active')}</span>
          </div>
        </div>
        <p>${escapeHtml(item.description || 'No description')}</p>
        <div class="admin-row-actions">
          <button class="admin-btn admin-btn--soft" data-listing-action="${item.featured ? 'unfeature' : 'feature'}" data-listing-id="${escapeHtml(item.id)}">${item.featured ? 'Unfeature' : 'Feature'}</button>
          <button class="admin-btn" data-listing-action="review" data-listing-id="${escapeHtml(item.id)}">${item.reviewed ? 'Reviewed' : 'Review'}</button>
          <button class="admin-btn" data-listing-action="${item.status === 'hidden' ? 'restore' : 'hide'}" data-listing-id="${escapeHtml(item.id)}">${item.status === 'hidden' ? 'Restore' : 'Hide'}</button>
          <button class="admin-btn admin-btn--danger" data-listing-action="delete" data-listing-id="${escapeHtml(item.id)}">Delete</button>
        </div>
      </article>
    `).join('');
  }

  function renderActivity() {
    const target = document.getElementById('adminActivityFeed');
    if (!target) return;
    const items = state.data?.activity || [];
    target.innerHTML = items.length ? items.map(item => `
      <article class="admin-v2-activityitem">
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.detail)}</p>
        <span>${escapeHtml(fmtDate(item.createdAt))}</span>
      </article>
    `).join('') : '<div class="admin-empty">No admin activity yet.</div>';
  }

  function renderAudits() {
    const security = (state.audits?.security || [])[0];
    const accessibility = (state.audits?.accessibility || [])[0];
    setText('[data-admin-security-status]', security?.status || '—');
    setText('[data-admin-accessibility-status]', accessibility?.status || '—');
    setText('[data-admin-security-title]', security?.title || 'No data');
    setText('[data-admin-security-text]', security?.detail || '—');
    setText('[data-admin-accessibility-title]', accessibility?.title || 'No data');
    setText('[data-admin-accessibility-text]', accessibility?.detail || '—');
  }

  function render() {
    updateOverview();
    renderModeration();
    renderUsers();
    renderListings();
    renderActivity();
    renderAudits();
  }

  async function handleUserAction(targetUserId, action) {
    const confirmed = action === 'delete-user'
      ? window.confirm('Delete this user and remove their data from the demo database?')
      : true;
    if (!confirmed) return;
    try {
      const result = await api('/api/admin/user-action', {
        method: 'POST',
        body: JSON.stringify({ targetUserId, action })
      });
      state.data = result.payload;
      render();
      showToast(`User action completed: ${action.replace('-', ' ')}`, 'success');
    } catch (error) {
      showToast(error.message || 'Could not update user.', 'error');
    }
  }

  async function handleListingAction(listingId, action) {
    const confirmed = action === 'delete'
      ? window.confirm('Delete this listing permanently?')
      : true;
    if (!confirmed) return;
    try {
      const result = await api('/api/admin/listing-action', {
        method: 'POST',
        body: JSON.stringify({ listingId, action })
      });
      state.data = result.payload;
      render();
      showToast(`Listing action completed: ${action}`, 'success');
    } catch (error) {
      showToast(error.message || 'Could not update listing.', 'error');
    }
  }

  function bindEvents() {
    document.addEventListener('click', (event) => {
      const userBtn = event.target.closest('[data-user-action]');
      if (userBtn) {
        handleUserAction(userBtn.dataset.userId, userBtn.dataset.userAction);
        return;
      }
      const listingBtn = event.target.closest('[data-listing-action]');
      if (listingBtn) {
        handleListingAction(listingBtn.dataset.listingId, listingBtn.dataset.listingAction);
        return;
      }
      const queueFilter = event.target.closest('[data-queue-filter]');
      if (queueFilter) {
        state.queueFilter = queueFilter.dataset.queueFilter;
        document.querySelectorAll('[data-queue-filter]').forEach(btn => btn.classList.toggle('is-active', btn === queueFilter));
        renderModeration();
        return;
      }
      const nav = event.target.closest('[data-admin-nav]');
      if (nav) {
        document.querySelectorAll('[data-admin-nav]').forEach(btn => btn.classList.toggle('is-active', btn === nav));
        const map = {
          overview: 'section-overview',
          moderation: 'section-moderation',
          users: 'section-users',
          listings: 'section-listings',
          activity: 'section-activity'
        };
        document.getElementById(map[nav.dataset.adminNav])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    document.getElementById('adminUserSearch')?.addEventListener('input', (e) => {
      state.userFilter = e.target.value || '';
      renderUsers();
    });
    document.getElementById('adminUserStatusFilter')?.addEventListener('change', (e) => {
      state.userStatusFilter = e.target.value || 'all';
      renderUsers();
    });
    document.getElementById('adminListingSearch')?.addEventListener('input', (e) => {
      state.listingFilter = e.target.value || '';
      renderListings();
    });
    document.getElementById('adminListingStatusFilter')?.addEventListener('change', (e) => {
      state.listingStatusFilter = e.target.value || 'all';
      renderListings();
    });
  }

  function boot() {
    if (!ensureAdminAccess()) return;
    bindEvents();
    loadDashboard();
  }

  document.addEventListener('DOMContentLoaded', boot);
})();

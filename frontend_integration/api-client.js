(function () {
  const TOKEN_KEY = 'freesewaa-token';
  const USER_ID_KEY = 'freesewaa-current-user-id';

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

  function getToken() {
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  function setAuth(auth) {
    if (!auth) return;
    if (auth.token) localStorage.setItem(TOKEN_KEY, auth.token);
    if (auth.user && auth.user.id) {
      localStorage.setItem(USER_ID_KEY, auth.user.id);
      localStorage.setItem('freesewaa-auth', 'true');
    }
  }

  async function apiFetch(url, options = {}) {
    const headers = { ...(options.headers || {}) };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(apiUrl(url), { ...options, headers });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'API request failed.');
    return data;
  }

  window.FreeSewaaAPI = { getToken, setAuth, apiFetch };
})();

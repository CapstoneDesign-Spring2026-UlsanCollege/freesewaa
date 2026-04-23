(function () {
  const TOKEN_KEY = 'freesewaa-token';
  const USER_ID_KEY = 'freesewaa-current-user-id';

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
    const response = await fetch(url, { ...options, headers });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'API request failed.');
    return data;
  }

  window.FreeSewaaAPI = { getToken, setAuth, apiFetch };
})();

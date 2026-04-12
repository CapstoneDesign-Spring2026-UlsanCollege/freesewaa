const API_VERSION = 'v1';
const API_PREFIX = `/api/${API_VERSION}`;

const routes = {
  auth: `${API_PREFIX}/auth`,
  users: `${API_PREFIX}/users`,
  items: `${API_PREFIX}/items`,
  requests: `${API_PREFIX}/requests`,
  messages: `${API_PREFIX}/messages`
};

module.exports = { API_VERSION, API_PREFIX, routes };
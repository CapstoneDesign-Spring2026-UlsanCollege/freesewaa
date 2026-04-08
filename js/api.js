const API_URL = 'http://localhost:5000/api';

const api = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  auth: {
    async register(userData) {
      return api.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    },
    
    async login(credentials) {
      return api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
    },
    
    async getMe() {
      return api.request('/auth/me');
    },
    
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    }
  },

  items: {
    async getAll(params = {}) {
      const queryString = new URLSearchParams(params).toString();
      return api.request(`/items${queryString ? '?' + queryString : ''}`);
    },
    
    async getOne(id) {
      return api.request(`/items/${id}`);
    },
    
    async create(itemData) {
      return api.request('/items', {
        method: 'POST',
        body: JSON.stringify(itemData)
      });
    },
    
    async update(id, itemData) {
      return api.request(`/items/${id}`, {
        method: 'PUT',
        body: JSON.stringify(itemData)
      });
    },
    
    async delete(id) {
      return api.request(`/items/${id}`, {
        method: 'DELETE'
      });
    },
    
    async getMyItems() {
      return api.request('/items/my-items');
    }
  },

  requests: {
    async create(requestData) {
      return api.request('/requests', {
        method: 'POST',
        body: JSON.stringify(requestData)
      });
    },
    
    async getOne(id) {
      return api.request(`/requests/${id}`);
    },
    
    async updateStatus(id, status) {
      return api.request(`/requests/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
    },
    
    async getMyRequests() {
      return api.request('/requests/my-requests');
    },
    
    async getReceivedRequests() {
      return api.request('/requests/received');
    }
  },

  messages: {
    async send(messageData) {
      return api.request('/messages', {
        method: 'POST',
        body: JSON.stringify(messageData)
      });
    },
    
    async getConversation(conversationId) {
      return api.request(`/messages/${conversationId}`);
    },
    
    async getConversations() {
      return api.request('/messages/conversations');
    },
    
    async getUnreadCount() {
      return api.request('/messages/unread');
    },
    
    async markAsRead(id) {
      return api.request(`/messages/${id}/read`, {
        method: 'PUT'
      });
    }
  },

  users: {
    async getProfile(id) {
      return api.request(`/users/${id}`);
    },
    
    async updateProfile(id, userData) {
      return api.request(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData)
      });
    },
    
    async getUserItems(id) {
      return api.request(`/users/${id}/items`);
    }
  }
};

function saveAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

function getAuth() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return { token, user };
}

function isLoggedIn() {
  return !!localStorage.getItem('token');
}

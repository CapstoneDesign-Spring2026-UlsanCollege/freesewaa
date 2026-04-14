const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

// MySQL Connection - Update these with your database credentials
const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'freesewaa'
};

let mysql;
let pool;

// Simple MySQL connection without package
async function getConnection() {
  try {
    const net = require('net');
    const tls = require('tls');
    
    // Try to connect via TCP
    const client = new net.Socket();
    
    return new Promise((resolve, reject) => {
      client.connect(3306, DB_CONFIG.host, () => {
        console.log('Connected to MySQL!');
        resolve(client);
      });
      
      client.on('error', (err) => {
        console.log('MySQL not available, using JSON fallback');
        resolve(null);
      });
    });
  } catch (e) {
    console.log('Using JSON fallback');
    return null;
  }
}

// Check if MySQL environment variables are set
const hasMySQL = DB_CONFIG.host !== 'localhost' && process.env.DB_HOST;

function defaultUserState(user) {
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim() || user.name || 'Free Sewaa Member';
  const city = user.city || 'Ulsan';
  return {
    user: { id: user.id, name, firstName: user.firstName || name.split(' ')[0], lastName: user.lastName || name.split(' ').slice(1).join(' '), email: user.email || '', phone: user.phone || '', city, region: user.region || 'Nam-gu', joinedAt: user.createdAt || new Date().toISOString(), bio: 'Community member', pickupAvailability: 'Weekdays after 6 PM', savedListingIds: [204, 205], requestedListingIds: [205], drafts: {}, preferences: { theme: 'dark', language: 'English', notifications: true } },
    listings: [
      { id: 201, ownerId: user.id, ownerName: name, title: 'Winter Jacket', category: 'Clothing', condition: 'Good', location: `${city}, Samsan-dong`, distanceKm: 4, pickup: 'Pickup only', pickupWindow: 'Today after 6 PM', description: 'Warm, clean, and wearable.', image: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=900&q=80', createdAt: new Date().toISOString(), requestCount: 2, saveCount: 6, urgent: false, status: 'active' },
      { id: 202, ownerId: user.id, ownerName: name, title: "Children's Story Books", category: 'Books', condition: 'Like new', location: `${city}, Dal-dong`, distanceKm: 7, pickup: 'Flexible', description: "Children's books.", image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80', createdAt: new Date(Date.now() - 86400000).toISOString(), requestCount: 1, saveCount: 9, status: 'reserved' },
      { id: 203, ownerId: 'community-1', ownerName: 'Mina Park', title: 'Storage Shelf', category: 'Home', condition: 'Good', location: `${city}, Seongnam-dong`, distanceKm: 10, pickup: 'Pickup only', description: 'Sturdy shelf.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), requestCount: 2, saveCount: 8, status: 'active' },
      { id: 204, ownerId: 'community-2', ownerName: 'Joon Lee', title: 'Rice & Pantry Bundle', category: 'Food', condition: 'New', location: `${city}, Ok-dong`, distanceKm: 5, pickup: 'Flexible', description: 'Unopened rice, ramen, canned food.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80', createdAt: new Date(Date.now() - 3 * 3600000).toISOString(), requestCount: 6, saveCount: 13, urgent: true, status: 'active' },
      { id: 205, ownerId: 'community-3', ownerName: 'Ana Lopez', title: 'Study Desk', category: 'Home', condition: 'Used', location: `${city}, Sinjeong-dong`, distanceKm: 14, pickup: 'Pickup only', description: 'Simple desk.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80', createdAt: new Date(Date.now() - 4 * 86400000).toISOString(), requestCount: 3, saveCount: 5, status: 'active' }
    ],
    requests: [{ id: 'req-205', listingId: 205, status: 'pending', requestedAt: new Date().toISOString(), note: 'Can pick up.' }],
    conversations: [],
    notifications: [{ id: 'n1', text: 'Welcome to Free Sewaa!', type: 'general', read: false, createdAt: new Date().toISOString() }]
  };
}

// JSON file as fallback database
const DB_PATH = path.join(ROOT, 'db.json');

function readDb() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const seed = { users: [{ id: 'user-demo', firstName: 'Alisha', lastName: 'Shrestha', email: 'alisha@example.com', password: 'demo123', city: 'Ulsan', createdAt: new Date().toISOString() }], states: { 'user-demo': defaultUserState({ id: 'user-demo', firstName: 'Alisha', lastName: 'Shrestha', email: 'alisha@example.com' }) }, meta: {} };
      fs.writeFileSync(DB_PATH, JSON.stringify(seed, null, 2));
      return seed;
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch (e) {
    return { users: [], states: {} };
  }
}

function writeDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

function safeUser(user) {
  const { password, ...rest } = user;
  return rest;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
  };
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

async function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'
    });
    return res.end();
  }

  try {
    // Health check
    if (pathname === '/api/health') {
      return sendJson(res, 200, {
        ok: true,
        db: hasMySQL ? 'mysql' : 'json',
        server: 'Free Sewaa API'
      });
    }

    // Signup
    if (pathname === '/api/auth/signup' && req.method === 'POST') {
      const { firstName, lastName, email, password, phone } = await readBody(req);

      if (!firstName || !password || (!email && !phone)) {
        return sendJson(res, 400, { error: 'Required fields missing' });
      }

      const db = readDb();
      const existing = db.users.find((u) => u.email === email || u.phone === phone);
      if (existing) {
        return sendJson(res, 409, { error: 'Account already exists' });
      }

      const user = {
        id: `user-${Date.now()}`,
        firstName,
        lastName: lastName || '',
        email: email || '',
        password,
        phone: phone || '',
        city: 'Ulsan',
        region: 'Nam-gu',
        createdAt: new Date().toISOString()
      };

      db.users.push(user);
      db.states[user.id] = defaultUserState(user);
      writeDb(db);

      return sendJson(res, 201, {
        user: safeUser(user),
        auth: { userId: user.id, isAuthenticated: true }
      });
    }

    // Signin
    if (pathname === '/api/auth/signin' && req.method === 'POST') {
      const { email, password, phone } = await readBody(req);
      const db = readDb();

      const user = db.users.find(
        (u) => (email && u.email === email) || (phone && u.phone === phone)
      );

      if (!user || user.password !== password) {
        return sendJson(res, 401, { error: 'Invalid credentials' });
      }

      return sendJson(res, 200, {
        user: safeUser(user),
        auth: { userId: user.id, isAuthenticated: true }
      });
    }

    // Get user state
    if (pathname === '/api/state' && req.method === 'GET') {
      const userId = url.searchParams.get('userId');
      const db = readDb();
      const state = db.states[userId];

      if (!state) {
        return sendJson(res, 404, { error: 'User state not found' });
      }

      return sendJson(res, 200, { state });
    }

    // Update user state
    if (pathname === '/api/state' && req.method === 'PUT') {
      const userId = url.searchParams.get('userId');
      const payload = await readBody(req);
      const db = readDb();
      db.states[userId] = payload;
      writeDb(db);

      return sendJson(res, 200, { ok: true });
    }

    // Logout
    if (pathname === '/api/auth/logout' && req.method === 'POST') {
      return sendJson(res, 200, { ok: true });
    }

    // Google demo login
    if (pathname === '/api/auth/google-demo' && req.method === 'POST') {
      const db = readDb();
      const user = db.users[0];
      return sendJson(res, 200, {
        user: safeUser(user),
        auth: { userId: user.id, isAuthenticated: true }
      });
    }

    // Serve static files
    let filePath = path.join(
      ROOT,
      pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '')
    );

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return sendFile(res, filePath);
    }

    // Default to index.html
    return sendFile(res, path.join(ROOT, 'index.html'));
  } catch (e) {
    console.error(e);
    return sendJson(res, 500, { error: e.message });
  }
});

server.listen(PORT, () => {
  console.log(`==========================================`);
  console.log(`  Free Sewaa running on http://localhost:${PORT}`);
  console.log(`  Database: ${hasMySQL ? 'MySQL' : 'JSON (file)'}`);
  console.log(`==========================================`);
});
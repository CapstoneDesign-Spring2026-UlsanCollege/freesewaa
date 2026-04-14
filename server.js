const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DB_PATH = path.join(ROOT, 'db.json');

function defaultUserState(user) {
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim() || user.name || 'Free Sewaa Member';
  const city = user.city || 'Ulsan';
  const region = user.region || 'Nam-gu';
  return {
    user: {
      id: user.id,
      name,
      firstName: user.firstName || name.split(' ')[0] || 'Member',
      lastName: user.lastName || name.split(' ').slice(1).join(' '),
      email: user.email || '',
      phone: user.phone || '',
      city,
      region,
      joinedAt: user.createdAt || new Date().toISOString(),
      bio: 'Community member helping useful items reach the people who need them most.',
      pickupAvailability: 'Weekdays after 6 PM · Weekend afternoon',
      savedListingIds: [204, 205],
      requestedListingIds: [205],
      drafts: {},
      preferences: { theme: 'dark', language: 'English', notifications: true, pickupReminders: true, marketing: false }
    },
    listings: [
      { id: 201, ownerId: user.id, ownerName: name, title: 'Winter Jacket', category: 'Clothing', condition: 'Good', location: `${city}, Samsan-dong`, distanceKm: 4, pickup: 'Pickup only', pickupWindow: 'Today after 6 PM', description: 'Warm, clean, and wearable right away.', notes: 'Near the main road pickup point.', image: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=900&q=80', createdAt: new Date().toISOString(), requestCount: 2, saveCount: 6, urgent: false, status: 'active' },
      { id: 202, ownerId: user.id, ownerName: name, title: "Children's Story Books Set", category: 'Books', condition: 'Like new', location: `${city}, Dal-dong`, distanceKm: 7, pickup: 'Flexible', pickupWindow: 'Weekend mornings', description: "Colorful children's books in clean condition.", notes: 'Can bundle with crayons if needed.', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80', createdAt: new Date(Date.now() - 86400000).toISOString(), requestCount: 1, saveCount: 9, urgent: false, status: 'reserved' },
      { id: 203, ownerId: 'community-1', ownerName: 'Mina Park', title: 'Compact Storage Shelf', category: 'Home', condition: 'Good', location: `${city}, Seongnam-dong`, distanceKm: 10, pickup: 'Pickup only', pickupWindow: 'Saturday afternoon', description: 'A small but sturdy shelf for home organization.', notes: 'Top edge has a minor scratch.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), requestCount: 2, saveCount: 8, urgent: false, status: 'active' },
      { id: 204, ownerId: 'community-2', ownerName: 'Joon Lee', title: 'Rice & Pantry Bundle', category: 'Food', condition: 'New', location: `${city}, Ok-dong`, distanceKm: 5, pickup: 'Flexible', pickupWindow: 'Tonight before 8 PM', description: 'Unopened rice, ramen, canned food, and pantry basics.', notes: 'Please message only if you can collect within two days.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80', createdAt: new Date(Date.now() - 3 * 3600000).toISOString(), requestCount: 6, saveCount: 13, urgent: true, status: 'active' },
      { id: 205, ownerId: 'community-3', ownerName: 'Ana Lopez', title: 'Study Desk', category: 'Home', condition: 'Used', location: `${city}, Sinjeong-dong`, distanceKm: 14, pickup: 'Pickup only', pickupWindow: 'Sunday afternoon', description: 'Simple desk for study or laptop work.', notes: 'Disassembles into two parts for transport.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80', createdAt: new Date(Date.now() - 4 * 86400000).toISOString(), requestCount: 3, saveCount: 5, urgent: false, status: 'active' }
    ],
    requests: [{ id: 'req-205', listingId: 205, status: 'pending', requestedAt: new Date(Date.now() - 2 * 3600000).toISOString(), note: 'Can pick up this weekend.' }],
    conversations: [
      { id: 'conv-201-sarah', listingId: 201, participant: 'Sarah Kim', participantCity: city, unread: 1, updatedAt: new Date().toISOString(), messages: [{ sender: 'Sarah Kim', text: 'Hi! Is your jacket listing still available?', time: '9:02 AM', type: 'received' }, { sender: 'You', text: 'Yes, pickup is possible this evening.', time: '9:04 AM', type: 'sent' }] },
      { id: 'conv-205-ana', listingId: 205, participant: 'Ana Lopez', participantCity: city, unread: 0, updatedAt: new Date(Date.now() - 2 * 3600000).toISOString(), messages: [{ sender: 'You', text: "Hi, I'm interested in your desk. Is it still available?", time: '7:30 AM', type: 'sent' }, { sender: 'Ana Lopez', text: 'Yes, weekend pickup works best.', time: '7:32 AM', type: 'received' }] }
    ],
    notifications: [
      { id: 'n1', text: 'Sarah Kim requested your Winter Jacket listing.', type: 'request', read: false, createdAt: new Date().toISOString() },
      { id: 'n2', text: 'Ana Lopez replied to your desk request.', type: 'message', read: false, createdAt: new Date(Date.now() - 2 * 3600000).toISOString() }
    ]
  };
}

function defaultDb() {
  const demoUser = {
    id: 'user-demo', firstName: 'Alisha', lastName: 'Shrestha', name: 'Alisha Shrestha', email: 'alisha@example.com', password: 'demo123', phone: '+821055582211', city: 'Ulsan', region: 'Nam-gu', createdAt: new Date().toISOString()
  };
  return { users: [demoUser], states: { [demoUser.id]: defaultUserState(demoUser) }, meta: { lastUpdatedAt: new Date().toISOString() } };
}

function readDb() {
  if (!fs.existsSync(DB_PATH)) { const seed = defaultDb(); fs.writeFileSync(DB_PATH, JSON.stringify(seed, null, 2)); return seed; }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function writeDb(db) { db.meta = { ...(db.meta || {}), lastUpdatedAt: new Date().toISOString() }; fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2)); }

function safeUser(user) { const { password, ...rest } = user; return rest; }
function ensureStateForUser(db, user) { if (!db.states[user.id]) { db.states[user.id] = defaultUserState(user); writeDb(db); } return db.states[user.id]; }

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
  res.end(body);
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8' };
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' }); res.end(data);
  });
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 10 * 1024 * 1024) { reject(new Error('Payload too large')); req.destroy(); } });
    req.on('end', () => { if (!body) return resolve({}); try { resolve(JSON.parse(body)); } catch (error) { reject(new Error('Invalid JSON body')); } });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }

  try {
    if (pathname === '/api/health' && req.method === 'GET') return sendJson(res, 200, { ok: true, service: 'freesewaa-backend' });

    if (pathname === '/api/auth/google-demo' && req.method === 'POST') {
      const db = readDb(); const user = db.users[0]; ensureStateForUser(db, user); return sendJson(res, 200, { user: safeUser(user), auth: { userId: user.id, isAuthenticated: true } });
    }

    if (pathname === '/api/auth/logout' && req.method === 'POST') return sendJson(res, 200, { ok: true });

    if (pathname === '/api/auth/signup' && req.method === 'POST') {
      const db = readDb();
      const { firstName = '', lastName = '', email = '', password = '', phone = '' } = await readRequestBody(req);
      if ((!email && !phone) || !password || !firstName.trim()) return sendJson(res, 400, { error: 'First name, password, and either email or phone are required.' });
      const normalizedEmail = String(email).trim().toLowerCase();
      const normalizedPhone = String(phone || '').replace(/\s+/g, '');
      const exists = db.users.find(user => (normalizedEmail && user.email && user.email.toLowerCase() === normalizedEmail) || (normalizedPhone && user.phone === normalizedPhone));
      if (exists) return sendJson(res, 409, { error: 'An account with that email or phone already exists.' });
      const user = { id: `user-${Date.now()}`, firstName: firstName.trim(), lastName: lastName.trim(), name: `${firstName.trim()} ${lastName.trim()}`.trim(), email: normalizedEmail, password, phone: normalizedPhone, city: 'Ulsan', region: 'Nam-gu', createdAt: new Date().toISOString() };
      db.users.push(user); db.states[user.id] = defaultUserState(user); writeDb(db);
      return sendJson(res, 201, { user: safeUser(user), auth: { userId: user.id, isAuthenticated: true } });
    }

    if (pathname === '/api/auth/signin' && req.method === 'POST') {
      const db = readDb();
      const { email = '', password = '', phone = '' } = await readRequestBody(req);
      const normalizedEmail = String(email).trim().toLowerCase();
      const normalizedPhone = String(phone || '').replace(/\s+/g, '');
      const user = db.users.find(item => (normalizedEmail && item.email && item.email.toLowerCase() === normalizedEmail) || (normalizedPhone && item.phone === normalizedPhone));
      if (!user || user.password !== password) return sendJson(res, 401, { error: 'Invalid credentials.' });
      ensureStateForUser(db, user); return sendJson(res, 200, { user: safeUser(user), auth: { userId: user.id, isAuthenticated: true } });
    }

    if (pathname === '/api/state' && req.method === 'GET') {
      const db = readDb(); const userId = url.searchParams.get('userId');
      if (!userId) return sendJson(res, 400, { error: 'userId is required.' });
      const state = db.states[userId];
      if (!state) return sendJson(res, 404, { error: 'User state not found.' });
      return sendJson(res, 200, { state });
    }

    if (pathname === '/api/state' && req.method === 'PUT') {
      const db = readDb(); const userId = url.searchParams.get('userId');
      if (!userId) return sendJson(res, 400, { error: 'userId is required.' });
      const payload = await readRequestBody(req);
      if (!payload || typeof payload !== 'object') return sendJson(res, 400, { error: 'State payload is required.' });
      db.states[userId] = payload; writeDb(db);
      return sendJson(res, 200, { ok: true });
    }

    let filePath = path.join(ROOT, pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, ''));
    if (filePath.startsWith(ROOT) === false) return sendJson(res, 403, { error: 'Forbidden' });
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) return sendFile(res, filePath);
    return sendFile(res, path.join(ROOT, 'index.html'));
  } catch (error) { console.error(error); return sendJson(res, 500, { error: error.message || 'Server error' }); }
});

server.listen(PORT, () => { console.log(`Free Sewaa running on http://localhost:${PORT}`); });
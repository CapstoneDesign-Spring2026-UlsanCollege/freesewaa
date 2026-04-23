require('dotenv').config();

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { MongoClient, ObjectId } = require('mongodb');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'freesewaa';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is missing in .env');
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI);

let db;
let usersCollection;
let statesCollection;
let metaCollection;
let listingsCollection;
let requestsCollection;
let conversationsCollection;
let messagesCollection;
let notificationsCollection;

function defaultUserState(user) {
  const name =
    [user.firstName, user.lastName].filter(Boolean).join(' ').trim() ||
    user.name ||
    'Free Sewaa Member';

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
      savedListingIds: [],
      requestedListingIds: [],
      drafts: {},
      preferences: {
        theme: 'dark',
        language: 'English',
        notifications: true,
        pickupReminders: true,
        marketing: false
      }
    }
  };
}

function defaultDemoUser() {
  return {
    id: 'user-demo',
    firstName: 'Ram',
    lastName: 'Pathak',
    name: 'Ram Pathak',
    email: 'ram@example.com',
    password: '123456',
    phone: '+8201096646162',
    city: 'Ulsan',
    region: 'Nam-gu',
    createdAt: new Date().toISOString()
  };
}

function safeUser(user) {
  if (!user) return null;
  const { password, _id, ...rest } = user;
  return rest;
}

function getUserId(req, url) {
  return (
    url.searchParams.get('userId') ||
    req.headers['x-user-id'] ||
    req.headers['userid'] ||
    null
  );
}

function normalizeDoc(doc) {
  if (!doc) return null;
  const clone = { ...doc };
  if (clone._id) {
    clone._id = String(clone._id);
  }
  return clone;
}

function buildAuthQuery(email = '', phone = '') {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const normalizedPhone = String(phone || '').replace(/\s+/g, '');

  const query = [];
  if (normalizedEmail) query.push({ email: normalizedEmail });
  if (normalizedPhone) query.push({ phone: normalizedPhone });

  return {
    normalizedEmail,
    normalizedPhone,
    query
  };
}

async function ensureIndexes() {
  await usersCollection.createIndex({ email: 1 }, { unique: true, sparse: true });
  await usersCollection.createIndex({ phone: 1 }, { unique: true, sparse: true });
  await usersCollection.createIndex({ id: 1 }, { unique: true });

  await statesCollection.createIndex({ userId: 1 }, { unique: true });

  await listingsCollection.createIndex({ id: 1 }, { unique: true });
  await listingsCollection.createIndex({ ownerId: 1 });
  await listingsCollection.createIndex({ status: 1 });
  await listingsCollection.createIndex({ category: 1 });

  await requestsCollection.createIndex({ id: 1 }, { unique: true });
  await requestsCollection.createIndex({ listingId: 1 });
  await requestsCollection.createIndex({ requesterId: 1 });
  await requestsCollection.createIndex({ ownerId: 1 });

  await conversationsCollection.createIndex({ id: 1 }, { unique: true });
  await conversationsCollection.createIndex({ participantIds: 1 });

  await messagesCollection.createIndex({ conversationId: 1 });
  await messagesCollection.createIndex({ createdAt: 1 });

  await notificationsCollection.createIndex({ id: 1 }, { unique: true });
  await notificationsCollection.createIndex({ userId: 1 });
  await notificationsCollection.createIndex({ read: 1 });
}

async function ensureSeedData() {
  let existingUser = await usersCollection.findOne({ id: 'user-demo' });

  if (!existingUser) {
    const demoUser = defaultDemoUser();
    await usersCollection.insertOne(demoUser);
    existingUser = demoUser;
  }

  const existingState = await statesCollection.findOne({ userId: existingUser.id });
  if (!existingState) {
    await statesCollection.insertOne({
      userId: existingUser.id,
      state: defaultUserState(existingUser)
    });
  }

  const listingsCount = await listingsCollection.countDocuments();
  if (listingsCount === 0) {
    const name = existingUser.name;
    const city = existingUser.city || 'Ulsan';

    const seedListings = [
      {
        id: 'listing-201',
        ownerId: existingUser.id,
        ownerName: name,
        title: 'Winter Jacket',
        category: 'Clothing',
        condition: 'Good',
        location: `${city}, Samsan-dong`,
        distanceKm: 4,
        pickup: 'Pickup only',
        pickupWindow: 'Today after 6 PM',
        description: 'Warm, clean, and wearable right away. Best fit for teen or adult.',
        notes: 'Near the main road pickup point.',
        image: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=900&q=80',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        requestCount: 2,
        saveCount: 6,
        urgent: false,
        status: 'active'
      },
      {
        id: 'listing-202',
        ownerId: existingUser.id,
        ownerName: name,
        title: "Children's Story Books Set",
        category: 'Books',
        condition: 'Like new',
        location: `${city}, Dal-dong`,
        distanceKm: 7,
        pickup: 'Flexible',
        pickupWindow: 'Weekend mornings',
        description: "Colorful children's books in clean condition.",
        notes: 'Can bundle with crayons if needed.',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        requestCount: 1,
        saveCount: 9,
        urgent: false,
        status: 'reserved'
      },
      {
        id: 'listing-203',
        ownerId: 'community-1',
        ownerName: 'Mina Park',
        title: 'Compact Storage Shelf',
        category: 'Home',
        condition: 'Good',
        location: `${city}, Seongnam-dong`,
        distanceKm: 10,
        pickup: 'Pickup only',
        pickupWindow: 'Saturday afternoon',
        description: 'A small but sturdy shelf for home organization.',
        notes: 'Top edge has a minor scratch.',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        requestCount: 2,
        saveCount: 8,
        urgent: false,
        status: 'active'
      },
      {
        id: 'listing-204',
        ownerId: 'community-2',
        ownerName: 'Joon Lee',
        title: 'Rice & Pantry Bundle',
        category: 'Food',
        condition: 'New',
        location: `${city}, Ok-dong`,
        distanceKm: 5,
        pickup: 'Flexible',
        pickupWindow: 'Tonight before 8 PM',
        description: 'Unopened rice, ramen, canned food, and pantry basics.',
        notes: 'Please message only if you can collect within two days.',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
        createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 3600000).toISOString(),
        requestCount: 6,
        saveCount: 13,
        urgent: true,
        status: 'active'
      },
      {
        id: 'listing-205',
        ownerId: 'community-3',
        ownerName: 'Ana Lopez',
        title: 'Study Desk',
        category: 'Home',
        condition: 'Used',
        location: `${city}, Sinjeong-dong`,
        distanceKm: 14,
        pickup: 'Pickup only',
        pickupWindow: 'Sunday afternoon',
        description: 'Simple desk for study or laptop work.',
        notes: 'Disassembles into two parts for transport.',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
        createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        requestCount: 3,
        saveCount: 5,
        urgent: false,
        status: 'active'
      }
    ];

    await listingsCollection.insertMany(seedListings);
  }

  const requestsCount = await requestsCollection.countDocuments();
  if (requestsCount === 0) {
    await requestsCollection.insertOne({
      id: 'req-205',
      listingId: 'listing-205',
      requesterId: existingUser.id,
      requesterName: existingUser.name,
      ownerId: 'community-3',
      status: 'pending',
      requestedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
      note: 'Can pick up this weekend.'
    });
  }

  const convCount = await conversationsCollection.countDocuments();
  if (convCount === 0) {
    await conversationsCollection.insertMany([
      {
        id: 'conv-201-sarah',
        listingId: 'listing-201',
        participantIds: [existingUser.id, 'community-sarah'],
        participantNames: [existingUser.name, 'Sarah Kim'],
        participant: 'Sarah Kim',
        participantCity: existingUser.city || 'Ulsan',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'conv-205-ana',
        listingId: 'listing-205',
        participantIds: [existingUser.id, 'community-3'],
        participantNames: [existingUser.name, 'Ana Lopez'],
        participant: 'Ana Lopez',
        participantCity: existingUser.city || 'Ulsan',
        createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 3600000).toISOString()
      }
    ]);
  }

  const messageCount = await messagesCollection.countDocuments();
  if (messageCount === 0) {
    await messagesCollection.insertMany([
      {
        conversationId: 'conv-201-sarah',
        senderId: 'community-sarah',
        senderName: 'Sarah Kim',
        text: 'Hi! Is your jacket listing still available?',
        type: 'received',
        createdAt: new Date(Date.now() - 10 * 60000).toISOString()
      },
      {
        conversationId: 'conv-201-sarah',
        senderId: existingUser.id,
        senderName: 'You',
        text: 'Yes, pickup is possible this evening.',
        type: 'sent',
        createdAt: new Date(Date.now() - 8 * 60000).toISOString()
      },
      {
        conversationId: 'conv-205-ana',
        senderId: existingUser.id,
        senderName: 'You',
        text: "Hi, I'm interested in your desk. Is it still available?",
        type: 'sent',
        createdAt: new Date(Date.now() - 2 * 3600000).toISOString()
      },
      {
        conversationId: 'conv-205-ana',
        senderId: 'community-3',
        senderName: 'Ana Lopez',
        text: 'Yes, weekend pickup works best.',
        type: 'received',
        createdAt: new Date(Date.now() - 118 * 60000).toISOString()
      }
    ]);
  }

  const notifCount = await notificationsCollection.countDocuments();
  if (notifCount === 0) {
    await notificationsCollection.insertMany([
      {
        id: 'n1',
        userId: existingUser.id,
        text: 'Sarah Kim requested your Winter Jacket listing.',
        type: 'request',
        read: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'n2',
        userId: existingUser.id,
        text: 'Ana Lopez replied to your desk request.',
        type: 'message',
        read: false,
        createdAt: new Date(Date.now() - 2 * 3600000).toISOString()
      }
    ]);
  }

  await metaCollection.updateOne(
    { key: 'app-meta' },
    {
      $set: {
        key: 'app-meta',
        lastUpdatedAt: new Date().toISOString()
      }
    },
    { upsert: true }
  );
}

async function getUserState(userId) {
  return statesCollection.findOne({ userId });
}

async function setUserState(userId, state) {
  await statesCollection.updateOne(
    { userId },
    {
      $set: {
        userId,
        state
      }
    },
    { upsert: true }
  );

  await metaCollection.updateOne(
    { key: 'app-meta' },
    {
      $set: {
        key: 'app-meta',
        lastUpdatedAt: new Date().toISOString()
      }
    },
    { upsert: true }
  );
}

async function ensureStateForUser(user) {
  let existing = await getUserState(user.id);
  if (!existing) {
    const state = defaultUserState(user);
    await setUserState(user.id, state);
    existing = { userId: user.id, state };
  }
  return existing.state;
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-user-id'
  });
  res.end(body);
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8'
  };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 10 * 1024 * 1024) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

async function touchMeta() {
  await metaCollection.updateOne(
    { key: 'app-meta' },
    {
      $set: {
        key: 'app-meta',
        lastUpdatedAt: new Date().toISOString()
      }
    },
    { upsert: true }
  );
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-user-id'
    });
    return res.end();
  }

  try {
    if (pathname === '/api/health' && req.method === 'GET') {
      return sendJson(res, 200, { ok: true, service: 'freesewaa-backend-mongodb' });
    }

    if (pathname === '/api/auth/google-demo' && req.method === 'POST') {
      const user = await usersCollection.findOne({ id: 'user-demo' });
      if (!user) {
        return sendJson(res, 404, { error: 'Demo user not found.' });
      }
      await ensureStateForUser(user);
      return sendJson(res, 200, {
        user: safeUser(user),
        auth: { userId: user.id, isAuthenticated: true }
      });
    }

    if (pathname === '/api/auth/logout' && req.method === 'POST') {
      return sendJson(res, 200, { ok: true });
    }

    if (pathname === '/api/auth/signup' && req.method === 'POST') {
      const { firstName = '', lastName = '', email = '', password = '', phone = '' } = await readRequestBody(req);

      if ((!email && !phone) || !password || !firstName.trim()) {
        return sendJson(res, 400, {
          error: 'First name, password, and either email or phone are required.'
        });
      }

      const { normalizedEmail, normalizedPhone, query } = buildAuthQuery(email, phone);

      const existing = query.length
        ? await usersCollection.findOne({ $or: query })
        : null;

      if (existing) {
        return sendJson(res, 409, {
          error: 'An account with that email or phone already exists.'
        });
      }

      const user = {
        id: `user-${Date.now()}`,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        name: `${firstName.trim()} ${lastName.trim()}`.trim(),
        email: normalizedEmail || undefined,
        password,
        phone: normalizedPhone || undefined,
        city: 'Ulsan',
        region: 'Nam-gu',
        createdAt: new Date().toISOString()
      };

      await usersCollection.insertOne(user);
      await setUserState(user.id, defaultUserState(user));

      return sendJson(res, 201, {
        user: safeUser(user),
        auth: { userId: user.id, isAuthenticated: true }
      });
    }

    if (pathname === '/api/auth/signin' && req.method === 'POST') {
      const { email = '', password = '', phone = '' } = await readRequestBody(req);

      const { query } = buildAuthQuery(email, phone);

      if (!query.length) {
        return sendJson(res, 400, { error: 'Email or phone is required.' });
      }

      const user = await usersCollection.findOne({ $or: query });

      if (!user || user.password !== password) {
        return sendJson(res, 401, { error: 'Invalid credentials.' });
      }

      await ensureStateForUser(user);

      return sendJson(res, 200, {
        user: safeUser(user),
        auth: { userId: user.id, isAuthenticated: true }
      });
    }

    if (pathname === '/api/state' && req.method === 'GET') {
      const userId = url.searchParams.get('userId');
      if (!userId) {
        return sendJson(res, 400, { error: 'userId is required.' });
      }

      const record = await getUserState(userId);
      if (!record) {
        return sendJson(res, 404, { error: 'User state not found.' });
      }

      return sendJson(res, 200, { state: record.state });
    }

    if (pathname === '/api/state' && req.method === 'PUT') {
      const userId = url.searchParams.get('userId');
      if (!userId) {
        return sendJson(res, 400, { error: 'userId is required.' });
      }

      const payload = await readRequestBody(req);
      if (!payload || typeof payload !== 'object') {
        return sendJson(res, 400, { error: 'State payload is required.' });
      }

      await setUserState(userId, payload);
      return sendJson(res, 200, { ok: true });
    }

    if (pathname === '/api/listings' && req.method === 'GET') {
      const owner = url.searchParams.get('owner');
      const status = url.searchParams.get('status');
      const category = url.searchParams.get('category');
      const userId = getUserId(req, url);

      const query = {};

      if (owner === 'me') {
        if (!userId) return sendJson(res, 400, { error: 'userId is required for owner=me.' });
        query.ownerId = userId;
      }

      if (status && status !== 'all') {
        query.status = status;
      }

      if (!status && owner !== 'me') {
        query.status = 'active';
      }

      if (category && category !== 'all') {
        query.category = category;
      }

      const listings = await listingsCollection
        .find(query)
        .sort({ createdAt: -1 })
        .toArray();

      return sendJson(res, 200, { listings: listings.map(normalizeDoc) });
    }

    if (pathname.match(/^\/api\/listings\/[^/]+$/) && req.method === 'GET') {
      const id = pathname.split('/').pop();
      const listing = await listingsCollection.findOne({ id });
      if (!listing) {
        return sendJson(res, 404, { error: 'Listing not found.' });
      }
      return sendJson(res, 200, { listing: normalizeDoc(listing) });
    }

    if (pathname === '/api/listings' && req.method === 'POST') {
      const userId = getUserId(req, url);
      if (!userId) {
        return sendJson(res, 400, { error: 'userId is required.' });
      }

      const user = await usersCollection.findOne({ id: userId });
      if (!user) {
        return sendJson(res, 404, { error: 'User not found.' });
      }

      const body = await readRequestBody(req);

      if (!body.title || !body.category) {
        return sendJson(res, 400, { error: 'title and category are required.' });
      }

      const listing = {
        id: `listing-${Date.now()}`,
        ownerId: user.id,
        ownerName: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        title: String(body.title).trim(),
        category: String(body.category).trim(),
        condition: body.condition || 'Good',
        location: body.location || `${user.city || 'Ulsan'}, ${user.region || 'Nam-gu'}`,
        distanceKm: Number(body.distanceKm || 0),
        pickup: body.pickup || 'Flexible',
        pickupWindow: body.pickupWindow || '',
        description: body.description || '',
        notes: body.notes || '',
        image: body.image || '',
        requestCount: 0,
        saveCount: 0,
        urgent: Boolean(body.urgent),
        status: body.status || 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await listingsCollection.insertOne(listing);
      await touchMeta();

      return sendJson(res, 201, { listing: normalizeDoc(listing) });
    }

    if (pathname.match(/^\/api\/listings\/[^/]+$/) && req.method === 'PUT') {
      const id = pathname.split('/').pop();
      const userId = getUserId(req, url);

      if (!userId) {
        return sendJson(res, 400, { error: 'userId is required.' });
      }

      const listing = await listingsCollection.findOne({ id });
      if (!listing) {
        return sendJson(res, 404, { error: 'Listing not found.' });
      }

      if (listing.ownerId !== userId) {
        return sendJson(res, 403, { error: 'You can only update your own listing.' });
      }

      const body = await readRequestBody(req);

      const updates = {
        ...(body.title !== undefined ? { title: String(body.title).trim() } : {}),
        ...(body.category !== undefined ? { category: body.category } : {}),
        ...(body.condition !== undefined ? { condition: body.condition } : {}),
        ...(body.location !== undefined ? { location: body.location } : {}),
        ...(body.distanceKm !== undefined ? { distanceKm: Number(body.distanceKm) } : {}),
        ...(body.pickup !== undefined ? { pickup: body.pickup } : {}),
        ...(body.pickupWindow !== undefined ? { pickupWindow: body.pickupWindow } : {}),
        ...(body.description !== undefined ? { description: body.description } : {}),
        ...(body.notes !== undefined ? { notes: body.notes } : {}),
        ...(body.image !== undefined ? { image: body.image } : {}),
        ...(body.urgent !== undefined ? { urgent: Boolean(body.urgent) } : {}),
        ...(body.status !== undefined ? { status: body.status } : {}),
        updatedAt: new Date().toISOString()
      };

      await listingsCollection.updateOne({ id }, { $set: updates });
      const updated = await listingsCollection.findOne({ id });

      await touchMeta();
      return sendJson(res, 200, { listing: normalizeDoc(updated) });
    }

    if (pathname.match(/^\/api\/listings\/[^/]+$/) && req.method === 'DELETE') {
      const id = pathname.split('/').pop();
      const userId = getUserId(req, url);

      if (!userId) {
        return sendJson(res, 400, { error: 'userId is required.' });
      }

      const listing = await listingsCollection.findOne({ id });
      if (!listing) {
        return sendJson(res, 404, { error: 'Listing not found.' });
      }

      if (listing.ownerId !== userId) {
        return sendJson(res, 403, { error: 'You can only delete your own listing.' });
      }

      await listingsCollection.deleteOne({ id });
      await touchMeta();

      return sendJson(res, 200, { ok: true });
    }

    if (pathname === '/api/requests/mine' && req.method === 'GET') {
      const userId = getUserId(req, url);
      if (!userId) {
        return sendJson(res, 400, { error: 'userId is required.' });
      }

      const requests = await requestsCollection
        .find({ requesterId: userId })
        .sort({ requestedAt: -1 })
        .toArray();

      return sendJson(res, 200, { requests: requests.map(normalizeDoc) });
    }

    if (pathname === '/api/requests' && req.method === 'POST') {
      const userId = getUserId(req, url);
      if (!userId) {
        return sendJson(res, 400, { error: 'userId is required.' });
      }

      const user = await usersCollection.findOne({ id: userId });
      if (!user) {
        return sendJson(res, 404, { error: 'User not found.' });
      }

      const { listingId, note = '' } = await readRequestBody(req);
      if (!listingId) {
        return sendJson(res, 400, { error: 'listingId is required.' });
      }

      const listing = await listingsCollection.findOne({ id: listingId });
      if (!listing) {
        return sendJson(res, 404, { error: 'Listing not found.' });
      }

      const existing = await requestsCollection.findOne({ listingId, requesterId: userId });
      if (existing) {
        return sendJson(res, 409, { error: 'You already requested this listing.' });
      }

      const requestDoc = {
        id: `req-${Date.now()}`,
        listingId,
        requesterId: userId,
        requesterName: user.name || user.firstName || 'User',
        ownerId: listing.ownerId,
        status: 'pending',
        requestedAt: new Date().toISOString(),
        note: String(note)
      };

      await requestsCollection.insertOne(requestDoc);
      await listingsCollection.updateOne(
        { id: listingId },
        { $inc: { requestCount: 1 }, $set: { updatedAt: new Date().toISOString() } }
      );

      await notificationsCollection.insertOne({
        id: `notif-${Date.now()}`,
        userId: listing.ownerId,
        text: `${requestDoc.requesterName} requested your ${listing.title} listing.`,
        type: 'request',
        read: false,
        createdAt: new Date().toISOString()
      });

      await touchMeta();
      return sendJson(res, 201, { request: normalizeDoc(requestDoc) });
    }

    if (pathname.match(/^\/api\/requests\/[^/]+\/status$/) && req.method === 'PATCH') {
      const id = pathname.split('/')[3];
      const userId = getUserId(req, url);

      if (!userId) {
        return sendJson(res, 400, { error: 'userId is required.' });
      }

      const requestDoc = await requestsCollection.findOne({ id });
      if (!requestDoc) {
        return sendJson(res, 404, { error: 'Request not found.' });
      }

      if (requestDoc.ownerId !== userId) {
        return sendJson(res, 403, { error: 'Only the listing owner can update request status.' });
      }

      const { status } = await readRequestBody(req);
      if (!['pending', 'accepted', 'declined', 'completed'].includes(status)) {
        return sendJson(res, 400, { error: 'Invalid status.' });
      }

      await requestsCollection.updateOne({ id }, { $set: { status } });

      await notificationsCollection.insertOne({
        id: `notif-${Date.now()}`,
        userId: requestDoc.requesterId,
        text: `Your request status was updated to "${status}".`,
        type: 'request',
        read: false,
        createdAt: new Date().toISOString()
      });

      await touchMeta();

      const updated = await requestsCollection.findOne({ id });
      return sendJson(res, 200, { request: normalizeDoc(updated) });
    }

    if (pathname === '/api/notifications' && req.method === 'GET') {
      const userId = getUserId(req, url);
      if (!userId) {
        return sendJson(res, 400, { error: 'userId is required.' });
      }

      const notifications = await notificationsCollection
        .find({ userId })
        .sort({ createdAt: -1 })
        .toArray();

      return sendJson(res, 200, { notifications: notifications.map(normalizeDoc) });
    }

    if (pathname === '/api/notifications/read' && req.method === 'PATCH') {
      const userId = getUserId(req, url);
      if (!userId) {
        return sendJson(res, 400, { error: 'userId is required.' });
      }

      const body = await readRequestBody(req);
      const notificationIds = Array.isArray(body.notificationIds) ? body.notificationIds : null;

      if (notificationIds && notificationIds.length > 0) {
        await notificationsCollection.updateMany(
          { userId, id: { $in: notificationIds } },
          { $set: { read: true } }
        );
      } else {
        await notificationsCollection.updateMany(
          { userId, read: false },
          { $set: { read: true } }
        );
      }

      await touchMeta();
      return sendJson(res, 200, { ok: true });
    }

    if (pathname === '/api/messages/conversations' && req.method === 'GET') {
      const userId = getUserId(req, url);
      if (!userId) {
        return sendJson(res, 400, { error: 'userId is required.' });
      }

      const conversations = await conversationsCollection
        .find({ participantIds: userId })
        .sort({ updatedAt: -1 })
        .toArray();

      const enriched = [];
      for (const conv of conversations) {
        const lastMessage = await messagesCollection.find({ conversationId: conv.id }).sort({ createdAt: -1 }).limit(1).toArray();
        const unreadCount = await notificationsCollection.countDocuments({
          userId,
          type: 'message',
          read: false
        });

        enriched.push({
          ...normalizeDoc(conv),
          unread: unreadCount,
          lastMessage: lastMessage[0] ? normalizeDoc(lastMessage[0]) : null
        });
      }

      return sendJson(res, 200, { conversations: enriched });
    }

    if (pathname === '/api/messages/conversations' && req.method === 'POST') {
      const userId = getUserId(req, url);
      if (!userId) {
        return sendJson(res, 400, { error: 'userId is required.' });
      }

      const { participantId, participantName, listingId = null } = await readRequestBody(req);
      if (!participantId || !participantName) {
        return sendJson(res, 400, { error: 'participantId and participantName are required.' });
      }

      const existing = await conversationsCollection.findOne({
        listingId,
        participantIds: { $all: [userId, participantId] }
      });

      if (existing) {
        return sendJson(res, 200, { conversation: normalizeDoc(existing) });
      }

      const conversation = {
        id: `conv-${Date.now()}`,
        listingId,
        participantIds: [userId, participantId],
        participantNames: [userId, participantName],
        participant: participantName,
        participantCity: 'Ulsan',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await conversationsCollection.insertOne(conversation);
      await touchMeta();

      return sendJson(res, 201, { conversation: normalizeDoc(conversation) });
    }

    if (pathname.match(/^\/api\/messages\/conversations\/[^/]+\/messages$/) && req.method === 'GET') {
      const conversationId = pathname.split('/')[4];
      const messages = await messagesCollection
        .find({ conversationId })
        .sort({ createdAt: 1 })
        .toArray();

      return sendJson(res, 200, { messages: messages.map(normalizeDoc) });
    }

    if (pathname.match(/^\/api\/messages\/conversations\/[^/]+\/messages$/) && req.method === 'POST') {
      const conversationId = pathname.split('/')[4];
      const userId = getUserId(req, url);

      if (!userId) {
        return sendJson(res, 400, { error: 'userId is required.' });
      }

      const user = await usersCollection.findOne({ id: userId });
      if (!user) {
        return sendJson(res, 404, { error: 'User not found.' });
      }

      const conversation = await conversationsCollection.findOne({ id: conversationId });
      if (!conversation) {
        return sendJson(res, 404, { error: 'Conversation not found.' });
      }

      const { text = '' } = await readRequestBody(req);
      if (!String(text).trim()) {
        return sendJson(res, 400, { error: 'Message text is required.' });
      }

      const message = {
        conversationId,
        senderId: userId,
        senderName: user.name || user.firstName || 'You',
        text: String(text).trim(),
        type: 'sent',
        createdAt: new Date().toISOString()
      };

      await messagesCollection.insertOne(message);
      await conversationsCollection.updateOne(
        { id: conversationId },
        { $set: { updatedAt: new Date().toISOString() } }
      );

      const recipientId = conversation.participantIds.find(id => id !== userId);
      if (recipientId) {
        await notificationsCollection.insertOne({
          id: `notif-${Date.now()}`,
          userId: recipientId,
          text: `${message.senderName} sent you a new message.`,
          type: 'message',
          read: false,
          createdAt: new Date().toISOString()
        });
      }

      await touchMeta();
      return sendJson(res, 201, { message: normalizeDoc(message) });
    }

    let filePath = path.join(ROOT, pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, ''));
    if (!filePath.startsWith(ROOT)) {
      return sendJson(res, 403, { error: 'Forbidden' });
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return sendFile(res, filePath);
    }

    return sendFile(res, path.join(ROOT, 'index.html'));
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { error: error.message || 'Server error' });
  }
});

async function startServer() {
  try {
    await client.connect();
    db = client.db(DB_NAME);

    usersCollection = db.collection('users');
    statesCollection = db.collection('states');
    metaCollection = db.collection('meta');
    listingsCollection = db.collection('listings');
    requestsCollection = db.collection('requests');
    conversationsCollection = db.collection('conversations');
    messagesCollection = db.collection('messages');
    notificationsCollection = db.collection('notifications');

    await ensureIndexes();
    await ensureSeedData();

    console.log('✅ MongoDB connected');

    server.listen(PORT, () => {
      console.log(`✅ Free Sewaa running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
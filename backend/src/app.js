const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');
const requestRoutes = require('./routes/requestRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

const publicPageAliases = {
  '/auth-choice.html': 'auth_choice.html',
  '/admin-login.html': 'admin_login.html',
  '/user-panel.html': 'user_panel.html',
  '/security-audit.html': 'security_audit.html'
};

app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, _res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  const aliasTarget = publicPageAliases[String(req.path || '').toLowerCase()];
  if (aliasTarget) {
    const suffix = String(req.url || '').slice(String(req.path || '').length);
    req.url = `/${aliasTarget}${suffix}`;
  }

  return next();
});
app.use('/uploads', express.static(path.join(process.cwd(), 'backend', 'uploads')));
app.use(express.static(process.cwd()));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, app: 'Free Sewaa API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Server error.' });
});

module.exports = app;

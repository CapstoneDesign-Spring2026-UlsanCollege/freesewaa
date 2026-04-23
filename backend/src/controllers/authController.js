const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

function userPayload(user) {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    name: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email || '',
    phone: user.phone || '',
    city: user.city || '',
    region: user.region || '',
    bio: user.bio || '',
    pickupAvailability: user.pickupAvailability || '',
    preferences: user.preferences || {}
  };
}

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName = '', email = '', phone = '', password } = req.body;
    if (!firstName || !password || (!email && !phone)) {
      return res.status(400).json({ error: 'First name, password, and email or phone are required.' });
    }

    const existing = await User.findOne({ $or: [email ? { email: email.toLowerCase() } : null, phone ? { phone } : null].filter(Boolean) });
    if (existing) return res.status(409).json({ error: 'User already exists with this email or phone.' });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ firstName, lastName, email: email.toLowerCase() || undefined, phone: phone || undefined, passwordHash });
    const token = generateToken(user);
    res.status(201).json({ token, user: userPayload(user) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create account.' });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email = '', phone = '', password } = req.body;
    if ((!email && !phone) || !password) return res.status(400).json({ error: 'Email or phone and password are required.' });

    const user = await User.findOne(email ? { email: email.toLowerCase() } : { phone });
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials.' });

    const token = generateToken(user);
    res.json({ token, user: userPayload(user) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign in.' });
  }
};

exports.me = async (req, res) => {
  res.json({ user: userPayload(req.user) });
};

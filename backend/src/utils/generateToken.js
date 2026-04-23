const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign(
    { sub: String(user._id), role: user.role || 'user' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

module.exports = generateToken;

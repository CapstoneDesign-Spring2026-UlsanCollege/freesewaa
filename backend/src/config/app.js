module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  rateLimit: {
    auth: { windowMs: 15 * 60 * 1000, max: 20 },
    api: { windowMs: 1 * 60 * 1000, max: 100 }
  }
};
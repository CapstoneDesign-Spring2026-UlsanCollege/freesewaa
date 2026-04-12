const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const connectDB = require('./config/db');
const swaggerSpec = require('./config/swagger');
const logger = require('./middleware/logger');
const { authLimiter, apiLimiter } = require('./middleware/rateLimit');
const corsOptions = require('./config/cors');
const { API_PREFIX } = require('./config/version');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const itemRoutes = require('./routes/items');
const requestRoutes = require('./routes/requests');
const messageRoutes = require('./routes/messages');

connectDB();

const app = express();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(`${API_PREFIX}/auth`, authLimiter, authRoutes);
app.use(`${API_PREFIX}/users`, apiLimiter, userRoutes);
app.use(`${API_PREFIX}/items`, apiLimiter, itemRoutes);
app.use(`${API_PREFIX}/requests`, apiLimiter, requestRoutes);
app.use(`${API_PREFIX}/messages`, apiLimiter, messageRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Free Sewaa API is running',
    status: 'success',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Free Sewaa server running on port ${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api-docs`);
});

module.exports = app;

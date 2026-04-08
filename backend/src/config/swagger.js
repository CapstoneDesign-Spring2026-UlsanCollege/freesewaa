const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Free Sewaa API',
      version: '1.0.0',
      description: 'Backend API for Free Sewaa - Community Donation Platform',
      contact: {
        name: 'Free Sewaa Team',
        email: 'support@freesewaa.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://free-sewaa-api.onrender.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            address: { type: 'string' },
            role: { type: 'string', enum: ['user', 'admin'] },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Item: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            category: { type: 'string' },
            condition: { type: 'string' },
            images: { type: 'array', items: { type: 'string' } },
            donor: { type: 'object', properties: { _id: { type: 'string' }, name: { type: 'string' } } },
            status: { type: 'string', enum: ['available', 'reserved', 'donated'] },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Request: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            item: { type: 'string' },
            requester: { type: 'object' },
            message: { type: 'string' },
            status: { type: 'string', enum: ['pending', 'accepted', 'rejected'] },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            errors: { type: 'array', items: { type: 'string' } }
          }
        }
      }
    },
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Users', description: 'User management' },
      { name: 'Items', description: 'Donation items' },
      { name: 'Requests', description: 'Item requests' },
      { name: 'Messages', description: 'Messaging between users' }
    ]
  },
  apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);

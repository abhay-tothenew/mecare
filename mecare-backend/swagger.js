const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MeCare Healthcare API',
      version: '1.0.0',
      description: 'API documentation for MeCare Healthcare Appointment System',
    },
    servers: [
      {
        url: process.env.FRONTEND_URL || 'https://mecare.vercel.app/home',
        description: 'Development server',
      },
      {
        url: process.env.BACKEND_URL || 'https://mecare-backend.onrender.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js', './controllers/*.js'],
};

module.exports = swaggerJsdoc(options); 
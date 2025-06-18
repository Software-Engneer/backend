// File: swagger/swaggerConfig.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Codveda Full-Stack Internship API',
      version: '1.0.0',
      description: 'API documentation for User and Product management',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to route files in src directory
};

export const swaggerSpec = swaggerJSDoc(options);

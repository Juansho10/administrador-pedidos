const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Pedidos',
      version: '1.0.0',
      description:
        'API REST para el Sistema Web de Gestión de Pedidos para Pequeños Negocios. ' +
        'Permite realizar operaciones CRUD sobre pedidos.',
      contact: {
        name: 'Desarrollo de Aplicaciones Web II',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Servidor local de desarrollo',
      },
    ],
  },
  apis: ['./swagger/*.js', './routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

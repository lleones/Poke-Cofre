import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Poke-Cofre',
      version: '1.0.0',
      description: 'Documentação da API do Poke-Cofre',
    },
    servers: [
      {
        url: 'http://10.5.9.181:3000', 
      },
    ],
  },
  apis: [
    './src/routes/*.ts',
    './src/models/*.ts',
    './src/controllers/*.ts',
  ],
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;

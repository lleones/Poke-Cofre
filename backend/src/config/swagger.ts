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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Treinador: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            nome: { type: 'string', example: 'Bill' },
          },
        },
        Pokemon: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            nickname: { type: 'string', example: 'Sparky' },
            name: { type: 'string', example: 'Pikachu' },
            trainerId: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174001' },
          },
        },
        Party: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'party-uuid-1234' },
            trainerId: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174001' },
            pokemons: {
              type: 'array',
              items: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            },
          },
        },
        Batalha: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'battle-uuid-5678' },
            winnerTrainerId: { type: 'string', example: '123e4567-e89bokemo-12d3-a456-426614174001' },
            loserTrainerId: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174002' },
            winnerPokemonId: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174003' },
            loserPokemonId: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174004' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts', './src/controllers/*.ts'],
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
};

export default setupSwagger;

// src/routes/pokemon.routes.ts
import { Router } from 'express';
import { PokemonController } from '../controllers/pokemon.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizePokemon } from '../middlewares/authorizePokemon';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Pokémons
 *     description: Endpoints para gerenciar Pokémons (todos exigem autenticação)
 *
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 *     description: "Insira seu token JWT no formato: Bearer <token>"
 */

/**
 * @swagger
 * /pokemons:
 *   get:
 *     summary: Retorna todos os Pokémons
 *     tags: [Pokémons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: "Token JWT no formato: Bearer <token>"
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de Pokémons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pokemon'
 */
router.get('/', authenticate, PokemonController.getAll);

/**
 * @swagger
 * /pokemons/{id}:
 *   get:
 *     summary: Retorna um Pokémon específico pelo ID
 *     tags: [Pokémons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: "Token JWT no formato: Bearer <token>"
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         description: "ID do Pokémon (UUID)"
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Pokémon encontrado"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: "Pokémon não encontrado"
 */
router.get('/:id', authenticate, PokemonController.getById);

/**
 * @swagger
 * /pokemons:
 *   post:
 *     summary: Cria um novo Pokémon
 *     tags: [Pokémons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: "Token JWT no formato: Bearer <token>"
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               trainerId:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - trainerId
 *               - name
 *     responses:
 *       201:
 *         description: "Pokémon criado"
 */
router.post('/', authenticate, PokemonController.create);

/**
 * @swagger
 * /pokemons/{id}:
 *   put:
 *     summary: Atualiza um Pokémon específico pelo ID
 *     tags: [Pokémons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: "Token JWT no formato: Bearer <token>"
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         description: "ID do Pokémon (UUID)"
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               name:
 *                 type: string
 *               trainerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Pokémon atualizado"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: "Pokémon não encontrado"
 *       403:
 *         description: "Ação não autorizada: 'você só pode modificar ou deletar Pokémons do seu treinador.'"
 */
router.put('/:id', authenticate, authorizePokemon, PokemonController.update);

/**
 * @swagger
 * /pokemons/{id}:
 *   delete:
 *     summary: Deleta um Pokémon específico pelo ID
 *     tags: [Pokémons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: "Token JWT no formato: Bearer <token>"
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         description: "ID do Pokémon (UUID)"
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: "Pokémon deletado"
 *       404:
 *         description: "Pokémon não encontrado"
 *       403:
 *         description: "Ação não autorizada: 'você só pode modificar ou deletar Pokémons do seu treinador.'"
 */
router.delete('/:id', authenticate, authorizePokemon, PokemonController.delete);

export default router;

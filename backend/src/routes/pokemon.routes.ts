import { Router } from 'express';
import { PokemonController } from '../controllers/pokemon.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pokémons
 *   description: Endpoints para gerenciar Pokémons
 */

/**
 * @swagger
 * /pokemons:
 *   get:
 *     summary: Retorna todos os Pokémons
 *     tags: [Pokémons]
 *     responses:
 *       200:
 *         description: Lista de Pokémons
 *   post:
 *     summary: Cria um novo Pokémon
 *     tags: [Pokémons]
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
 *         description: Pokémon criado
 */

/**
 * @swagger
 * /pokemons/{id}:
 *   get:
 *     summary: Retorna um Pokémon específico pelo ID
 *     tags: [Pokémons]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do Pokémon (UUID)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pokémon encontrado
 *       404:
 *         description: Pokémon não encontrado
 *   put:
 *     summary: Atualiza um Pokémon específico pelo ID
 *     tags: [Pokémons]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do Pokémon (UUID)
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
 *     responses:
 *       200:
 *         description: Pokémon atualizado
 *       404:
 *         description: Pokémon não encontrado
 *   delete:
 *     summary: Deleta um Pokémon específico pelo ID
 *     tags: [Pokémons]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do Pokémon (UUID)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pokémon deletado
 *       404:
 *         description: Pokémon não encontrado
 */

router.get('/', PokemonController.getAll);
router.get('/:id', PokemonController.getById);
router.post('/', PokemonController.create);
router.put('/:id', PokemonController.update);
router.delete('/:id', PokemonController.delete);

export default router;

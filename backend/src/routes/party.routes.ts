import { Router } from 'express';
import { PartyController } from '../controllers/party.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Parties
 *   description: Gerenciamento de Party (conjunto de até 6 Pokémon)
 */

/**
 * @swagger
 * /parties:
 *   post:
 *     summary: Cria uma nova party (0 a 6 Pokémons)
 *     tags: [Parties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trainerId:
 *                 type: string
 *               pokemons:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - trainerId
 *               - pokemons
 *     responses:
 *       201:
 *         description: Party criada
 *
 *   get:
 *     summary: Retorna todas as parties
 *     tags: [Parties]
 *     responses:
 *       200:
 *         description: Lista de parties
 *
 * /parties/{id}:
 *   get:
 *     summary: Retorna uma party específica
 *     tags: [Parties]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da Party
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Party encontrada
 *       404:
 *         description: Party não encontrada
 *   put:
 *     summary: Atualiza a lista de Pokémon da party (0 a 6 Pokémons)
 *     tags: [Parties]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da Party
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
 *               pokemons:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Party atualizada
 *       404:
 *         description: Party não encontrada
 *   delete:
 *     summary: Deleta uma party específica
 *     tags: [Parties]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da Party
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Party deletada
 *       404:
 *         description: Party não encontrada
 */

router.post('/', PartyController.create);
router.get('/', PartyController.getAll);
router.get('/:id', PartyController.getById);
router.put('/:id', PartyController.update);
router.delete('/:id', PartyController.delete);

export default router;

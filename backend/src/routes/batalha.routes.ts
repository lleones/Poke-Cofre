import { Router } from 'express';
import { BatalhaController } from '../controllers/batalha.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Batalhas
 *   description: Histórico de batalhas
 */

/**
 * @swagger
 * /batalhas:
 *   post:
 *     summary: Cria uma nova batalha
 *     tags: [Batalhas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               winnerTrainerId:
 *                 type: string
 *               loserTrainerId:
 *                 type: string
 *               winnerPokemonId:
 *                 type: string
 *               loserPokemonId:
 *                 type: string
 *             required:
 *               - winnerTrainerId
 *               - loserTrainerId
 *               - winnerPokemonId
 *               - loserPokemonId
 *     responses:
 *       201:
 *         description: Batalha criada
 *   get:
 *     summary: Retorna todas as batalhas
 *     tags: [Batalhas]
 *     responses:
 *       200:
 *         description: Lista de batalhas
 *
 * /batalhas/{id}:
 *   get:
 *     summary: Retorna uma batalha específica pelo ID
 *     tags: [Batalhas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da batalha
 *     responses:
 *       200:
 *         description: Batalha encontrada
 *       404:
 *         description: Batalha não encontrada
 *   delete:
 *     summary: Deleta uma batalha pelo ID
 *     tags: [Batalhas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da batalha
 *     responses:
 *       204:
 *         description: Batalha deletada
 *       404:
 *         description: Batalha não encontrada
 */

router.post('/', BatalhaController.create);
router.get('/', BatalhaController.getAll);
router.get('/:id', BatalhaController.getById);
router.delete('/:id', BatalhaController.delete);

export default router;

import { Router } from 'express';
import { BatalhaController } from '../controllers/batalha.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Batalhas
 *     description: Histórico de batalhas
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
 * /batalhas:
 *   post:
 *     summary: Cria uma nova batalha
 *     tags: [Batalhas]
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Batalha'
 *
 *   get:
 *     summary: Retorna todas as batalhas
 *     tags: [Batalhas]
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
 *         description: Lista de batalhas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Batalha'
 *
 * /batalhas/{id}:
 *   get:
 *     summary: Retorna uma batalha específica pelo ID
 *     tags: [Batalhas]
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
 *         description: ID da batalha
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Batalha encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Batalha'
 *       404:
 *         description: Batalha não encontrada
 *
 *   delete:
 *     summary: Deleta uma batalha pelo ID
 *     tags: [Batalhas]
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
 *         description: ID da batalha
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Batalha deletada
 *       404:
 *         description: Batalha não encontrada
 */
router.post('/', authenticate, BatalhaController.create);
router.get('/', authenticate, BatalhaController.getAll);
router.get('/:id', authenticate, BatalhaController.getById);
router.delete('/:id', authenticate, BatalhaController.delete);

export default router;

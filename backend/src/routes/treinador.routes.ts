// src/routes/treinador.routes.ts
import { Router } from 'express';
import { TreinadorController } from '../controllers/treinador.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authenticateBill } from '../middlewares/authenticateBill';
import { authorizeTreinador } from '../middlewares/authorizeTrainador';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Treinadores
 *     description: Endpoints para gerenciar Treinadores (todos exigem autenticação)
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
 * /treinadores:
 *   get:
 *     summary: Retorna todos os treinadores (Apenas Bill pode acessar)
 *     tags: [Treinadores]
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
 *         description: Uma lista de treinadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Treinador'
 *       403:
 *         description: Acesso negado. Apenas Bill pode acessar este endpoint.
 */
router.get('/', authenticateBill, TreinadorController.getAll);

/**
 * @swagger
 * /treinadores/{id}:
 *   get:
 *     summary: Retorna um treinador pelo ID (UUID)
 *     tags: [Treinadores]
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
 *         description: ID do treinador (UUID)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do treinador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treinador'
 *       404:
 *         description: Treinador não encontrado
 *
 *   put:
 *     summary: Atualiza um treinador existente. **Importante:** O token deve pertencer ao mesmo treinador ou ser Bill.
 *     tags: [Treinadores]
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
 *         description: ID do treinador (UUID)
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
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Treinador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Treinador'
 *       403:
 *         description: Ação não autorizada – o token não pertence ao treinador alvo.
 *       404:
 *         description: Treinador não encontrado
 *
 *   delete:
 *     summary: Deleta um treinador. **Importante:** O token deve pertencer ao mesmo treinador ou ser Bill.
 *     tags: [Treinadores]
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
 *         description: ID do treinador (UUID)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Treinador deletado com sucesso
 *       403:
 *         description: Ação não autorizada – o token não pertence ao treinador alvo.
 *       404:
 *         description: Treinador não encontrado
 */
router.get('/:id', authenticate, authorizeTreinador, TreinadorController.getById);
router.put('/:id', authenticate, authorizeTreinador, TreinadorController.update);
router.delete('/:id', authenticate, authorizeTreinador, TreinadorController.deleteTreinador);

export default router;

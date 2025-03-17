// src/routes/party.routes.ts
import { Router } from 'express';
import { PartyController } from '../controllers/party.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authenticateBill } from '../middlewares/authenticateBill';
import { authorizeParty } from '../middlewares/authorizeParty';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Parties
 *     description: Gerenciamento de Party (conjunto de até 6 Pokémon)
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
 * /parties:
 *   post:
 *     summary: Cria uma nova party (0 a 6 Pokémons)
 *     tags: [Parties]
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Party'
 *       403:
 *         description: Ação não autorizada.
 *
 *   get:
 *     summary: Retorna todas as parties (Apenas Bill pode acessar)
 *     tags: [Parties]
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
 *         description: Lista de parties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Party'
 *       403:
 *         description: Acesso negado. Apenas Bill pode acessar este endpoint.
 *
 * /parties/{id}:
 *   get:
 *     summary: Retorna uma party específica
 *     tags: [Parties]
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
 *         description: ID da Party
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Party encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Party'
 *       404:
 *         description: Party não encontrada
 *
 *   put:
 *     summary: Atualiza a lista de Pokémon da party (0 a 6 Pokémons)
 *     tags: [Parties]
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Party'
 *       403:
 *         description: Ação não autorizada.
 *       404:
 *         description: Party não encontrada
 *
 *   delete:
 *     summary: Deleta uma party específica
 *     tags: [Parties]
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
 *         description: ID da Party
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Party deletada
 *       403:
 *         description: Ação não autorizada.
 *       404:
 *         description: Party não encontrada
 */
router.post('/', authenticate, authorizeParty, PartyController.create);
router.get('/', authenticateBill, PartyController.getAll);
router.get('/:id', authenticate, authorizeParty, PartyController.getById);
router.put('/:id', authenticate, authorizeParty, PartyController.update);
router.delete('/:id', authenticate, authorizeParty, PartyController.delete);

export default router;

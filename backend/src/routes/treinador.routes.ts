import { Router } from 'express';
import { TreinadorController } from '../controllers/treinador.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Treinadores
 *   description: Endpoints para gerenciar Treinadores
 */

/**
 * @swagger
 * /treinadores:
 *   get:
 *     summary: Retorna todos os treinadores
 *     tags: [Treinadores]
 *     responses:
 *       200:
 *         description: Uma lista de treinadores
 *   post:
 *     summary: Cria um novo treinador
 *     tags: [Treinadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *             required:
 *               - nome
 *     responses:
 *       201:
 *         description: Treinador criado
 */

/**
 * @swagger
 * /treinadores/{id}:
 *   get:
 *     summary: Retorna um treinador pelo ID (UUID)
 *     tags: [Treinadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do treinador (UUID)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do treinador
 *       404:
 *         description: Treinador não encontrado
 *
 *   put:
 *     summary: Atualiza um treinador existente
 *     tags: [Treinadores]
 *     parameters:
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
 *       404:
 *         description: Treinador não encontrado
 *
 *   delete:
 *     summary: Deleta um treinador
 *     tags: [Treinadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do treinador (UUID)
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Treinador deletado com sucesso
 *       404:
 *         description: Treinador não encontrado
 */

router.get('/', TreinadorController.getAll);
router.get('/:id', TreinadorController.getById);
router.post('/', TreinadorController.create);
router.put('/:id', TreinadorController.update);
router.delete('/:id', TreinadorController.deleteTreinador);

export default router;

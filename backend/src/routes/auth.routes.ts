// src/routes/auth.routes.ts
import { Router } from 'express';
import { asyncHandler } from '../utils/asynchandler';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints para autenticação e registro de treinadores
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo treinador
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               senha:
 *                 type: string
 *             required:
 *               - nome
 *               - senha
 *     responses:
 *       201:
 *         description: Treinador registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 treinador:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     nome:
 *                       type: string
 *       400:
 *         description: Erro de validação (nome ou senha não fornecidos, ou treinador já existente)
 *       500:
 *         description: Erro no servidor
 */
router.post('/register', asyncHandler(AuthController.register));

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do treinador
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               senha:
 *                 type: string
 *             required:
 *               - nome
 *               - senha
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Nome ou senha inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post('/login', asyncHandler(AuthController.login));

export default router;

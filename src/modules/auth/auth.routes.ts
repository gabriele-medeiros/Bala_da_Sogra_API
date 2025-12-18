import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();
const controller = new AuthController();

/**
 * @openapi
 * tags:
 *   name: Autenticação
 *   description: Login do administrador e fornecedor
 */

/**
 * @openapi
 * /auth/login-admin:
 *   post:
 *     tags: [Autenticação]
 *     summary: Login do administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginAdmin'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             example:
 *               token: "<jwt_token>"
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login-admin', controller.loginAdmin.bind(controller));

/**
 * @openapi
 * /auth/login-fornecedor:
 *   post:
 *     tags: [Autenticação]
 *     summary: Login do fornecedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginFornecedor'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             example:
 *               token: "<jwt_token>"
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login-fornecedor', controller.loginFornecedor.bind(controller));

export default router;
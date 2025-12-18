import { Router } from 'express';
import { ProdutoController } from './produto.controller';
import { authenticateJWT, authorizeRole } from '../../shared/middlewares/auth.middleware';

const router = Router();
const controller = new ProdutoController();

/**
 * @openapi
 * tags:
 *   name: Produtos
 *   description: CRUD de produtos
 */

/**
 * @openapi
 * /produtos:
 *   get:
 *     tags: [Produtos]
 *     summary: Lista produtos (paginado)
 *     parameters:
 *       - name: pagina
 *         in: query
 *         schema:
 *           type: integer
 *       - name: limite
 *         in: query
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/', controller.list.bind(controller));

/**
 * @openapi
 * /produtos/{idProd}:
 *   get:
 *     tags: [Produtos]
 *     summary: Busca um produto pelo ID
 *     parameters:
 *       - name: idProd
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:idProd', controller.get.bind(controller));

/**
 * @openapi
 * /produtos:
 *   post:
 *     tags: [Produtos]
 *     security:
 *       - BearerAuth: []
 *     summary: Cria um novo produto (ADMIN)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descProd
 *               - unidMedProd
 *               - precoProd
 *             properties:
 *               descProd:
 *                 type: string
 *               unidMedProd:
 *                 type: string
 *               precoProd:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto criado
 */
router.post('/', authenticateJWT, authorizeRole(['admin']), controller.create.bind(controller));

/**
 * @openapi
 * /produtos/{idProd}:
 *   put:
 *     tags: [Produtos]
 *     security:
 *       - BearerAuth: []
 *     summary: Atualiza um produto (ADMIN)
 *     parameters:
 *       - name: idProd
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:idProd', authenticateJWT, authorizeRole(['admin']), controller.update.bind(controller));

/**
 * @openapi
 * /produtos/{idProd}:
 *   delete:
 *     tags: [Produtos]
 *     security:
 *       - BearerAuth: []
 *     summary: Remove um produto (ADMIN)
 *     parameters:
 *       - name: idProd
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Produto removido
 */
router.delete('/:idProd', authenticateJWT, authorizeRole(['admin']), controller.remove.bind(controller));

export default router;
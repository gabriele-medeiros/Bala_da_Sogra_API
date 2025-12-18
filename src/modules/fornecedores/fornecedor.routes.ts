import { Router } from 'express';
import { FornecedorController } from './fornecedor.controller';
import { authenticateJWT, authorizeRole } from '../../shared/middlewares/auth.middleware';
import { hashPassword } from '../../shared/utils/hash';

const router = Router();
const controller = new FornecedorController();

/**
 * @openapi
 * tags:
 *   name: Fornecedores
 *   description: Gestão de fornecedores
 */

/**
 * @openapi
 * /fornecedores:
 *   post:
 *     tags: [Fornecedores]
 *     security:
 *       - BearerAuth: []
 *     summary: Cria fornecedor (ADMIN)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - CNPJ
 *               - contato
 *               - email
 *               - password
 *             properties:
 *               nome:
 *                 type: string
 *               CNPJ:
 *                 type: string
 *               contato:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fornecedor criado
 */
router.post('/', authenticateJWT, authorizeRole(['admin']), async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }
    return controller.create(req, res);
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * /fornecedores:
 *   get:
 *     tags: [Fornecedores]
 *     security:
 *       - BearerAuth: []
 *     summary: Lista fornecedores (admin)
 *     responses:
 *       200:
 *         description: Lista de fornecedores
 */
router.get('/', authenticateJWT, authorizeRole(['admin']), controller.list.bind(controller));

/**
 * @openapi
 * /fornecedores/{idForn}:
 *   get:
 *     tags: [Fornecedores]
 *     security:
 *       - BearerAuth: []
 *     summary: Busca fornecedor por ID
 *     parameters:
 *       - name: idForn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fornecedor encontrado
 */
router.get('/:idForn', authenticateJWT, authorizeRole(['admin']), controller.get.bind(controller));

/**
 * @openapi
 * /fornecedores/{idForn}:
 *   put:
 *     tags: [Fornecedores]
 *     security:
 *       - BearerAuth: []
 *     summary: Atualiza fornecedor
 *     parameters:
 *       - name: idForn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fornecedor atualizado
 */
router.put('/:idForn', authenticateJWT, authorizeRole(['admin']), controller.update.bind(controller));

/**
 * @openapi
 * /fornecedores/{idForn}:
 *   delete:
 *     tags: [Fornecedores]
 *     security:
 *       - BearerAuth: []
 *     summary: Remove fornecedor
 *     parameters:
 *       - name: idForn
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Removido
 */
router.delete('/:idForn', authenticateJWT, authorizeRole(['admin']), controller.remove.bind(controller));

export default router;
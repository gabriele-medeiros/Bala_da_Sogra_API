import { Router } from 'express';
import { PropostaController } from './proposta.controller';
import { authenticateJWT, authorizeRole } from '../../shared/middlewares/auth.middleware';

const router = Router();
const controller = new PropostaController();

/**
 * @openapi
 * tags:
 *   name: Propostas
 *   description: Propostas criadas por fornecedores (admin vê tudo)
 */

/**
 * @openapi
 * /propostas:
 *   get:
 *     tags: [Propostas]
 *     security:
 *       - BearerAuth: []
 *     summary: Lista propostas (ADMIN)
 *     responses:
 *       200:
 *         description: Lista de propostas
 */
router.get('/', authenticateJWT, authorizeRole(['admin']), controller.list.bind(controller));

/**
 * @openapi
 * /propostas:
 *   post:
 *     tags: [Propostas]
 *     security:
 *       - BearerAuth: []
 *     summary: Fornecedor cria proposta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descProp
 *               - valorProp
 *             properties:
 *               descProp:
 *                 type: string
 *               valorProp:
 *                 type: number
 *     responses:
 *       201:
 *         description: Proposta criada
 */
router.post('/', authenticateJWT, (req, res, next) => {
  if (req.user?.role !== 'fornecedor') return res.status(403).json({ mensagem: 'Apenas fornecedores podem criar propostas' });
  return controller.create(req, res);
});

router.get('/:idProp', authenticateJWT, authorizeRole(['admin']), controller.get.bind(controller));
router.put('/:idProp', authenticateJWT, authorizeRole(['admin']), controller.update.bind(controller));
router.delete('/:idProp', authenticateJWT, authorizeRole(['admin']), controller.remove.bind(controller));

export default router;
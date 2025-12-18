import express from 'express';
import helmet from 'helmet';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import produtosRoutes from './modules/produtos/produto.routes';
import fornecedoresRoutes from './modules/fornecedores/fornecedor.routes';
import propostasRoutes from './modules/propostas/proposta.routes';
import authRoutes from './modules/auth/auth.routes';
import { errorHandler } from './shared/middlewares/error.middleware';

export const createApp = () => {
  const app = express();
  app.use(helmet());
  app.use(express.json());

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use('/api/produtos', produtosRoutes);
  app.use('/api/fornecedores', fornecedoresRoutes);
  app.use('/api/propostas', propostasRoutes);
  app.use('/api/auth', authRoutes);

  app.use(errorHandler);

  return app;
};

export default createApp;
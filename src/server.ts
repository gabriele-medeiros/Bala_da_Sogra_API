import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import { AppDataSource } from './database/data-source';
import { createApp } from './app';

const PORT = Number(process.env.PORT || 3000);

AppDataSource.initialize().then(async () => {
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/api`);
    console.log(`Documentação Swagger: http://localhost:${PORT}/api/docs`);
  });
}).catch(err => {
  console.error('Falha ao inicializar o banco de dados', err);
  process.exit(1);
});
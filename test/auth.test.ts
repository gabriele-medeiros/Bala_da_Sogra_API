import request from 'supertest';
import { createApp } from '../src/app';
import { AppDataSource } from '../src/database/data-source';
import { hashPassword } from '../src/shared/utils/hash';
import { User } from '../src/modules/auth/user.entity';

let app: any;

beforeAll(async () => {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(User);

  // Criar admin para testes
  const email = 'testadmin@bala.com';
  const senha = 'test123';

  const exists = await repo.findOne({ where: { email }});
  if (!exists) {
    const admin = repo.create({
      email,
      password: await hashPassword(senha),
      role: 'admin'
    });
    await repo.save(admin);
  }

  app = createApp();
});

afterAll(async () => {
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
});

describe('Auth', () => {
  it('deve autenticar admin e retornar token', async () => {
    const res = await request(app)
      .post('/api/auth/login-admin')
      .send({ email: 'testadmin@bala.com', password: 'test123' })
      .expect(200);

    expect(res.body.token).toBeDefined();
  });

  it('não deve autenticar credenciais inválidas', async () => {
    await request(app)
      .post('/api/auth/login-admin')
      .send({ email: 'naoexiste@teste.com', password: 'senhaerrada' })
      .expect(401);
  });
});
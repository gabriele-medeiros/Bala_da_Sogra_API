import request from 'supertest';
import { createApp } from '../src/app';
import { AppDataSource } from '../src/database/data-source';
import { hashPassword } from '../src/shared/utils/hash';
import { User } from '../src/modules/auth/user.entity';

let app: any;
let tokenAdmin: string;

beforeAll(async () => {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(User);
  const testEmail = 'testadmin3@bala.com';

  const exists = await repo.findOne({ where: { email: testEmail }});

  if (!exists) {
    const admin = repo.create({
      email: testEmail,
      password: await hashPassword('test123'),
      role: 'admin'
    });
    await repo.save(admin);
  }

  app = createApp();

  const res = await request(app)
    .post('/api/auth/login-admin')
    .send({ email: testEmail, password: 'test123' });

  tokenAdmin = res.body.token;
});

afterAll(async () => {
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
});

describe('Fornecedores', () => {
  it('deve criar, listar e deletar fornecedor (fluxo básico)', async () => {

    const uniqueCNPJ = Date.now().toString();

    const forn = { 
      nome: 'Fornecedor Teste',
      CNPJ: uniqueCNPJ,
      contato: '16999999999',
      email: `forn${uniqueCNPJ}@test.com`,
      password: 'senha123'
    };

    const createRes = await request(app)
      .post('/api/fornecedores')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send(forn)
      .expect(201);

    expect(createRes.body.idForn).toBeDefined();

    const listRes = await request(app)
      .get('/api/fornecedores')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(200);

    expect(listRes.body.items.length).toBeGreaterThan(0);

    const id = createRes.body.idForn;

    await request(app)
      .delete(`/api/fornecedores/${id}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(204);
  });
});
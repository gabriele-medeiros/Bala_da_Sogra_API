import request from 'supertest';
import { createApp } from '../src/app';
import { AppDataSource } from '../src/database/data-source';
import { hashPassword } from '../src/shared/utils/hash';
import { User } from '../src/modules/auth/user.entity';

let app: any;
let tokenFornecedor: string;
let tokenAdmin: string;
let fornecedorId: string;

beforeAll(async () => {
  await AppDataSource.initialize();

  const repoUser = AppDataSource.getRepository(User);
  const emailAdmin = 'testadmin4@bala.com';

  const exists = await repoUser.findOne({ where: { email: emailAdmin }});
  if (!exists) {
    const admin = repoUser.create({
      email: emailAdmin,
      password: await hashPassword('test123'),
      role: 'admin'
    });
    await repoUser.save(admin);
  }

  app = createApp();

  const resAdmin = await request(app)
    .post('/api/auth/login-admin')
    .send({ email: emailAdmin, password: 'test123' });

  tokenAdmin = resAdmin.body.token;

  const forn = {
    nome: 'Fornecedor Propostas',
    CNPJ: '00000000000192',
    contato: '16988888888',
    email: 'fornprop@test.com',
    password: 'senha123'
  };

  const createF = await request(app)
    .post('/api/fornecedores')
    .set('Authorization', `Bearer ${tokenAdmin}`)
    .send(forn)
    .expect(201);

  fornecedorId = createF.body.idForn;

  const loginF = await request(app)
    .post('/api/auth/login-fornecedor')
    .send({ email: forn.email, password: 'senha123' });

  tokenFornecedor = loginF.body.token;
});

afterAll(async () => {
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
});

describe('Propostas', () => {

  it('deve criar proposta como fornecedor e admin listar', async () => {

    const prop = { descProp: 'Cotação de açúcar', valorProp: 5.00 };

    const createRes = await request(app)
      .post('/api/propostas')
      .set('Authorization', `Bearer ${tokenFornecedor}`)
      .send(prop)
      .expect(201);

    expect(createRes.body.idProp).toBeDefined();

    const listRes = await request(app)
      .get('/api/propostas')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(200);

    expect(Array.isArray(listRes.body.items)).toBe(true);
    expect(listRes.body.items.length).toBeGreaterThan(0);

    const id = createRes.body.idProp;

    await request(app)
      .delete(`/api/propostas/${id}`)
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .expect(204);
  });

});
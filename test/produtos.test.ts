import request from 'supertest';
import { createApp } from '../src/app';
import { AppDataSource } from '../src/database/data-source';
import { hashPassword } from '../src/shared/utils/hash';
import { User } from '../src/modules/auth/user.entity';

let app: any;
let token: string;
let createdId: string;

beforeAll(async () => {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(User);
  const email = 'testadmin_prod@bala.com';

  const exists = await repo.findOne({ where: { email }});
  if (!exists) {
    const admin = repo.create({
      email,
      password: await hashPassword('test123'),
      role: 'admin'
    });
    await repo.save(admin);
  }

  app = createApp();

  const res = await request(app)
    .post('/api/auth/login-admin')
    .send({ email, password: 'test123' });

  token = res.body.token;
});

afterAll(async () => {
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
});

describe('Produtos - CRUD Completo', () => {

  it('deve criar um produto', async () => {
    const res = await request(app)
      .post('/api/produtos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        descProd: 'Produto Teste',
        unidMedProd: 'UN',
        precoProd: 10.5
      })
      .expect(201);

    expect(res.body.idProd).toBeDefined();
    createdId = res.body.idProd;
  });

  it('deve listar produtos', async () => {
    const res = await request(app)
      .get('/api/produtos')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.items.length).toBeGreaterThan(0);
  });

  it('deve buscar produto por ID', async () => {
    const res = await request(app)
      .get(`/api/produtos/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.idProd).toBe(createdId);
  });

  it('deve atualizar produto', async () => {
    const res = await request(app)
      .put(`/api/produtos/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        descProd: 'Produto Atualizado',
        unidMedProd: 'CX',
        precoProd: 20.0
      })
      .expect(200);

    expect(res.body.descProd).toBe('Produto Atualizado');
  });

  it('deve deletar produto', async () => {
    await request(app)
      .delete(`/api/produtos/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });

});
import { AppDataSource } from '../database/data-source';
import { User } from '../modules/auth/user.entity';
import { hashPassword } from '../shared/utils/hash';

async function seed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(User);

  const email = 'caio.silva214@fatec.sp.gov.br';
  const senha = 'baladasogra_senha';

  const exists = await repo.findOne({ where: { email }});

  if (!exists) {
    const user = repo.create({
      email,
      password: await hashPassword(senha),
      role: 'admin'
    });

    await repo.save(user);
    console.log(`Usuário administrador criado: ${email} / ${senha}`);
  } else {
    console.log('Administrador já existe.');
  }

  await AppDataSource.destroy();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
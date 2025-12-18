import { AppDataSource } from '../../database/data-source';
import { User } from './user.entity';
import { Fornecedor } from '../fornecedores/fornecedor.entity';
import { comparePassword } from '../../shared/utils/hash';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'mudesecreto';
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '1d';

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);
  private fornRepo = AppDataSource.getRepository(Fornecedor);

  async loginAdmin(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email }});
    if (!user) throw { status: 401, message: 'Credenciais inválidas' };
    const match = await comparePassword(password, user.password);
    if (!match) throw { status: 401, message: 'Credenciais inválidas' };

    const payload: JwtPayload = {
      sub: user.id,
      role: 'admin',
      email: user.email
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES } as jwt.SignOptions);
    return { token };
  }

  async loginFornecedor(email: string, password: string) {
    const fornecedor = await this.fornRepo.findOne({ where: { email }});
    if (!fornecedor || !fornecedor.password) throw { status: 401, message: 'Credenciais inválidas' };
    const match = await comparePassword(password, fornecedor.password);
    if (!match) throw { status: 401, message: 'Credenciais inválidas' };

    const payload: JwtPayload = {
      sub: fornecedor.idForn,
      role: 'fornecedor',
      email: fornecedor.email
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES } as jwt.SignOptions);
    return { token };
  }
}
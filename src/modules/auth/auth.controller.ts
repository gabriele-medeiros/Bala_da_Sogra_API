import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const service = new AuthService();

export class AuthController {
  async loginAdmin(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await service.loginAdmin(email, password);
    return res.json(result);
  }

  async loginFornecedor(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await service.loginFornecedor(email, password);
    return res.json(result);
  }
}
import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  if (err && err.status && err.message) {
    return res.status(err.status).json({ mensagem: err.message });
  }
  return res.status(500).json({ mensagem: 'Erro interno do servidor' });
}
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthPayload extends JwtPayload {
  sub: string;
  role: 'admin' | 'fornecedor';
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ mensagem: 'Token não fornecido' });

  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) return res.status(401).json({ mensagem: 'Formato de token inválido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    if (!decoded?.sub || !decoded?.role) return res.status(401).json({ mensagem: 'Token inválido' });
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
  }
};

export const authorizeRole = (roles: Array<'admin' | 'fornecedor'>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ mensagem: 'Token não fornecido' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ mensagem: 'Acesso negado' });
    next();
  };
};
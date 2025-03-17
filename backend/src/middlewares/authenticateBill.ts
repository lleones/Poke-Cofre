// src/middlewares/authenticateBill.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '../services/auth.service';

export const authenticateBill: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      res.status(401).json({ message: 'Token não fornecido.' });
      return;
    }
    
    const parts = header.split(' ');
    if (parts.length !== 2) {
      res.status(401).json({ message: 'Token inválido.' });
      return;
    }
    
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      res.status(401).json({ message: 'Formato de token inválido.' });
      return;
    }
    
    const decoded = verifyToken(token);
    if (typeof decoded === 'string' || !('nome' in decoded)) {
      res.status(401).json({ message: 'Token inválido ou payload inesperado.' });
      return;
    }
    
    if (decoded.nome !== 'Bill') {
      res.status(403).json({ message: 'Acesso negado. Apenas Bill pode acessar este endpoint.' });
      return;
    }

    (req as any).treinadorId = decoded.id;
    (req as any).treinadorNome = decoded.nome;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

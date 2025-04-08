// src/middlewares/authorizeTreinador.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const authorizeTreinador: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const tokenTreinadorId = (req as any).treinadorId;
  const tokenTreinadorNome = (req as any).treinadorNome;
  const targetTreinadorId = req.params.id;

  if (tokenTreinadorNome && tokenTreinadorNome.toLowerCase() === 'bill') {
    return next();
  }

  if (tokenTreinadorId !== targetTreinadorId) {
    res.status(403).json({
      message: 'Ação não autorizada: você só pode modificar ou deletar seu próprio perfil.'
    });
    return;
  }
  
  next();
};

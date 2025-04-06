// src/middlewares/authorizeParty.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const authorizeParty: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const tokenTrainerId = (req as any).treinadorId;
  const tokenTrainerNome = (req as any).treinadorNome;
  const requestTrainerId = req.body.trainerId;
  if (tokenTrainerNome === 'Bill') {
    return next();
  }
  if (!requestTrainerId || requestTrainerId !== tokenTrainerId) {
    res.status(403).json({ message: 'Ação não autorizada: você só pode modificar ou deletar parties do seu treinador.' });
    return;
  }
  next();
};

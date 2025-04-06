import { Request, Response, NextFunction, RequestHandler } from 'express';

export const authorizePokemon: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const tokenTreinadorId = (req as any).treinadorId;
  const tokenTreinadorNome = (req as any).treinadorNome;
  const requestTrainerId = req.body.trainerId;
  if (tokenTreinadorNome === 'Bill') {
    return next();
  }
  if (requestTrainerId && tokenTreinadorId !== requestTrainerId) {
    res.status(403).json({ message: 'Ação não autorizada: você só pode modificar ou deletar Pokémons do seu treinador.' });
    return;
  }
  next();
};

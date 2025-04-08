// src/middlewares/authorizeParty.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { PartyService } from '../services/party.service';

export const authorizeParty: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const tokenTrainerId = (req as any).treinadorId;
  const tokenTrainerNome = (req as any).treinadorNome;

  // Permite o usuário "Bill" sem novas verificações
  if (tokenTrainerNome === 'Bill') {
    next();
    return;
  }

  // Tenta extrair o trainerId do corpo da requisição
  let requestTrainerId = req.body.trainerId;

  // Se não estiver presente no body (e.g., update ou delete), busca a party pelo id da rota para obter o trainerId
  if (!requestTrainerId && req.params.id) {
    try {
      const party = await PartyService.getPartyById(req.params.id);
      if (!party) {
        res.status(404).json({ message: 'Party não encontrada.' });
        return;
      }
      requestTrainerId = party.trainerId;
    } catch (error) {
      res.status(500).json({ message: 'Erro ao autorizar ação na party.' });
      return;
    }
  }

  if (!requestTrainerId || requestTrainerId !== tokenTrainerId) {
    res.status(403).json({ message: 'Ação não autorizada: você só pode modificar ou deletar parties do seu treinador.' });
    return;
  }
  
  next();
};

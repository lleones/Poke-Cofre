import { Request, Response } from 'express';
import { BatalhaService } from '../services/batalha.service';

export class BatalhaController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { winnerTrainerId, loserTrainerId, winnerPokemonId, loserPokemonId } = req.body;
      if (!winnerTrainerId || !loserTrainerId || !winnerPokemonId || !loserPokemonId) {
        res.status(400).json({ error: 'Todos os parâmetros são obrigatórios' });
        return;
      }
      const batalha = await BatalhaService.createBatalha({
        winnerTrainerId,
        loserTrainerId,
        winnerPokemonId,
        loserPokemonId,
      });
      res.status(201).json(batalha);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Erro ao criar batalha' });
    }
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const batalhas = await BatalhaService.getAllBatalhas(req.query as any);
      res.json(batalhas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar batalhas' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const batalha = await BatalhaService.getBatalhaById(id);
      if (!batalha) {
        res.status(404).json({ error: 'Batalha não encontrada' });
        return;
      }
      res.json(batalha);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar batalha' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await BatalhaService.deleteBatalha(id);
      if (!success) {
        res.status(404).json({ error: 'Batalha não encontrada' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar batalha' });
    }
  }
}

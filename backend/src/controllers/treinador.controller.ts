// src/controllers/treinador.controller.ts
import { Request, Response } from 'express';
import { TreinadorService } from '../services/treinador.service';

export class TreinadorController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      // Passa os query parameters para o service
      const treinadores = await TreinadorService.getAllTreinadores(req.query as any);
      res.json(treinadores);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar treinadores' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const treinador = await TreinadorService.getTreinadorById(id);
      if (!treinador) {
        res.status(404).json({ error: 'Treinador não encontrado' });
        return;
      }
      res.json(treinador);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar treinador' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const treinadorData = req.body;
      const treinador = await TreinadorService.createTreinador(treinadorData);
      res.status(201).json(treinador);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar treinador' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const treinadorData = req.body;
      const treinador = await TreinadorService.updateTreinador(id, treinadorData);
      if (!treinador) {
        res.status(404).json({ error: 'Treinador não encontrado' });
        return;
      }
      res.json(treinador);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar treinador' });
    }
  }

  static async deleteTreinador(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const success = await TreinadorService.deleteTreinador(id);
      if (!success) {
        res.status(404).json({ error: 'Treinador não encontrado' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar treinador' });
    }
  }
}

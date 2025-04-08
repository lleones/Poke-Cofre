// src/controllers/party.controller.ts
import { Request, Response } from 'express';
import { PartyService } from '../services/party.service';

export class PartyController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const parties = await PartyService.getAllParties(req.query as any);
      res.json(parties);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar parties' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const party = await PartyService.getPartyById(id);
      if (!party) {
        res.status(404).json({ error: 'Party não encontrada' });
        return;
      }
      res.json(party);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar party' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      // Usa o id do treinador vindo do token (via middleware de autenticação)
      const trainerId = (req as any).treinadorId;
      const { pokemons } = req.body;

      if (!trainerId || pokemons === undefined) {
        res.status(400).json({ error: 'É necessário informar os pokemons (mesmo que vazia) e usar um token válido.' });
        return;
      }

      const party = await PartyService.createParty(trainerId, pokemons);
      res.status(201).json(party);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Erro ao criar Party' });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { pokemons } = req.body;
      if (!pokemons) {
        res.status(400).json({ error: 'É necessário informar a lista de pokemons (mesmo que vazia)' });
        return;
      }
      const updatedParty = await PartyService.updateParty(id, pokemons);
      if (!updatedParty) {
        res.status(404).json({ error: 'Party não encontrada' });
        return;
      }
      res.json(updatedParty);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Erro ao atualizar Party' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await PartyService.deleteParty(id);
      if (!success) {
        res.status(404).json({ error: 'Party não encontrada' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Party' });
    }
  }
}

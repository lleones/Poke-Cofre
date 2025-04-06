// src/controllers/pokemon.controller.ts
import { Request, Response } from 'express';
import { PokemonService } from '../services/pokemon.services';

export class PokemonController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const pokemons = await PokemonService.getAllPokemons(req.query as any);
      res.json(pokemons);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Pokémons' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pokemon = await PokemonService.getPokemonById(id);
      if (!pokemon) {
        res.status(404).json({ error: 'Pokémon não encontrado' });
        return;
      }
      res.json(pokemon);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Pokémon' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { nickname, trainerId, name } = req.body;
      if (!trainerId || !name) {
        res.status(400).json({ error: 'trainerId e name são obrigatórios' });
        return;
      }
      const newPokemon = await PokemonService.createPokemon({ nickname, trainerId, name });
      res.status(201).json(newPokemon);
    } catch (error: any) {
      if (error.message === 'Treinador não encontrado') {
        res.status(404).json({ error: error.message });
      } else if (error.response && error.response.status === 404) {
        res.status(404).json({ error: 'Pokémon não encontrado na PokeAPI' });
      } else {
        res.status(500).json({ error: 'Erro ao criar Pokémon' });
      }
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nickname, name } = req.body;
      const updatedPokemon = await PokemonService.updatePokemon(id, { nickname, name });
      if (!updatedPokemon) {
        res.status(404).json({ error: 'Pokémon não encontrado' });
        return;
      }
      res.json(updatedPokemon);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar Pokémon' });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await PokemonService.deletePokemon(id);
      if (!success) {
        res.status(404).json({ error: 'Pokémon não encontrado' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Pokémon' });
    }
  }
}

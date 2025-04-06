import Batalha from '../models/batalha.model';
import Treinador from '../models/treinador.model';
import Pokemon from '../models/pokemon.model';

interface CreateBatalhaDTO {
  winnerTrainerId: string;
  loserTrainerId: string;
  winnerPokemonId: string;
  loserPokemonId: string;
}

export class BatalhaService {
  static async createBatalha(data: CreateBatalhaDTO): Promise<Batalha> {
    const { winnerTrainerId, loserTrainerId, winnerPokemonId, loserPokemonId } = data;

    const winnerTrainer = await Treinador.findByPk(winnerTrainerId);
    if (!winnerTrainer) {
      throw new Error('Treinador vencedor não encontrado');
    }
    const loserTrainer = await Treinador.findByPk(loserTrainerId);
    if (!loserTrainer) {
      throw new Error('Treinador perdedor não encontrado');
    }

    const winnerPokemon = await Pokemon.findByPk(winnerPokemonId);
    if (!winnerPokemon) {
      throw new Error('Pokémon do vencedor não encontrado');
    }
    if (winnerPokemon.trainerId.toString() !== winnerTrainerId) {
      throw new Error('O Pokémon do vencedor não pertence ao treinador vencedor');
    }

    const loserPokemon = await Pokemon.findByPk(loserPokemonId);
    if (!loserPokemon) {
      throw new Error('Pokémon do perdedor não encontrado');
    }
    if (loserPokemon.trainerId.toString() !== loserTrainerId) {
      throw new Error('O Pokémon do perdedor não pertence ao treinador perdedor');
    }

    const batalha = await Batalha.create({
      winnerTrainerId,
      loserTrainerId,
      winnerPokemonId,
      loserPokemonId,
    });

    return batalha;
  }

  static async getAllBatalhas(query?: { page?: string; limit?: string }): Promise<Batalha[]> {
    const allBatalhas = await Batalha.findAll();
    if (query?.limit) {
      const limit = parseInt(query.limit, 10);
      const page = query.page ? parseInt(query.page, 10) : 1;
      const offset = (page - 1) * limit;
      return allBatalhas.slice(offset, offset + limit);
    }
    return allBatalhas;
  }

  static async getBatalhaById(id: string): Promise<Batalha | null> {
    return Batalha.findByPk(id);
  }

  static async deleteBatalha(id: string): Promise<boolean> {
    const deleted = await Batalha.destroy({ where: { id } });
    return deleted > 0;
  }
}

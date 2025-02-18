import axios from 'axios';
import Pokemon from '../models/pokemon.model';
import Treinador from '../models/treinador.model';

interface CreatePokemonDTO {
  nickname?: string;
  trainerId: string;
  name: string;
}

interface UpdatePokemonDTO {
  nickname?: string;
  name?: string;
}

export class PokemonService {
  static async createPokemon(data: CreatePokemonDTO): Promise<Pokemon> {
    const trainer = await Treinador.findByPk(data.trainerId);
    if (!trainer) {
      throw new Error('Treinador não encontrado');
    }

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.name.toLowerCase()}`);
    const pokeInfo = response.data;

    const newPokemon = await Pokemon.create({
      nickname: data.nickname || null,
      trainerId: data.trainerId,
      info: pokeInfo,
    });

    return newPokemon;
  }

  static async getAllPokemons(): Promise<Pokemon[]> {
    return await Pokemon.findAll();
  }

  static async getPokemonById(id: string): Promise<Pokemon | null> {
    return await Pokemon.findByPk(id);
  }

  static async updatePokemon(id: string, data: UpdatePokemonDTO): Promise<Pokemon | null> {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) return null;

    if (data.name) {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.name.toLowerCase()}`);
      pokemon.info = response.data;
    }

    if (data.nickname !== undefined) {
      pokemon.nickname = data.nickname;
    }

    await pokemon.save();
    return pokemon;
  }

  static async deletePokemon(id: string): Promise<boolean> {
    const deletedCount = await Pokemon.destroy({ where: { id } });
    return deletedCount > 0;
  }
}

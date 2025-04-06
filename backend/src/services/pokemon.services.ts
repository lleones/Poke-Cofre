// src/services/pokemon.services.ts
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

  static async getAllPokemons(query: { type?: string; page?: string; limit?: string } = {}): Promise<Pokemon[]> {
    let pokemons = await Pokemon.findAll();
    
    if (query.type) {
      const filtro = query.type.toLowerCase();
      pokemons = pokemons.filter(p => {
        const parsedInfo = typeof p.info === 'string' ? JSON.parse(p.info) : p.info;
        const types = parsedInfo?.types;
        if (!types || !Array.isArray(types)) return false;
        return types.some((t: any) => t.type?.name?.toLowerCase() === filtro);
      });
    }
  
    if (query.limit) {
      const limit = parseInt(query.limit, 10);
      const page = query.page ? parseInt(query.page, 10) : 1;
      const offset = (page - 1) * limit;
      pokemons = pokemons.slice(offset, offset + limit);
    }
  
    return pokemons;
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

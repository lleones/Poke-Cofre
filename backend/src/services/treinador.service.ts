// src/services/treinador.service.ts
import Treinador from '../models/treinador.model';

interface TreinadorDTO {
  nome: string;
  senha: string;
}

export class TreinadorService {
  static async createTreinador(treinadorData: TreinadorDTO): Promise<Treinador> {
    const treinador = await Treinador.create(treinadorData);
    return treinador;
  }

  static async getAllTreinadores(query?: { page?: string; limit?: string }): Promise<Treinador[]> {
    const allTreinadores = await Treinador.findAll();
    if (query?.limit) {
      const limit = parseInt(query.limit, 10);
      const page = query.page ? parseInt(query.page, 10) : 1;
      const offset = (page - 1) * limit;
      return allTreinadores.slice(offset, offset + limit);
    }
    return allTreinadores;
  }

  static async getTreinadorById(id: string): Promise<Treinador | null> {
    return Treinador.findByPk(id);
  }

  static async updateTreinador(id: string, treinadorData: TreinadorDTO): Promise<Treinador | null> {
    const treinador = await Treinador.findByPk(id);
    if (!treinador) return null;
    await treinador.update(treinadorData);
    return treinador;
  }

  static async deleteTreinador(id: string): Promise<boolean> {
    const deletedCount = await Treinador.destroy({ where: { id } });
    return deletedCount > 0;
  }
}

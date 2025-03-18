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

  static async getAllTreinadores(): Promise<Treinador[]> {
    return Treinador.findAll();
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

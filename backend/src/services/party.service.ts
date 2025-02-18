import Party from '../models/party.model';
import Treinador from '../models/treinador.model';
import Pokemon from '../models/pokemon.model';

export class PartyService {
    static async createParty(trainerId: string, pokemonIds: string[]): Promise<Party> {
        const trainer = await Treinador.findByPk(trainerId);
        if (!trainer) {
            throw new Error('Treinador não encontrado');
        }
        const existingParty = await Party.findOne({ where: { trainerId } });
        if (existingParty) {
            throw new Error('Este treinador já possui uma Party');
        }
        let realPokemonIds = pokemonIds.filter(id => id.trim() !== '');
        if (realPokemonIds.length > 6) {
            throw new Error('Não é possível ter mais de 6 Pokémon na Party');
        }
        if (realPokemonIds.length > 0) {
            const pokemons = await Pokemon.findAll({ where: { id: realPokemonIds } });
            if (pokemons.length !== realPokemonIds.length) {
                throw new Error('Um ou mais Pokémon não existem no banco');
            }
            for (const p of pokemons) {
                if (p.trainerId.toString() !== trainerId) {
                    throw new Error('Um ou mais Pokémon não pertencem ao treinador informado');
                }
            }
        }
        while (realPokemonIds.length < 6) {
            realPokemonIds.push('');
        }
        const party = await Party.create({
            trainerId,
            pokemons: realPokemonIds,
        });
        return party;
    }

    static async getAllParties(): Promise<Party[]> {
        return Party.findAll();
    }

    static async getPartyById(id: string): Promise<Party | null> {
        return Party.findByPk(id);
    }

    static async updateParty(id: string, pokemonIds: string[]): Promise<Party | null> {
        const party = await Party.findByPk(id);
        if (!party) {
            return null;
        }
        let realPokemonIds = pokemonIds.filter(id => id.trim() !== '');
        if (realPokemonIds.length > 6) {
            throw new Error('Não é possível ter mais de 6 Pokémon na Party');
        }
        if (realPokemonIds.length > 0) {
            const pokemons = await Pokemon.findAll({ where: { id: realPokemonIds } });
            if (pokemons.length !== realPokemonIds.length) {
                throw new Error('Um ou mais Pokémon não existem no banco');
            }
            for (const p of pokemons) {
                if (p.trainerId.toString() !== party.trainerId.toString()) {
                    throw new Error('Um ou mais Pokémon não pertencem ao mesmo treinador da Party');
                }
            }
        }
        while (realPokemonIds.length < 6) {
            realPokemonIds.push('');
        }
        await party.update({ pokemons: realPokemonIds });
        return party;
    }

    static async deleteParty(id: string): Promise<boolean> {
        const deleted = await Party.destroy({ where: { id } });
        return deleted > 0;
    }
}

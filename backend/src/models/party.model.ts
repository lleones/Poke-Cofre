import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import Treinador from './treinador.model';

interface PartyAttributes {
    id: string;
    trainerId: string;
    pokemons: string[];
}

interface PartyCreationAttributes extends Optional<PartyAttributes, 'id'> { }

class Party extends Model<PartyAttributes, PartyCreationAttributes>
    implements PartyAttributes {
    public id!: string;
    public trainerId!: string;
    public pokemons!: string[];
}

Party.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        trainerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        pokemons: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: [],
        },
    },
    {
        sequelize,
        modelName: 'Party',
        tableName: 'parties',
        timestamps: false,
    }
);

Party.belongsTo(Treinador, { foreignKey: 'trainerId' });
Treinador.hasOne(Party, { foreignKey: 'trainerId' });

export default Party;

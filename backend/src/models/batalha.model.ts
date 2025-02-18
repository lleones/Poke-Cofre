import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

export interface BatalhaAttributes {
    id: string;
    winnerTrainerId: string;
    loserTrainerId: string;
    winnerPokemonId: string;
    loserPokemonId: string;
    timestamp: Date;
}

export interface BatalhaCreationAttributes extends Optional<BatalhaAttributes, 'id' | 'timestamp'> { }

class Batalha extends Model<BatalhaAttributes, BatalhaCreationAttributes> implements BatalhaAttributes {
    public id!: string;
    public winnerTrainerId!: string;
    public loserTrainerId!: string;
    public winnerPokemonId!: string;
    public loserPokemonId!: string;
    public timestamp!: Date;
}

Batalha.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        winnerTrainerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        loserTrainerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        winnerPokemonId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        loserPokemonId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Batalha',
        tableName: 'batalhas',
        timestamps: false,
    }
);

export default Batalha;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Pokemon extends Model {
    public id!: string;
    public nickname!: string | null;
    public trainerId!: string;
    public info!: any;
}

Pokemon.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        trainerId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        info: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Pokemon',
        tableName: 'pokemons',
        timestamps: false,
    }
);

export default Pokemon;

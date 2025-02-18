import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';


export interface TreinadorAttributes {
  id: string;
  nome: string;
}

export interface TreinadorCreationAttributes extends Optional<TreinadorAttributes, 'id'> { }

class Treinador extends Model<TreinadorAttributes, TreinadorCreationAttributes>
  implements TreinadorAttributes {
  public id!: string;
  public nome!: string;
}

Treinador.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Treinador',
    tableName: 'treinadores',
    timestamps: false,
  }
);

export default Treinador;

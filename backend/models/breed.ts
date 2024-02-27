import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes
} from 'sequelize';

import { sequelize } from '../utils/db';

class Breed extends Model<
  InferAttributes<Breed>,
  InferCreationAttributes<Breed>
> {
  declare id: number;
  declare name: string;
}

Breed.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'breed'
  }
);

export default Breed;

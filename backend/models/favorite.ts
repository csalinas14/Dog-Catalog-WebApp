import { DataTypes } from 'sequelize';

import { sequelize } from '../utils/db';
import { FavoriteInstance } from '../types';

const Favorite = sequelize.define<FavoriteInstance>(
  'Favorite',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    favorite_id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    animal: {
      type: DataTypes.ENUM('dog', 'cat'),
      allowNull: false
    }
  },
  {
    underscored: true,
    timestamps: true,
    modelName: 'favorite'
  }
);

export default Favorite;

import { DataTypes } from 'sequelize';
import { Migration } from '../utils/db';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('favorites', {
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    animal: {
      type: DataTypes.ENUM('dog', 'cat'),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('favorites');
};

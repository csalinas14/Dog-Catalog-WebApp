import { DataTypes } from 'sequelize';
import { Migration } from '../utils/db';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn('sessions', 'remember_me', {
    type: DataTypes.BOOLEAN,
    allowNull: false
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn('sessions', 'rememberMe');
};

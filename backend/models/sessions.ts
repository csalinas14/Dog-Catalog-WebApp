import { DataTypes } from 'sequelize';

import { sequelize } from '../utils/db';
import { SessionInstance } from '../types';

const Session = sequelize.define<SessionInstance>(
  'Session',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING,
      unique: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    rememberMe: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    underscored: true,
    timestamps: true,
    modelName: 'session'
  }
);

export default Session;

import { DataTypes } from 'sequelize';

import { sequelize } from '../utils/db';
import { UserInstance } from '../types';

const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    underscored: true,
    timestamps: true,
    modelName: 'user'
  }
);

export default User;

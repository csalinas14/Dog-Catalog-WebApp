"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
const Favorite = db_1.sequelize.define('Favorite', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    favorite_id: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    animal: {
        type: sequelize_1.DataTypes.ENUM('dog', 'cat'),
        allowNull: false
    }
}, {
    underscored: true,
    timestamps: true,
    modelName: 'favorite'
});
exports.default = Favorite;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
const Session = db_1.sequelize.define('Session', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        unique: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    }
}, {
    underscored: true,
    timestamps: true,
    modelName: 'session'
});
exports.default = Session;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const sequelize_1 = require("sequelize");
const up = ({ context: sequelize }) => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.getQueryInterface().createTable('sessions', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: sequelize_1.DataTypes.STRING,
            unique: true
        },
        user_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' }
        },
        created_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        }
    });
});
exports.up = up;
const down = ({ context: sequelize }) => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize.getQueryInterface().dropTable('sessions');
});
exports.down = down;

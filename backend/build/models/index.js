"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favorite = exports.Session = exports.User = exports.Breed = void 0;
const breed_1 = __importDefault(require("./breed"));
exports.Breed = breed_1.default;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const sessions_1 = __importDefault(require("./sessions"));
exports.Session = sessions_1.default;
const favorite_1 = __importDefault(require("./favorite"));
exports.Favorite = favorite_1.default;
user_1.default.hasMany(sessions_1.default);
sessions_1.default.belongsTo(user_1.default);
user_1.default.hasMany(favorite_1.default);
favorite_1.default.belongsTo(user_1.default);

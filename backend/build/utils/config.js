"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.PORT = exports.DATABASE_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let DATABASE_URL;
switch (process.env.NODE_ENV) {
    case 'production':
        exports.DATABASE_URL = DATABASE_URL = process.env.DATABASE_URL_PROD;
        break;
    case 'test':
        exports.DATABASE_URL = DATABASE_URL = process.env.DATABASE_URL_TEST;
        break;
    default:
        exports.DATABASE_URL = DATABASE_URL = process.env.DATABASE_URL_DEV;
}
const PORT = process.env.PORT || 3001;
exports.PORT = PORT;
const SECRET = process.env.SECRET;
exports.SECRET = SECRET;

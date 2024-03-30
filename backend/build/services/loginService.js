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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../utils/config");
const models_1 = require("../models");
const login = (user) => __awaiter(void 0, void 0, void 0, function* () {
    //find user in database by their username provided
    const userFound = yield models_1.User.findOne({
        where: {
            username: user.username
        }
    });
    //check if password is correct by comparing it to its hash
    const passwordCorrect = userFound === null
        ? false
        : yield bcrypt_1.default.compare(user.password, userFound.passwordHash);
    //throw error if username or password incorrect
    if (!(userFound && passwordCorrect)) {
        throw new Error('Username or password is incorrect');
    }
    //throw error if a disabled account tries to login
    if (userFound && userFound.disabled) {
        throw new Error('Account disabled');
    }
    const userForToken = {
        username: userFound.username,
        id: userFound.id
    };
    //our token to represent user is logged in
    const token = jsonwebtoken_1.default.sign(userForToken, config_1.SECRET);
    yield models_1.Session.create({
        userId: userFound.id,
        token: token
    });
    const loginUser = {
        token,
        username: userFound.username,
        name: userFound.name
    };
    return loginUser;
});
exports.default = {
    login
};

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const logger_1 = __importDefault(require("./logger"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const models_1 = require("../models");
const errorHandler = (error, _req, res, next) => {
    logger_1.default.error(error);
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }
    else if (error.name === 'SequelizeValidationError') {
        //console.log(error)
        return res.status(400).send({ error: error.message });
    }
    next(error);
};
const tokenExtractor = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorization = request.get('authorization');
    console.log(authorization);
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            const decodedToken = jwt.verify(authorization.substring(7), config_1.SECRET);
            console.log(decodedToken);
            //check if this token is an active session in our db
            //####fix up error checking for active sessions. If not found its triggering 'token invalid'
            const activeSession = yield models_1.Session.findOne({
                where: {
                    token: authorization.substring(7)
                }
            });
            console.log(activeSession);
            if (!activeSession) {
                return response.status(401).json({ error: 'active session not found' });
            }
            console.log(decodedToken);
            request.user = decodedToken;
        }
        catch (_a) {
            return response.status(401).json({ error: 'token invalid' });
        }
    }
    else {
        return response.status(401).json({ error: 'token missing' });
    }
    return next();
});
exports.default = {
    errorHandler,
    tokenExtractor
};

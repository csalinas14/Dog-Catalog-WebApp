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
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const userService_1 = __importDefault(require("../services/userService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.get('/', ((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userService_1.default.getUsers();
    res.json(users);
})));
router.post('/', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = (0, utils_1.toNewUser)(req.body);
        //handling hashing the password
        const saltRounds = 10;
        const passwordHash = yield bcrypt_1.default.hash(newUser.password, saltRounds);
        const newUserWithHash = {
            username: newUser.username,
            passwordHash: passwordHash,
            name: newUser.name
        };
        const addedUser = yield userService_1.default.addUser(newUserWithHash);
        res.json(addedUser);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
        res.status(400).send(errorMessage);
    }
})));
exports.default = router;

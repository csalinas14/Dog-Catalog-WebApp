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
const db_1 = require("../utils/db");
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const userService_1 = __importDefault(require("../services/userService"));
describe('user creation', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        //drop and recreate tables with only our test database
        yield db_1.sequelize.sync({ force: true, match: /test$/ });
    }));
    test('new user creation succeeds', () => __awaiter(void 0, void 0, void 0, function* () {
        const usersBefore = yield userService_1.default.getUsers();
        const newUser = {
            username: 'tester@yahoo.com',
            name: 'Admin',
            password: 'banana'
        };
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const usersAfter = yield userService_1.default.getUsers();
        expect(response.body.username).toBe(newUser.username);
        expect(usersAfter).toHaveLength(usersBefore.length + 1);
        expect(usersAfter[0].username).toContain(newUser.username);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.sequelize.close();
    }));
});

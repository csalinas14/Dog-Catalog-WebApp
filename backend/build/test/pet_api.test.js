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
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
describe('Handling Dog and Cat API calls', () => {
    test('standard dog/cat api call is functional', () => __awaiter(void 0, void 0, void 0, function* () {
        const queryOptions = {
            animal: 'dog',
            limit: '1',
            page: '0'
        };
        let requestString = `/api/dogapi/breeds?animal=${queryOptions.animal}&limit=${queryOptions.limit}&page=${queryOptions.page}`;
        console.log(requestString);
        let response = yield (0, supertest_1.default)(index_1.default)
            .get(requestString)
            .expect('Content-Type', /application\/json/)
            .expect(200);
        expect(response.body.breeds).toHaveLength(1);
        expect(response.body.breeds[0].id).toBe(1);
        expect(response.body.breeds[0].type).toBe('dog');
        queryOptions.animal = 'cat';
        requestString = `/api/dogapi/breeds?animal=${queryOptions.animal}&limit=${queryOptions.limit}&page=${queryOptions.page}`;
        response = yield (0, supertest_1.default)(index_1.default)
            .get(requestString)
            .expect('Content-Type', /application\/json/)
            .expect(200);
        expect(response.body.breeds).toHaveLength(1);
        expect(response.body.breeds[0].type).toBe('cat');
    }));
    test('image api call for dog/cat is functional', () => __awaiter(void 0, void 0, void 0, function* () {
        const queryOptions = {
            animal: 'dog',
            limit: '1',
            page: '0'
        };
        let requestString = `/api/dogapi/images?animal=${queryOptions.animal}&limit=${queryOptions.limit}&page=${queryOptions.page}`;
        let response = yield (0, supertest_1.default)(index_1.default)
            .get(requestString)
            .expect('Content-Type', /application\/json/)
            .expect(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty('breeds');
        expect(response.body[0]).toHaveProperty('url');
        queryOptions.animal = 'cat';
        requestString = `/api/dogapi/images?animal=${queryOptions.animal}&limit=${queryOptions.limit}&page=${queryOptions.page}`;
        response = yield (0, supertest_1.default)(index_1.default)
            .get(requestString)
            .expect('Content-Type', /application\/json/)
            .expect(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty('breeds');
        expect(response.body[0]).toHaveProperty('url');
    }));
});

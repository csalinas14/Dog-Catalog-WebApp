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
const apiService_1 = __importDefault(require("../services/apiService"));
const utils_1 = require("../utils");
const middleware_1 = __importDefault(require("../utils/middleware"));
const router = express_1.default.Router();
router.get('/breeds', (req, res) => {
    //IIFE required to pass our async function
    // prettier-ignore-start
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        const { breeds, totalCount } = yield apiService_1.default.getBreeds({
            animal: req.query.animal,
            limit: req.query.limit,
            page: req.query.page
        });
        //console.log(res.header);
        res.send({ breeds, totalCount });
    }))();
    // prettier-ignore-end
});
router.get('/images', (req, res) => {
    // prettier-ignore-start
    void (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield apiService_1.default.getImages({
                animal: req.query.animal,
                limit: req.query.limit,
                page: req.query.page,
                id: req.query.id
            });
            res.send(data);
        }
        catch (error) {
            let errorMessage = 'Something went wrong.';
            if (error instanceof Error) {
                errorMessage += ' Error: ' + error.message;
            }
            res.status(400).send(errorMessage);
        }
    }))();
    // prettier-ignore-end
});
router.post('/favorites', middleware_1.default.tokenExtractor, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newFav = (0, utils_1.toNewFavorite)(req.body);
        const response = yield apiService_1.default.addFavorite(newFav, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        res.send(response);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
        res.status(400).send(errorMessage);
    }
}));
router.get('/favorites', middleware_1.default.tokenExtractor, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield apiService_1.default.getFavorites(req);
        res.send(response.data);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
        res.status(400).send(errorMessage);
    }
}));
router.delete('/favorites/:id', middleware_1.default.tokenExtractor, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield apiService_1.default.delFavorite(req);
        console.log(response);
        res.send(response.data);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
        res.status(400).send(errorMessage);
    }
}));
exports.default = router;

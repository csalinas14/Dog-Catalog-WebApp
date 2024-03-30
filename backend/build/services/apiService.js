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
const types_1 = require("../types");
const axios_1 = __importDefault(require("axios"));
const models_1 = require("../models");
//const API_KEY = process.env.DOG_API_KEY;
//Broke up API URL so I could apply dog or cat for their respective api url calls
const API_URL_FIRST = 'https://api.the';
const API_URL_SECOND = 'api.com/v1/';
//third party api call to get breed info on cats or dogs
const getBreeds = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let API_KEY;
    if (query.animal === 'dog')
        API_KEY = process.env.DOG_API_KEY;
    else if (query.animal === 'cat')
        API_KEY = process.env.CAT_API_KEY;
    else {
        throw new Error('incorrect animal');
    }
    const url_call = `${API_URL_FIRST}${query.animal}${API_URL_SECOND}breeds?limit=${query.limit}&page=${query.page}&api_key=${API_KEY}`;
    console.log(url_call);
    const config = {
        method: 'get',
        url: url_call
    };
    const { data, headers } = yield axios_1.default.request(config);
    //console.log(headers['pagination-count']);
    data.forEach((obj) => {
        obj.type = query.animal;
        console.log(obj);
        if (!(0, types_1.isBreed)(obj))
            throw new Error('Incompatiable third party breed data');
    });
    //console.log(data);
    //const animal_data = data.map((d) => ({ ...d, type: animal } as Breed));
    //console.log(animal_data);
    return { breeds: data, totalCount: headers['pagination-count'] };
});
//third party api call to get images of a particular breed
const getImages = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let API_KEY;
    if (query.animal === 'dog')
        API_KEY = process.env.DOG_API_KEY;
    else if (query.animal === 'cat')
        API_KEY = process.env.CAT_API_KEY;
    else {
        throw new Error('incorrect animal');
    }
    const url_call = `${API_URL_FIRST}${query.animal}${API_URL_SECOND}images/search?has_breeds=true&limit=${query.limit}&page=${query.page}&api_key=${API_KEY}`;
    const config = {
        method: 'get',
        url: url_call
    };
    const { data } = yield axios_1.default.request(config);
    console.log(data);
    data.forEach((obj) => {
        console.log(obj);
        if (!(0, types_1.isImage)(obj))
            throw new Error('Invalid image type');
        return;
    });
    return data;
});
const addFavorite = (favorite, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let API_KEY;
    let animal;
    switch (favorite.animal) {
        case types_1.AnimalType.DOG:
            API_KEY = process.env.DOG_API_KEY;
            animal = 'dog';
            break;
        case types_1.AnimalType.CAT:
            API_KEY = process.env.CAT_API_KEY;
            animal = 'cat';
            break;
        default:
            throw new Error('incorrect animal');
    }
    const url_call = `${API_URL_FIRST}${animal}${API_URL_SECOND}favourites`;
    const config = {
        method: 'post',
        url: url_call,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        data: {
            image_id: favorite.image_id,
            sub_id: user_id.toString()
        }
    };
    const { data } = yield axios_1.default.request(config);
    console.log(data);
    if (!(0, types_1.isCreateFavorite)(data) || data.message !== 'SUCCESS')
        throw new Error('Incompatiable third party breed data');
    const newFav = {
        favorite_id: data.id,
        userId: user_id,
        animal: favorite.animal
    };
    console.log(newFav);
    yield models_1.Favorite.create(newFav);
    return data;
});
const getFavorites = (request) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let API_KEY;
    let animal;
    switch (request.body.animal) {
        case types_1.AnimalType.DOG:
            API_KEY = process.env.DOG_API_KEY;
            animal = 'dog';
            break;
        case types_1.AnimalType.CAT:
            API_KEY = process.env.CAT_API_KEY;
            animal = 'cat';
            break;
        default:
            throw new Error('incorrect animal');
    }
    const url_call = `${API_URL_FIRST}${animal}${API_URL_SECOND}favourites?sub_id=${(_a = request.user) === null || _a === void 0 ? void 0 : _a.id}`;
    const config = {
        method: 'get',
        url: url_call,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        }
    };
    const response = yield axios_1.default.request(config);
    return response;
});
const delFavorite = (request) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let API_KEY;
    //let animal;
    const fav = yield models_1.Favorite.findOne({
        where: {
            favorite_id: parseInt(request.params.id)
        }
    });
    console.log(fav);
    if (!(fav && fav.userId === ((_b = request.user) === null || _b === void 0 ? void 0 : _b.id)))
        throw new Error('Incorrect user or favorite not found');
    switch (fav.animal) {
        case types_1.AnimalType.DOG:
            API_KEY = process.env.DOG_API_KEY;
            //animal = 'dog';
            break;
        case types_1.AnimalType.CAT:
            API_KEY = process.env.CAT_API_KEY;
            //animal = 'cat';
            break;
        default:
            throw new Error('incorrect animal');
    }
    const url_call = `${API_URL_FIRST}${fav.animal}${API_URL_SECOND}favourites/${request.params.id}`;
    const config = {
        method: 'delete',
        url: url_call,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        }
    };
    const response = yield axios_1.default.request(config);
    if (response && response.data.message === 'SUCCESS') {
        yield models_1.Favorite.destroy({
            where: {
                favorite_id: parseInt(request.params.id)
            }
        });
    }
    return response;
});
exports.default = {
    getBreeds,
    getImages,
    addFavorite,
    getFavorites,
    delFavorite
};

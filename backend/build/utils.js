"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewFavorite = exports.toNewUser = void 0;
const types_1 = require("./types");
const toNewUser = (object) => {
    if (!object || typeof object != 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'username' in object && 'password' in object) {
        const newUser = {
            name: parseString(object.name, 'name'),
            username: parseString(object.username, 'username'),
            password: parseString(object.password, 'password')
        };
        return newUser;
    }
    throw new Error('Incorrect data: some fields missing');
};
exports.toNewUser = toNewUser;
const parseString = (text, property) => {
    if (!isString(text)) {
        throw new Error(`Incorrect or missing ${property}`);
    }
    return text;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const toNewFavorite = (object) => {
    if (!object || typeof object != 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('image_id' in object && 'animal' in object) {
        const newFav = {
            image_id: parseString(object.image_id, 'image_id'),
            //sub_id: parseString(object.sub_id, 'sub_id'),
            animal: parseAnimalType(object.animal)
        };
        return newFav;
    }
    throw new Error('Incorrect data: some fields missing');
};
exports.toNewFavorite = toNewFavorite;
const parseAnimalType = (animal) => {
    if (!isString(animal) || !isAnimalType(animal)) {
        throw new Error('Incorrect or missing AnimalType');
    }
    return animal;
};
const isAnimalType = (param) => {
    return Object.values(types_1.AnimalType).includes(param);
};
//const isNumber = (num: unknown): num is number => {
//return typeof num === 'number' || num instanceof Number;
//};

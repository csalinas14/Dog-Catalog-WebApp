"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCreateFavorite = exports.AnimalType = exports.isImage = exports.isBreed = void 0;
const zod_1 = __importDefault(require("zod"));
//import { Breed } from './models';
//a base type for breed data shared between cats and dogs
/*
interface BaseBreed {
  weight: {
    imperial: string;
    metric: string;
  };
  name: string;
  life_span: string;
  reference_image_id: string;
  origin: string;
  temperament: string;
  needed: number;
}*/
//types built with zod when using third-party api
const weightSchema = zod_1.default.object({
    imperial: zod_1.default.string(),
    metric: zod_1.default.string()
});
//image object used for Breed and Image type later on
const ImageSchema = zod_1.default.object({
    id: zod_1.default.string(),
    url: zod_1.default.string().url(),
    width: zod_1.default.number(),
    height: zod_1.default.number()
});
const BaseBreedSchema = zod_1.default.object({
    weight: weightSchema,
    name: zod_1.default.string(),
    life_span: zod_1.default.string(),
    reference_image_id: zod_1.default.string().optional(),
    origin: zod_1.default.string().optional(),
    temperament: zod_1.default.string().optional(),
    image: ImageSchema.optional()
});
const DogBreedSchema = BaseBreedSchema.extend({
    type: zod_1.default.literal('dog'),
    id: zod_1.default.number(),
    bred_for: zod_1.default.string().optional(),
    breed_group: zod_1.default.string().optional(),
    height: weightSchema
});
const urlMessage = { message: 'Not a valid url' };
const CatBreedSchema = BaseBreedSchema.extend({
    type: zod_1.default.literal('cat'),
    id: zod_1.default.string(),
    cfa_url: zod_1.default.string().url(urlMessage).optional(),
    vetstreet_url: zod_1.default.string().url(urlMessage).optional(),
    vcahospitals_url: zod_1.default.string().optional(),
    country_codes: zod_1.default.string(),
    description: zod_1.default.string(),
    indoor: zod_1.default.number(),
    lap: zod_1.default.number().optional(),
    alt_names: zod_1.default.string().optional(),
    adaptability: zod_1.default.number(),
    affection_level: zod_1.default.number(),
    child_friendly: zod_1.default.number(),
    dog_friendly: zod_1.default.number(),
    energy_level: zod_1.default.number(),
    grooming: zod_1.default.number(),
    health_issues: zod_1.default.number(),
    intelligence: zod_1.default.number(),
    shedding_level: zod_1.default.number(),
    social_needs: zod_1.default.number(),
    stranger_friendly: zod_1.default.number(),
    vocalisation: zod_1.default.number(),
    experimental: zod_1.default.number(),
    hairless: zod_1.default.number(),
    natural: zod_1.default.number(),
    rare: zod_1.default.number(),
    rex: zod_1.default.number(),
    suppressed_tail: zod_1.default.number(),
    short_legs: zod_1.default.number(),
    wikipedia_url: zod_1.default.string().url().optional(),
    hypoallergenic: zod_1.default.number()
});
const BreedSchema = zod_1.default.discriminatedUnion('type', [
    DogBreedSchema,
    CatBreedSchema
]);
const isBreed = (obj) => {
    const parsedObj = BreedSchema.safeParse(obj);
    if (!parsedObj.success) {
        console.error(parsedObj.error.message);
        return false;
    }
    return true;
};
exports.isBreed = isBreed;
const isImage = (obj) => {
    const parsedObj = ImageSchema.safeParse(obj);
    if (!parsedObj.success) {
        console.error(parsedObj.error.message);
        return false;
    }
    return true;
};
exports.isImage = isImage;
var AnimalType;
(function (AnimalType) {
    AnimalType["DOG"] = "dog";
    AnimalType["CAT"] = "cat";
})(AnimalType || (exports.AnimalType = AnimalType = {}));
const PostFavoriteSchema = zod_1.default.object({
    message: zod_1.default.string(),
    id: zod_1.default.number()
});
const isCreateFavorite = (obj) => {
    const parsedObj = PostFavoriteSchema.safeParse(obj);
    if (!parsedObj.success) {
        console.error(parsedObj.error.message);
        return false;
    }
    return true;
};
exports.isCreateFavorite = isCreateFavorite;

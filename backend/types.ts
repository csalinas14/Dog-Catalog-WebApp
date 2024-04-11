import { Model, Optional } from 'sequelize';
import z from 'zod';
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
const weightSchema = z.object({
  imperial: z.string(),
  metric: z.string()
});

//image object used for Breed and Image type later on
const ImageSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  width: z.number(),
  height: z.number()
});

const BaseBreedSchema = z.object({
  weight: weightSchema,
  name: z.string(),
  life_span: z.string(),
  reference_image_id: z.string().optional(),
  origin: z.string().optional(),
  temperament: z.string().optional(),
  image: ImageSchema.optional()
});

const DogBreedSchema = BaseBreedSchema.extend({
  type: z.literal('dog'),
  id: z.number(),
  bred_for: z.string().optional(),
  breed_group: z.string().optional(),
  height: weightSchema
});

const urlMessage = { message: 'Not a valid url' };

const CatBreedSchema = BaseBreedSchema.extend({
  type: z.literal('cat'),
  id: z.string(),
  cfa_url: z.string().url(urlMessage).optional(),
  vetstreet_url: z.string().url(urlMessage).optional(),
  vcahospitals_url: z.string().optional(),
  country_codes: z.string(),
  description: z.string(),
  indoor: z.number(),
  lap: z.number().optional(),
  alt_names: z.string().optional(),
  adaptability: z.number(),
  affection_level: z.number(),
  child_friendly: z.number(),
  dog_friendly: z.number(),
  energy_level: z.number(),
  grooming: z.number(),
  health_issues: z.number(),
  intelligence: z.number(),
  shedding_level: z.number(),
  social_needs: z.number(),
  stranger_friendly: z.number(),
  vocalisation: z.number(),
  experimental: z.number(),
  hairless: z.number(),
  natural: z.number(),
  rare: z.number(),
  rex: z.number(),
  suppressed_tail: z.number(),
  short_legs: z.number(),
  wikipedia_url: z.string().url().optional(),
  hypoallergenic: z.number()
});

const BreedSchema = z.discriminatedUnion('type', [
  DogBreedSchema,
  CatBreedSchema
]);

export type Breed = z.infer<typeof BreedSchema>;

export interface BreedResponse {
  totalCount: number;
  breeds: Breed[];
}

export const isBreed = (obj: unknown) => {
  const parsedObj = BreedSchema.safeParse(obj);
  if (!parsedObj.success) {
    console.error(parsedObj.error.message);
    return false;
  }
  return true;
};

//our dog breed type from API call
/*
interface DogBreed extends BaseBreed {
  type: 'dog';
  id: number;
  bred_for: string;
  breed_group: string;
  height: {
    imperial: string;
    metric: string;
  };
}

interface CatBreed extends BaseBreed {
  type: 'cat';
  child_friendly: number;
}
*/
//shared cat and dog type are described as breeds for API calls
//export type Breed = DogBreed | CatBreed;

export interface BaseQuery {
  limit: string;
  page: string;
  animal: 'dog' | 'cat';
  breed_id?: string;
}

export interface Param {
  id: string;
}

export type Image = z.infer<typeof ImageSchema>;

export interface ImagesQuery extends BaseQuery {
  id: string;
}

export const isImage = (obj: unknown) => {
  const parsedObj = ImageSchema.safeParse(obj);
  if (!parsedObj.success) {
    console.error(parsedObj.error.message);
    return false;
  }
  return true;
};

//type for frontend image response, loading, and error
export interface ImageResponse {
  imageInfo: Image[];
  isLoading: boolean;
  error?: string;
}

//types for users
export interface UserEntry {
  id: number;
  username: string;
  passwordHash: string;
  name: string;
  disabled?: boolean;
}

export type NonSensitiveUser = Omit<UserEntry, 'passwordHash' | 'disabled'>;

export type UserToken = Omit<NonSensitiveUser, 'name'>;

export interface PreDatabaseUser extends Optional<UserEntry, 'id'> {}

//wanted new users to have password property over passwordHash for clarity
interface NewUserPartial extends UserEntry {
  password: string;
}
//used for taking unknown new user requests
export type NewUser = Omit<NewUserPartial, 'id' | 'passwordHash'>;

//type used for logining in. Requires only username and password.
export type loginUser = Omit<NewUser, 'name'>;

//type for our User Model
export interface UserInstance
  extends Model<UserEntry, PreDatabaseUser>,
    UserEntry {
  createdAt?: Date;
  updatedAt?: Date;
}

//type for Sessions Model
interface SessionEntry {
  id: number;
  token: string;
  userId: number;
}

export interface PreDatabaseSession extends Optional<SessionEntry, 'id'> {}

export interface SessionInstance
  extends Model<SessionEntry, PreDatabaseSession>,
    SessionEntry {
  createdAt?: Date;
  updatedAt?: Date;
}

export enum AnimalType {
  DOG = 'dog',
  CAT = 'cat'
}

//types for Favorites
export interface NewFavorite {
  image_id: string;
  //sub_id: string;
  animal: AnimalType;
}

interface FavoriteEntry {
  id: number;
  favorite_id: number;
  userId: number;
  animal: AnimalType;
}

export interface PreDatabaseFavorite extends Optional<FavoriteEntry, 'id'> {}

export interface FavoriteInstance
  extends Model<FavoriteEntry, PreDatabaseFavorite>,
    FavoriteEntry {
  createdAt?: Date;
  updatedAt?: Date;
}

const PostFavoriteSchema = z.object({
  message: z.string(),
  id: z.number()
});

export type CreateFavorite = z.infer<typeof PostFavoriteSchema>;

export const isCreateFavorite = (obj: unknown) => {
  const parsedObj = PostFavoriteSchema.safeParse(obj);
  if (!parsedObj.success) {
    console.error(parsedObj.error.message);
    return false;
  }
  return true;
};

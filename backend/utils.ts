import { AnimalType, NewFavorite, NewUser } from './types';

export const toNewUser = (object: unknown): NewUser => {
  if (!object || typeof object != 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'username' in object && 'password' in object) {
    const newUser: NewUser = {
      name: parseString(object.name, 'name'),
      username: parseString(object.username, 'username'),
      password: parseString(object.password, 'password')
    };

    return newUser;
  }
  throw new Error('Incorrect data: some fields missing');
};

const parseString = (text: unknown, property: string): string => {
  if (!isString(text)) {
    throw new Error(`Incorrect or missing ${property}`);
  }
  return text;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const toNewFavorite = (object: unknown): NewFavorite => {
  if (!object || typeof object != 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('image_id' in object && 'animal' in object) {
    const newFav: NewFavorite = {
      image_id: parseString(object.image_id, 'image_id'),
      //sub_id: parseString(object.sub_id, 'sub_id'),
      animal: parseAnimalType(object.animal)
    };

    return newFav;
  }
  throw new Error('Incorrect data: some fields missing');
};

const parseAnimalType = (animal: unknown): AnimalType => {
  if (!isNumber(animal) || !isAnimalType(animal)) {
    throw new Error('Incorrect or missing AnimalType');
  }

  return animal;
};

const isAnimalType = (param: number): param is AnimalType => {
  return Object.values(AnimalType)
    .map((a) => a)
    .includes(param);
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

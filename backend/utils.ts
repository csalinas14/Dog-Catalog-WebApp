import { NewUser } from './types';

export const toNewUser = (object: unknown): NewUser => {
  if (!object || typeof object != 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'username' in object && 'passwordHash' in object) {
    const newUser: NewUser = {
      name: parseString(object.name, 'name'),
      username: parseString(object.username, 'username'),
      passwordHash: parseString(object.passwordHash, 'passwordHash')
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

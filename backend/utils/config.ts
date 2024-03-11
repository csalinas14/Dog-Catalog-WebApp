import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URL =
  process.env.NODE_ENV === 'test'
    ? (process.env.DATABASE_URL_TEST as string)
    : (process.env.DATABASE_URL_DEV as string);
const PORT = process.env.PORT || 3001;

export { DATABASE_URL, PORT };

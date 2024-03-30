import dotenv from 'dotenv';
dotenv.config();
let DATABASE_URL: string;

switch (process.env.NODE_ENV) {
  case 'production':
    DATABASE_URL = process.env.DATABASE_URL_PROD as string;
    break;
  case 'test':
    DATABASE_URL = process.env.DATABASE_URL_TEST as string;
    break;
  default:
    DATABASE_URL = process.env.DATABASE_URL_DEV as string;
}
const PORT = process.env.PORT || 3001;
const SECRET = process.env.SECRET as string;

export { DATABASE_URL, PORT, SECRET };

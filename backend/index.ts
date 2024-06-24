import express from 'express';
import cors from 'cors';
import dogApiRouter from './routes/dog_api';
import userRouter from './routes/users';
import loginRouter from './routes/login';
import sessionRouter from './routes/sessions';
import profilePicRouter from './routes/profilepic';
import 'express-async-errors';
import middleware from './utils/middleware';
import dotenv from 'dotenv';
import { UserToken } from './types';
dotenv.config();
//import { connectToDatabase } from './utils/db';

const app = express();
app.use(express.json());
app.use(cors());

//used to expand our express request properties
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: UserToken;
    }
  }
}

app.use('/api/dogapi', dogApiRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/profilepic', profilePicRouter);

app.use(middleware.errorHandler);

/** 
const start = async () => {
  await connectToDatabase();
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};
/*
app.listen(process.env.PORT, () => {
  await connectToDatabase();
  console.log('Server running on port 3001');
});*/

//void start();

//for testing
export default app;

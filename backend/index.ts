import express from 'express';
import cors from 'cors';
import dogApiRouter from './routes/dog_api';
import 'express-async-errors';
import middleware from './utils/middleware';
import dotenv from 'dotenv';
dotenv.config();
import { connectToDatabase } from './utils/db';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/dogapi', dogApiRouter);

app.use(middleware.errorHandler);

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

void start();

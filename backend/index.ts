import express from 'express';
import cors from 'cors';
import dogApiRouter from './routes/dog_api';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/dogapi', dogApiRouter);

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

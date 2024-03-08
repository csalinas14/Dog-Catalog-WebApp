import app from './index';
import { connectToDatabase } from './utils/db';

const start = async () => {
  await connectToDatabase();
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};
//

void start();

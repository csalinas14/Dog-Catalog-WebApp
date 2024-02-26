import { Sequelize } from 'sequelize';
//import { Umzug, SequelizeStorage } from 'umzug';
import { DATABASE_URL } from './config';

const sequelize = new Sequelize(DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    //await runMigrations();
    console.log('connected to the database');
  } catch (err) {
    console.log('failed to connect to the database');
    return process.exit(1);
  }

  return null;
};

export { sequelize, connectToDatabase };

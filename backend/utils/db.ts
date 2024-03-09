import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { DATABASE_URL } from './config';
//console.log(DATABASE_URL);
const sequelize = new Sequelize(DATABASE_URL, { dialect: 'postgres' });

export const migrator = new Umzug({
  migrations: {
    glob: ['../migrations/*.ts', { cwd: __dirname }]
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize
  }),
  logger: console
});

export type Migration = typeof migrator._types.migration;

/*

const migrationConf = {
  migrations: {
    glob: 'migrations/*.ts'
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name)
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};
*/

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    //await runMigrations();
    console.log('connected to the database');
  } catch (err) {
    console.error(err);
    console.log('failed to connect to the database');
    return process.exit(1);
  }

  return null;
};

export { sequelize, connectToDatabase };

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.sequelize = exports.migrator = void 0;
const sequelize_1 = require("sequelize");
const umzug_1 = require("umzug");
const config_1 = require("./config");
console.log(config_1.DATABASE_URL);
const sequelize = new sequelize_1.Sequelize(config_1.DATABASE_URL, { dialect: 'postgres' });
exports.sequelize = sequelize;
exports.migrator = new umzug_1.Umzug({
    migrations: {
        glob: ['../migrations/*.ts', { cwd: __dirname }]
    },
    context: sequelize,
    storage: new umzug_1.SequelizeStorage({
        sequelize
    }),
    logger: console
});
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
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        //await runMigrations();
        console.log('connected to the database');
    }
    catch (err) {
        console.error(err);
        console.log('failed to connect to the database');
        return process.exit(1);
    }
    return null;
});
exports.connectToDatabase = connectToDatabase;

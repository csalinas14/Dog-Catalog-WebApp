//require('ts-node/register');
//const configs = require('../configs.ts');
// eslint-disable-next-line @typescript-eslint/no-var-requires
//const path = require('path');

/*
module.exports = {
  host: process.env.DATABASE_URL_DEV,
  dialect: 'mysql',
  port: 5432
};
*/
const config = {
  development: {
    host: process.env.DATABASE_URL_DEV,
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};

//export default config;
module.exports.default = config;

module.exports = config;

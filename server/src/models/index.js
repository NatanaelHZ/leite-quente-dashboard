const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYQL_PASSWORD,
  { host: 'localhost', dialect: 'mysql' }
);

/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./User')(sequelize, Sequelize);
db.Animal = require('./Animal')(sequelize, Sequelize);

module.exports = db;

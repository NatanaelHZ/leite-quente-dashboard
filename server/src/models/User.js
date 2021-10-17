const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 6;

module.exports = (sequelize, Sequelize) => {
  class User extends Model {
    comparePassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'users',
      hooks: {
        beforeCreate: (user) => {
          const alterUser = user;
          alterUser.password = bcrypt.hashSync(user.password, SALT_ROUNDS);
        }
      },
      indexes: [{ unique: true, fields: ['email'] }]
    }
  );

  return User;
};

const { Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, Sequelize) => {
  class Animal extends Model {}

  Animal.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
      },
      registerNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      registerMotherNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      registerFatherNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      breed_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      birthDate: {
        type: Sequelize.STRING,
        allowNull: true,
        get() {
          const date = this.getDataValue('birthDate');
          // 'this' allows you to access attributes of the instance
          return moment(date).format('YYYY-MM-DD');
        }
      }
    },
    {
      sequelize,
      tableName: 'animals',
      hooks: {
        beforeCreate: () => {}
      },
      indexes: [{ unique: true, fields: ['registerNumber'] }]
    }
  );

  return Animal;
};

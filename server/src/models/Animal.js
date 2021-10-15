const { Model } = require('sequelize');

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

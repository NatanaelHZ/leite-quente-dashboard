const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Production extends Model {}

  Production.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      liters: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'productions',
      hooks: {
        beforeCreate: () => {}
      },
      indexes: [{ unique: true, fields: [] }]
    }
  );

  return Production;
};

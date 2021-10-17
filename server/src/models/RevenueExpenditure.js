const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class RevenueExpenditure extends Model {}

  RevenueExpenditure.init(
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
        allowNull: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'revenues_expenditures'
    }
  );

  return RevenueExpenditure;
};

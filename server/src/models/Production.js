const { Model } = require('sequelize');
const moment = require('moment');

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
        allowNull: false,
        get() {
          const date = this.getDataValue('date');
          // 'this' allows you to access attributes of the instance
          return moment(date).format('YYYY-MM-DD');
        }
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
      tableName: 'productions'
    }
  );

  return Production;
};

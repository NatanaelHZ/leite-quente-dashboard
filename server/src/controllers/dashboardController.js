const moment = require('moment');
const {
  Animal,
  Production,
  RevenueExpenditure,
  sequelize
} = require('../models');

exports.getTotals = async (req, res) => {
  try {
    const month = parseInt(moment().format('MM'), 10);

    const production = await Production.sum('liters', {
      where: {
        $and: sequelize.where(
          sequelize.fn('month', sequelize.col('date')),
          month
        )
      }
    });

    const revenues = await RevenueExpenditure.sum('price', {
      where: {
        type: 'R',
        $and: sequelize.where(
          sequelize.fn('month', sequelize.col('date')),
          month
        )
      }
    });

    const expenditures = await RevenueExpenditure.sum('price', {
      where: {
        type: 'E',
        $and: sequelize.where(
          sequelize.fn('month', sequelize.col('date')),
          month
        )
      }
    });

    const animals = await Animal.count({
      attributes: [[sequelize.fn('COUNT', 0), 'count']]
    });

    const total = {
      animals,
      production,
      month,
      revenues,
      expenditures
    };

    return res.status(200).json({
      data: total,
      message: 'list_success'
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

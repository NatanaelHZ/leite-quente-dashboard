const { RevenueExpenditure } = require('../models');

exports.list = async (req, res) => {
  try {
    const revenuesExpenditures = await RevenueExpenditure.findAll();

    return res.status(200).json({
      data: revenuesExpenditures,
      message: 'list_success'
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;

    const revenuesExpenditure = await RevenueExpenditure.findByPk(id);

    res.json({ data: revenuesExpenditure, message: 'get_success' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const revenuesExpenditure = await RevenueExpenditure.create(req.body);

    res.status(201).json({
      data: revenuesExpenditure,
      message: 'create_success'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const revenuesExpenditure = { ...req.body };

    const updated = await RevenueExpenditure.update(revenuesExpenditure, {
      where: { id }
    });

    res.status(201).json({ data: updated, message: 'update_success' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const revenuesExpenditure = await RevenueExpenditure.destroy({
      where: { id }
    });

    res.status(200).json({
      data: revenuesExpenditure,
      message: 'delete_success'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

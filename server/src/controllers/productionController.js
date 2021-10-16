const { Production } = require('../models');

exports.list = async (req, res) => {
  try {
    const productions = await Production.findAll();

    return res.status(200).json({
      data: productions,
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

    const production = await Production.findByPk(id);

    res.json({ data: production, message: 'get_success' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const production = await Production.create(req.body);

    res.status(201).json({
      data: production,
      message: 'create_success'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const production = { ...req.body };

    const updated = await Production.update(production, { where: { id } });

    res.status(201).json({ data: updated, message: 'update_success' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const production = await Production.destroy({ where: { id } });

    res.status(200).json({ data: production, message: 'delete_success' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

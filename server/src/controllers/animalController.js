const { Animal } = require('../models');

exports.list = async (req, res) => {
  try {
    const animals = await Animal.findAll();

    return res.status(200).json({
      data: animals,
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

    const animal = await Animal.findByPk(id);

    res.json({ data: animal, message: 'get_success' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const animal = await Animal.create(req.body);

    res.status(201).json({
      data: animal,
      message: 'create_success'
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = { ...req.body };

    const updated = await Animal.update(animal, { where: { id } });

    res.status(201).json({ data: updated, message: 'update_success' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const animal = await Animal.destroy({ where: { id } });

    res.status(200).json({ data: animal, message: 'delete_success' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

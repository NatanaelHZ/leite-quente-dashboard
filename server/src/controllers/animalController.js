const { Animal } = require('../models');

module.exports = class AnimalController {
  static async get(req, res) {
    try {
      const animals = await Animal.findAll();

      return res.status(200).json({
        animals,
        message: 'get_success'
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;

      const animal = await Animal.findByPk(id);

      res.json({ data: animal });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const AnimalCreated = await Animal.create(req.body);

      res.status(201).json({
        data: AnimalCreated,
        message: 'create_success'
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params.id;
      const animal = { ...req.body };

      const updateAnimal = await Animal.update(animal, { where: { id } });

      res.status(201).json({ data: updateAnimal, message: 'update_success' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params.id;

      const deletedAnimal = await Animal.destroy({ where: { id } });

      res.json({ data: deletedAnimal, message: 'delete_success' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

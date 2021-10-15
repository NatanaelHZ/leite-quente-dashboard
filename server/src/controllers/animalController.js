const UserService = require('../services/UserService');
const { Animal } = require('../models');

module.exports = class AnimalController {
  static async get(req, res) {
    try {
      const allUsers = await UserService.getAllUsers();

      res.json({ users: allUsers });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getUserbyId(req, res) {
    try {
      const idUser = req.params.id;

      const getUserbyId = await UserService.getUserbyId(idUser);

      res.json({ user: getUserbyId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      console.log(`UHUUUUUL ${req.body}`);
      const AnimalCreated = await Animal.create(req.body);

      return res.status(201).json({
        Animal: AnimalCreated,
        message: 'success_create_Animal'
      });
    } catch (e) {
      return res.status(400).json({
        message: e.message
      });
    }
  }

  static async update(req, res) {
    try {
      const user = { ...req.body, id: req.params.id };

      const updateUser = await UserService.updateUser(user);

      res.status(201).json({ user: updateUser, message: 'update_success' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const userId = req.params.id;

      const deleteUser = await UserService.deleteUser(userId);

      res.json({ user: deleteUser });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

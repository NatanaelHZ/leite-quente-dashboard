const UserService = require('../services/UserService');

module.exports = class UserController {
  static async getAllUsers(req, res) {
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

  static async registerUser(req, res) {
    try {
      const has = Object.prototype.hasOwnProperty;

      const user = await UserService.registerUser(req.body);

      if (has.call(user, 'password')) {
        delete user.password;
      }

      if (user.error) {
        res.status(400).json({ error: user.error, message: 'create_error' });
      } else {
        res.status(201).json({ user, message: 'create_success' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const user = { ...req.body, id: req.params.id };

      const updateUser = await UserService.updateUser(user);

      res.status(201).json({ user: updateUser, message: 'update_success' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const userId = req.params.id;

      const deleteUser = await UserService.deleteUser(userId);

      res.json({ user: deleteUser });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

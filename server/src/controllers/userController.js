const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = class UserController {
  static async get(req, res) {
    try {
      const users = await User.findAll();

      res.json({ data: users, message: 'get_success' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getbyId(req, res) {
    try {
      const { id } = req.params.id;

      const user = await User.findByPk(id);

      res.json({ data: user, message: 'get_success' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async register(req, res) {
    try {
      const has = Object.prototype.hasOwnProperty;
      const user = { ...req.body };
      const { email } = user;

      const userCreated = await User.create(user);

      if (userCreated.id) {
        const token = jwt.sign(
          { user_id: userCreated.id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: '9h'
          }
        );

        userCreated.token = token;

        if (has.call(user, 'password')) {
          delete user.password;
        }
      }

      res.status(201).json({ data: userCreated, message: 'register_success' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const user = { ...req.body };
      const { id } = req.params;

      const updatedUser = await User.update(user, { where: { id } });

      res.status(201).json({ data: updatedUser, message: 'update_success' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      const deletedUser = await User.destroy({ where: { id } });

      res.json({ data: deletedUser, message: 'delete_success' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

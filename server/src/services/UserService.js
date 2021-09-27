const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../models');

dotenv.config();

module.exports = class UserService {
  static async getAllUsers() {
    try {
      const allUsers = await User.findAll();

      return allUsers;
    } catch (error) {
      return error;
    }
  }

  static async createUser(data) {
    try {
      const newUser = {
        title: data.title,
        body: data.body,
        User_image: data.User_image,
      };

      const response = await new User(newUser).save();

      return response;
    } catch (error) {
      return error;
    }
  }

  static async registerUser(data) {
    try {
      const { email } = data;

      const user = await User.create(data);

      if (user.id) {
        const token = jwt.sign(
          { user_id: user.id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: '2h',
          }
        );

        user.token = token;
      } else {
        return { error: true, message: 'user_not_found' };
      }

      return user;
    } catch (error) {
      return { error, message: 'user_not_found' };
    }
  }

  static async getUserbyId(UserId) {
    try {
      const singleUser = await User.findByPk(UserId);

      return singleUser;
    } catch (error) {
      return error;
    }
  }

  static async updateUser(data) {
    try {
      const userId = data.id;

      const user = {
        name: data.name,
        email: data.name,
        password: data.name,
      };

      const updateUser = await User.update(user, { where: { id: userId } });

      return updateUser;
    } catch (error) {
      return error;
    }
  }

  static async deleteUser(UserId) {
    try {
      const deletedUser = await User.destroy({ where: { id: UserId } });

      return deletedUser;
    } catch (error) {
      return error;
    }
  }
};

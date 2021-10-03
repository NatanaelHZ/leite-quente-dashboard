const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { User } = require('../models');

dotenv.config();

module.exports = class AuthService {
  static async loginUser(data) {
    try {
      const { password, email } = data;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return { success: false, message: 'user_not_found' };
      }

      if (await user.comparePassword(password)) {
        const token = jwt.sign(
          { user_id: user.id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: '2h'
          }
        );

        return { token, email: user.email, id: user.id, success: true };
      }

      return { success: false, message: 'wrong_password' };
    } catch (error) {
      return { error, success: false, message: 'error_password' };
    }
  }
};

const AuthService = require('../services/AuthService');

module.exports = class authController {
  static async login(req, res) {
    try {
      const user = await AuthService.loginUser(req.body);

      if (user.success) {
        res.status(200).json({ user, success: true, message: 'login_success' });
      } else {
        res
          .status(400)
          .json({ error: user.error, success: false, message: 'login_error' });
      }
    } catch (error) {
      res
        .status(400)
        .json({ error: error.message, success: false, message: 'login_error' });
    }
  }
};

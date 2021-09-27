const AuthService = require('../services/AuthService');

module.exports = class authController {
  static async login(req, res) {
    try {
      const user = await AuthService.loginUser(req.body);

      if (user.error) {
        res.status(400).json({ error: user.error, message: 'login_error' });
      }

      res.status(201).json({ user, message: 'login_success' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

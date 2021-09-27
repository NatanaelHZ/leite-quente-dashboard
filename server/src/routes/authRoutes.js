const AuthController = require('../controllers/authController');

module.exports = (routes) => {
  routes.post('/auth/login', AuthController.login);
};

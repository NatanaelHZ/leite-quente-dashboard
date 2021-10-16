const authController = require('../controllers/authController');

module.exports = (routes) => {
  routes.post('/auth/login', authController.login);
  routes.post('/auth/register', authController.register);
};

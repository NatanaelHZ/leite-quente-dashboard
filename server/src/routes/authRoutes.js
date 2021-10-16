const authController = require('../controllers/authController');

module.exports = (routes) => {
  routes.post('/auth/login', authController.login);
};

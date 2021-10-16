const UserController = require('../controllers/userController');

module.exports = (routes, auth) => {
  routes.post('/users/register', UserController.register);
  routes.get('/users', auth, UserController.get);
  routes.get('/users/:id', auth, UserController.getbyId);
  routes.put('/users/:id', auth, UserController.update);
  routes.delete('/users/:id', auth, UserController.delete);
};

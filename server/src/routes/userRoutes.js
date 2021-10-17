const userController = require('../controllers/userController');

module.exports = (routes, auth) => {
  routes.get('/users', auth, userController.list);
  routes.get('/users/:id', auth, userController.get);
  routes.put('/users/:id', auth, userController.update);
  routes.delete('/users/:id', auth, userController.delete);
};

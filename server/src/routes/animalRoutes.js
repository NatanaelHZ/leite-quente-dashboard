const animalController = require('../controllers/animalController');

module.exports = (routes, auth) => {
  routes.post('/animals', auth, animalController.create);
  routes.get('/animals', auth, animalController.list);
  routes.get('/animals/:id', auth, animalController.get);
  routes.put('/animals/:id', auth, animalController.update);
  routes.delete('/animals/:id', auth, animalController.delete);
};

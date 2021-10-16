const animalController = require('../controllers/animalController');

module.exports = (routes, auth) => {
  routes.post('/animals', auth, animalController.create);
  routes.get('/animals', auth, animalController.get);
  /* routes.get('/animals/:id', auth, AnimalController.getUserbyId);
  routes.put('/animals/:id', auth, AnimalController.updateUser);
  routes.delete('/animals/:id', auth, AnimalController.deleteUser); */
};

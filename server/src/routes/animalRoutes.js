const AnimalController = require('../controllers/animalController');

module.exports = (routes, auth) => {
  routes.post('/animals', auth, AnimalController.create);
  /*  routes.get('/animals', auth, AnimalController.getAllanimals);
  routes.get('/animals/:id', auth, AnimalController.getUserbyId);
  routes.put('/animals/:id', auth, AnimalController.updateUser);
  routes.delete('/animals/:id', auth, AnimalController.deleteUser); */
};

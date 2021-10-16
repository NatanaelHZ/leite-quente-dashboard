const productionController = require('../controllers/productionController');

module.exports = (routes, auth) => {
  routes.post('/productions', auth, productionController.create);
  routes.get('/productions', auth, productionController.list);
  routes.get('/productions/:id', auth, productionController.get);
  routes.put('/productions/:id', auth, productionController.update);
  routes.delete('/productions/:id', auth, productionController.delete);
};

const revenueExpenditureController = require('../controllers/revenueExpenditureController');

module.exports = (routes, auth) => {
  routes.post(
    '/revenues_expenditures',
    auth,
    revenueExpenditureController.create
  );
  routes.get('/revenues_expenditures', auth, revenueExpenditureController.list);
  routes.get(
    '/revenues_expenditures/:id',
    auth,
    revenueExpenditureController.get
  );
  routes.put(
    '/revenues_expenditures/:id',
    auth,
    revenueExpenditureController.update
  );
  routes.delete(
    '/revenues_expenditures/:id',
    auth,
    revenueExpenditureController.delete
  );
};

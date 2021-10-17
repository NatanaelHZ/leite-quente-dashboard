const dashboardController = require('../controllers/dashboardController');

module.exports = (routes, auth) => {
  routes.get('/dashboards', auth, dashboardController.getTotals);
};

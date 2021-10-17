const { Router } = require('express');
const auth = require('../middleware/auth');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const animalRoutes = require('./animalRoutes');
const productionRoutes = require('./productionRoutes');
const revenueExpenditureRoutes = require('./revenueExpenditureRoutes');

const routes = Router();

authRoutes(routes);
userRoutes(routes, auth);
animalRoutes(routes, auth);
productionRoutes(routes, auth);
revenueExpenditureRoutes(routes, auth);

module.exports = routes;

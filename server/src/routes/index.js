const { Router } = require('express');
const auth = require('../middleware/auth');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

const routes = Router();

authRoutes(routes);
userRoutes(routes, auth);

module.exports = routes;

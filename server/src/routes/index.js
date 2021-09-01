const { Router } = require('express');
const auth = require('../middleware/auth');
const userRoutes = require('./userRoutes');

const routes = Router();

userRoutes(routes, auth);

module.exports = routes;
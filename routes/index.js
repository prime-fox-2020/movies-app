const express = require('express');
const routes = express.Router();
const DefaultController = require('../controller/DefaultController');
const productionHousesRoutes = require('./productionHouseRoutes');
const movieRoutes = require('./movieRoutes');
const castRoutes = require('./castRoutes');

routes.get('/', DefaultController.getHome);
routes.use('/productionHouse', productionHousesRoutes);
routes.use('/movie', movieRoutes);
routes.use('/cast', castRoutes);

module.exports = routes;

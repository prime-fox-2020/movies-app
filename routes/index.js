const express = require('express');
const routes = express.Router();
const productionHousesRoutes = require('./productionHouseRoutes');
const DefaultController = require('../controller/DefaultController');

routes.get('/', DefaultController.getHome);
routes.use('/productionHouses', productionHousesRoutes);

module.exports = routes;

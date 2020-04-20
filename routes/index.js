const express = require('express');
const routes = express.Router();

const HomeController = require('../controller/homeController');
const productionHouseController = require('../controller/productionHouseController');

const productionHouse = require('../routes/productionHouse');
//const movies = require('../routes/movies');

routes.get('/', homeController.getHome);
routes.get('/productionHouses', productionHouse);

module.exports = routes;

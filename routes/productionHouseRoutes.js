const express = require('express');
const routes = express.Router();

const PHC = require('../controller/ProductionHouseController');

routes.get('/', PHC.show);


module.exports = routes;

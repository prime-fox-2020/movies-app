const route = require('express').Router();
const Controller = require('../controllers/prodHouseController');

route.get('/', Controller.read);

module.exports = route;
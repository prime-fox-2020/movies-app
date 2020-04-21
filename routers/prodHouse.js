const routers = require('express').Router()
const ProductionHouseController = require('../controllers/prodHouseController')


routers.get('/', ProductionHouseController.showProdHouse)


module.exports = routers
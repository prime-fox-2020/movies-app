const router = require('express').Router()
const ProductionHousesController = require('../controller/productionHousesController')

router.get('/', ProductionHousesController.show)


module.exports = router
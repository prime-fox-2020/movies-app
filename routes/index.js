const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/HomeController')
const ProductionHouseController = require('../controllers/ProductionHouseController')

router.get('/', HomeController.home)
router.get('/productionhouses', ProductionHouseController.show)

module.exports = router
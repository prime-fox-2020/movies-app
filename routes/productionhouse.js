const express = require('express')
const ProductionHouseController = require('../controllers/ProductionHouseController')

const router = express.Router()

router.get('/', ProductionHouseController.getHome)

module.exports = router
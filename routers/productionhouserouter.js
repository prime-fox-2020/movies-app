const express = require('express')
const router = express.Router()

const ProductionHouseController = require('../controllers/productionhousecontroller')

router.get('/', ProductionHouseController.show)

module.exports = router
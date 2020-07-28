const express = require('express')
const router = express.Router()

const ProductionHouseController = require('../controllers/ProductionHouseController')

router.get('/', ProductionHouseController.show)

module.exports = router;

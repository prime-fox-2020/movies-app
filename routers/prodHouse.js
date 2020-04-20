const router = require('express').Router()

const prodHouseController = require('../controllers/productionHouses')

router.get('/', prodHouseController.showData)

module.exports = router
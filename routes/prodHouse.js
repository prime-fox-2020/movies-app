const router = require('express').Router()
const prodHouseController = require('../controllers/prodHouse')

router.get('/', prodHouseController.show)

module.exports = router
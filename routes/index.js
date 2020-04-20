const express = require('express')
const router = express.Router()
const ProductionHouseController = require('../controllers/productionhouse')
const movies = require('./movies')

router.get('/', ProductionHouseController.showAll)

router.use('/movies', movies)

// router.get('/*', ProductionHouseController.show404)

module.exports = router
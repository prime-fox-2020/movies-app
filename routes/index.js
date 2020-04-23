const express = require('express')
const router = express.Router()
const ProductionHouseController = require('../controllers/productionhouse')
const movies = require('./movies')
const casts = require('./casts')

router.get('/', ProductionHouseController.showAll)

router.use('/movies', movies)
router.use('/casts', casts)

// router.get('/*', ProductionHouseController.show404)

module.exports = router
const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/HomeController')

const routeProductionHouse = require('./productionHouse')
const routeMovie = require('./movie')
const routeCast = require('./cast')

router.get('/', HomeController.getHome)
router.use('/productionhouses', routeProductionHouse)
router.use('/movies', routeMovie)
router.use('/casts', routeCast)
router.get('/*', HomeController.notFound)

module.exports = router
const express = require('express')
const HomeController = require('../controllers/HomeController')
const routeProductionHouses = require('./productionHouses')
const routeMovies = require('./movies')
const routeCasts = require('./casts')

const router = express.Router()

router.get('/', HomeController.getHome)
router.use('/productionHouses', routeProductionHouses)
router.use('/movies', routeMovies)
router.use('/casts', routeCasts)

router.get('/*', HomeController.notFound)

module.exports = router
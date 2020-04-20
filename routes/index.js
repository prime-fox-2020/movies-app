const express = require('express')
const HomeController = require('../controllers/HomeController')
const routeProductionHouses = require('./productionHouses')
const routeMovies = require('./movies')

const router = express.Router()

router.get('/', HomeController.getHome)
router.use('/productionHouses', routeProductionHouses)
router.use('/movies', routeMovies)

router.get('/*', HomeController.notFound)

module.exports = router
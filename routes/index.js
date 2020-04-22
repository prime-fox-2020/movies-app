const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/HomeController')
const ProductionHouseController = require('../controllers/ProductionHouseController')
const MovieController = require('../controllers/MovieController')
const CastController = require('../controllers/CastController')

const { Movie, ProductionHouse, Cast } = require('../models')

router.get('/', HomeController.home)

router.get('/productionhouses', ProductionHouseController.show)

router.get('/movies', MovieController.show)
router.get('/movies/addmovieform', MovieController.addMovieForm)
router.post('/movies/addmovieform', MovieController.addMovie)
router.get('/movies/:id?/edit', MovieController.editMovieForm)
router.post('/movies/:id?/edit', MovieController.editMovie)
router.get('/movies/:id?/delete', MovieController.delete)
router.get('/movies/:id?/addcast', MovieController.addCastForm)
router.post('/movies/:id?/addcast', MovieController.addCast)

router.get('/casts', CastController.show)
router.get('/casts/addCastForm', CastController.addCastForm)
router.post('/casts/addCastForm', CastController.add)
router.get('/casts/:id?/edit', CastController.editCastForm)
router.post('/casts/:id?/edit', CastController.editCast)
router.get('/casts/:id?/delete', CastController.delete)
router.get('/casts/:id?/seemovies', CastController.seeMovies)

module.exports = router
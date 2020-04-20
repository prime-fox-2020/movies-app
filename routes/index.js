const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/HomeController')
const ProductionHouseController = require('../controllers/ProductionHouseController')
const MovieController = require('../controllers/MovieController')

const { Movie, ProductionHouse } = require('../models')

router.get('/', HomeController.home)
router.get('/productionhouses', ProductionHouseController.show)
router.get('/movies', MovieController.show)
router.get('/movies/addmovieform', MovieController.addMovieForm)
router.post('/movies/addmovieform', MovieController.addMovie)
router.get('/movies/:id?/edit', MovieController.editMovieForm)
router.post('/movies/:id?/edit', MovieController.editMovie)
router.get('/movies/:id?/delete', MovieController.delete)
// router.get('/tes', (req, res) => {
//     ProductionHouse.findAll({
//         include: [{model : Movie}]
//     }).then(data => {
//         res.send(data)
//     })
// })

module.exports = router
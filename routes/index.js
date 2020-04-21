const router = require('express').Router()
const prodHouse = require('./prodHouse')
const movies = require('./movies')
const cast = require('./cast')
const homeControllers = require('../controllers/home')

router.get('/', homeControllers.home)
router.use('/prodHouse', prodHouse)
router.use('/movies', movies)
router.use('/casts', cast)

module.exports = router
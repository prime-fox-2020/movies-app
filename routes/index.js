'use strict'

const router = require('express').Router()

//routes
const home              = require('../controllers/home')
const productionHouses  = require('./productionHouses')
const movies            = require('./movies')

router.get('/', home.getHome)
router.use('/productionHouses', productionHouses)
router.use('/movies', movies)

module.exports = router
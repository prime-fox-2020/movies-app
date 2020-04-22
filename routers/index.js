const express = require('express')
const router = express.Router()
const HomeController = require('../controllers/homecontroller')
const productionHouseRouter = require('./productionhouserouter')
const movieRouter = require('./movierouter')
const castRouter = require('./castrouter')

router.get('/', HomeController.home)
router.use('/productionhouses', productionHouseRouter)
router.use('/movies', movieRouter)
router.use('/casts', castRouter)

module.exports = router
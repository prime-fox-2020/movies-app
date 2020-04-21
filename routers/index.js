const express = require('express')
const router = express.Router()

const HomeController = require('../controllers/homeController')
const ProductionRouter = require('../routers/productionhouse')
const MovieRouter = require('../routers/movie')
const CastRouter = require('../routers/cast')

router.get('/', HomeController.home)
router.use('/productionhouses', ProductionRouter)
router.use('/movies', MovieRouter)
router.use('/casts', CastRouter)

module.exports = router
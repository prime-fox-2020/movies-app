const express = require('express')
const router = express.Router()

const HomeController = require('../controllers/homeController')
const ProductionRouter = require('../routers/productionhouse')
const MovieRouter = require('../routers/movie')


router.get('/', HomeController.home)
router.use('/productionhouses', ProductionRouter)
router.use('/movies', MovieRouter)

module.exports = router
const router = require('express').Router()
const HomeController = require('../controller/homeController')
const ProductionHousesRouter = require('../route/productionHouseRouter')
const MoviesRouter = require('../route/moviesRouter')

router.get('/', HomeController.show)
router.use('/productionHouses', ProductionHousesRouter)
router.use('/movies', MoviesRouter)


module.exports = router
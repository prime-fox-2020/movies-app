const router = require('express').Router()
const HomeController = require('../controller/homeController')
const ProductionHousesRouter = require('../route/productionHouseRouter')
const MoviesRouter = require('../route/moviesRouter')
const CastsRouter = require('../route/castsRouter')

router.get('/', HomeController.show)
router.use('/productionHouses', ProductionHousesRouter)
router.use('/movies', MoviesRouter)
router.use('/casts', CastsRouter)


module.exports = router
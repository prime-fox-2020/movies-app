const router = require('express').Router()
const productionHousesRouter = require('./productionHousesRouter')
const moviesRouter = require('./moviesRouter')
const castsRouter = require('./castsRouter')
const pagesRouter = require('./pagesRouter')

router.use('/production-houses', productionHousesRouter)
router.use('/movies', moviesRouter)
router.use('/casts', castsRouter)
router.use(pagesRouter)

module.exports = router
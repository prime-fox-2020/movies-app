const router = require('express').Router()
const productionHousesRouter = require('./productionHousesRouter')
const moviesRouter = require('./moviesRouter')
const pagesRouter = require('./pagesRouter')

router.use('/production-houses', productionHousesRouter)
router.use('/movies', moviesRouter)
router.use(pagesRouter)

module.exports = router
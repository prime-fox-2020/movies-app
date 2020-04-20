const router = require('express').Router()
const productionHousesRouter = require('./productionHousesRouter')
const moviesRouter = require('./moviesRouter')

router.use('/production-houses', productionHousesRouter)
router.use('/movies', moviesRouter)
router.use('/', productionHousesRouter)

module.exports = router
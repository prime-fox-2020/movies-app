const router = require('express').Router()
const IndexController = require('../controllers/index-controller')
const moviesRouter = require('./movies-router')
const phRouter = require('./production-house-router')
const castsRouter = require('./casts-router')

router.get('/', IndexController.home)
router.use('/movies', moviesRouter)
router.use('/phouses', phRouter)
router.use('/casts', castsRouter)

module.exports = router
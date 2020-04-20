const router = require('express').Router()
const IndexController = require('../controllers/index-controller')
const moviesRouter = require('./movies-router')
const phRouter = require('./production-house-router')

router.get('/', IndexController.home)
router.use('/movies', moviesRouter)
router.use('/phouses', phRouter)

module.exports = router
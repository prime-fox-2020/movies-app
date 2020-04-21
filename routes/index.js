const express = require('express')
const DefaultController = require('../controllers/DefaultController')
const ProductionHouseRoute = require('./productionhouse')
const MovieRoute = require('./movie')
const CastRoute = require('./cast')

const router = express.Router()

router.get('/', DefaultController.getHome)
router.use('/productionhouses', ProductionHouseRoute)
router.use('/movies', MovieRoute)
router.use('/casts', CastRoute)
router.get('/*', DefaultController.getError)

module.exports = router
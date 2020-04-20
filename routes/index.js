const express = require('express')
const DefaultController = require('../controllers/DefaultController')
const ProductionHouseRoute = require('./productionhouse')
const MovieRoute = require('./movie')

const router = express.Router()

router.get('/', DefaultController.getHome)
router.use('/productionhouses', ProductionHouseRoute)
router.use('/movies', MovieRoute)
router.use('/casts', DefaultController.getNoImplement)
router.get('/*', DefaultController.getError)

module.exports = router
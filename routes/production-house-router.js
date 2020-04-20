const router = require('express').Router()
const ProductionHousesController = require('../controllers/ph-controller')

router.get('/', ProductionHousesController.showPh)
module.exports = router
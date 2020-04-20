const router = require('express').Router()
const Controller = require('../controllers/ProductionHousesController')

router.route('/')
  .get(Controller.show)

module.exports = router
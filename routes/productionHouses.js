const router            = require('express').Router()
const productionHouses  = require('../controllers/productionHouses')

router.get('/', productionHouses.getProdHouses)

module.exports = router
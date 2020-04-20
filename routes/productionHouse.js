const router = require('express').Router();

const ProductionHouseCont = require('../controller/productionHouseCont');

router.get('/', ProductionHouseCont.show)

module.exports = router;

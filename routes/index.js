const router = require('express').Router();

const productionHouseRout = require('./productionHouse');

router.get('/',(req, res) => res.send('ini index.js route '))

router.use('/productionHouses',productionHouseRout)

module.exports = router;

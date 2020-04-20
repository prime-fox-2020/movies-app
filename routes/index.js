const router = require('express').Router();

const productionHouseRout = require('./productionHouse');
const movieRout = require('./movie');

router.get('/',(req, res) => res.render('home'))

router.use('/productionHouses',productionHouseRout)
router.use('/movies',movieRout)

module.exports = router;

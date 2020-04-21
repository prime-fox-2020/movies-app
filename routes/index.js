const router = require('express').Router();

const productionHouseRout = require('./productionHouse');
const movieRout = require('./movie');
const castRout = require('./cast');

router.get('/',(req, res) => res.render('home'))

router.use('/productionHouses',productionHouseRout)
router.use('/movies',movieRout)
router.use('/cast', castRout)

module.exports = router;

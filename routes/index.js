const router = require('express').Router();

const homeController = require('../controllers/homeController');
const movie = require('./movie');
const prodHouse = require('./prodHouse');
const cast = require('./cast')

router.get('/', homeController.show);

router.use('/movies', movie);
router.use('/production-house', prodHouse);
router.use('/casts', cast)

module.exports = router
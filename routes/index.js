const router = require('express').Router();
const Controller = require('../controllers/home');
const prodHouse = require('./prodHouse');
const movie = require('./movie');
const cast = require('./cast');

router.get('/', Controller.homePage);
router.use('/prodHouses', prodHouse);
router.use('/movies', movie);
router.use('/casts', cast);
router.get('/*', Controller.notFound);

module.exports = router;
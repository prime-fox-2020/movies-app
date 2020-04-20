const router = require('express').Router();
const Controller = require('../controllers/home');
const prodHouse = require('./prodHouse');
const movie = require('./movie');

router.get('/', Controller.homePage);
router.use('/prodHouses', prodHouse);
router.use('/movies', movie);
router.get('/*', Controller.notFound);

module.exports = router;
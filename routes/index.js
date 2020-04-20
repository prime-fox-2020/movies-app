const router = require('express').Router();

const homeController = require('../controllers/homeController');
const movie = require('./movie');
const prodHouse = require('./prodHouse');

router.get('/', homeController.show);

router.use('/movies', movie);
router.use('/production-house', prodHouse);

module.exports = router
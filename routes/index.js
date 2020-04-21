const express = require('express');
const HomeController = require('../controllers/HomeController')
const routesProduction = require('./production');
const routesMovie = require('./movie');
const routesCast = require('./cast');
const router = express.Router();

router.get('/', HomeController.getHome);
router.use('/production', routesProduction);
router.use('/movie', routesMovie);
router.use('/cast', routesCast);
router.get('/*', HomeController.notFound);

module.exports = router;
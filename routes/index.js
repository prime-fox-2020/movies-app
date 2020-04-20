const router = require('express').Router();
const CinemaController = require('../controllers/CinemaController');

router.get('/', CinemaController.movieList);
router.get('/movie', CinemaController.movieList);
router.get('/productionHouse', CinemaController.productionHouseList);
router.get('/*', CinemaController.error);

module.exports = router;
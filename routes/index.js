const router = require('express').Router();
const CinemaController = require('../controllers/CinemaController');
const CastController = require('../controllers/CastController');

router.get('/', CinemaController.showMovie);
router.get('/movie', CinemaController.showMovie);
router.get('/movie/add', CinemaController.addMovieGet);
router.post('/movie/add', CinemaController.addMoviePost);
router.get('/movie/add/cast/:id', CinemaController.addCastGet);
router.post('/movie/add/cast/:id', CinemaController.addCastPost);
router.get('/movie/edit/:id', CinemaController.editMovieGet);
router.post('/movie/edit/:id', CinemaController.editMoviePost);
router.get('/movie/delete/:id', CinemaController.deleteMovie);
router.get('/productionHouse', CinemaController.showProductionHouse);

router.get('/cast', CastController.showCast);
router.get('/cast/add', CastController.addCastGet);
router.post('/cast/add', CastController.addCastPost);
router.get('/cast/see/:id', CastController.seeMovies);
router.get('/cast/edit/:id', CastController.editCastGet);
router.post('/cast/edit/:id', CastController.editCastPost);
router.get('/cast/delete/:id', CastController.deleteCast);
router.get('/*', CinemaController.showError);

module.exports = router;
const router = require('express').Router();
const CinemaController = require('../controllers/CinemaController');

router.get('/', CinemaController.showMovie);
router.get('/movie', CinemaController.showMovie);
router.get('/movie/add', CinemaController.addMovieGet);
router.post('/movie/add', CinemaController.addMoviePost);
router.get('/movie/edit/:id', CinemaController.editMovieGet);
router.post('/movie/edit/:id', CinemaController.editMoviePost);
router.get('/movie/delete/:id', CinemaController.deleteMovie);
router.get('/productionHouse', CinemaController.showProductionHouse);
router.get('/*', CinemaController.showError);

module.exports = router;
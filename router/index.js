const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: true}));

const ProductionHouses = require('../controller/productionHouses');
const Movies = require('../controller/movies');
const Casts = require('../controller/casts');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/productionhouses', ProductionHouses.getData);

router.get('/movies', Movies.getData);
router.get('/movies/add', Movies.addData);
router.post('/movies/add', Movies.add);
router.get('/movies/:id/edit', Movies.editData);
router.post('/movies/:id/edit', Movies.edit);
router.get('/movies/:id/delete', Movies.delete);
router.get('/movies/:id/addCast', Movies.addCastGet);
router.post('/movies/:id/addCast', Movies.addCast);

router.get('/casts', Casts.getData);
router.get('/casts/add', Casts.addData);
router.post('/casts/add', Casts.add);
router.get('/casts/:id/edit', Casts.editData);
router.post('/casts/:id/edit', Casts.edit);
router.get('/casts/:id/delete', Casts.delete);

module.exports = router;
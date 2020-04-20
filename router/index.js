const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: true}));

const ProductionHouses = require('../controller/productionHouses');
const Movies = require('../controller/movies');

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

module.exports = router;
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: true}));

const ProductionHouses = require('../controller/productionHouses');
const Movies = require('../controller/movies');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/productionhouses', ProductionHouses.getData);

module.exports = router;
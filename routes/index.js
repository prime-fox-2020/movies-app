const route = require('express').Router();
const productionHouseRouter = require('./productionHouseRouter');
const movieRouter = require('./movieRouter');
const castRouter = require('./castRouter');

route.get('/', (req, res) => res.render('home'));
route.use('/production_houses', productionHouseRouter);
route.use('/movies', movieRouter);
route.use('/casts', castRouter);


module.exports = route;
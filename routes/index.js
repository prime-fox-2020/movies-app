const { Router } = require('express');
const productionHousesRouter = require('./production-houses');
const moviesRouter = require('./movies');
const castsRouter = require('./casts');
const mainRouter = Router();
const IndexController = require('../controllers');

mainRouter.get('/', IndexController.index);
mainRouter.use('/production-houses', productionHousesRouter);
mainRouter.use('/movies', moviesRouter);
mainRouter.use('/casts', castsRouter);

module.exports = mainRouter;
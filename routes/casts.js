const { Router } = require('express');
const castsRouter = Router();
const CastController = require('../controllers/cast');

castsRouter.get('/', CastController.list);
castsRouter.get('/add', CastController.showAddForm);
castsRouter.post('/add', CastController.add);
castsRouter.get('/edit/:id', CastController.showEditForm);
castsRouter.post('/edit/:id', CastController.edit);
castsRouter.get('/delete/:id', CastController.delete);
castsRouter.get('/movies/:id', CastController.showCastMovies);

module.exports = castsRouter;
const { Router } = require('express');
const moviesRouter = Router();
const MovieController = require('../controllers/movie');

moviesRouter.get('/', MovieController.list);
moviesRouter.get('/add', MovieController.showAddForm);
moviesRouter.post('/add', MovieController.add);
moviesRouter.get('/edit/:id', MovieController.showEditForm);
moviesRouter.post('/edit/:id', MovieController.edit);
moviesRouter.get('/delete/:id', MovieController.delete);
moviesRouter.get('/casts/:id', MovieController.showCasts);
moviesRouter.post('/casts/:id', MovieController.addCast);

module.exports = moviesRouter;
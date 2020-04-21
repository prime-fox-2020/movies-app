const route = require('express').Router();
const Controller = require('../controllers/castController');

route.get('/', Controller.read);
route.get('/add', Controller.add_get);
route.post('/add', Controller.add_post);
route.get('/movies/:id', Controller.seeMovies);
route.get('/:id/edit', Controller.edit_get);
route.post('/:id/edit', Controller.edit_post);
route.get('/:id/delete', Controller.delete);

module.exports = route;
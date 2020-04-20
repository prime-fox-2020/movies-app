const route = require('express').Router();
const Controller = require('../controllers/controller');

route.get('/', (req, res) => res.render('home'));

route.get('/production_houses', Controller.read_prod_house);

route.get('/movies', Controller.read_movie);
route.get('/movies/add', Controller.add_get);
route.post('/movies/add', Controller.add_post);
route.get('/movies/:id/edit', Controller.edit_get);
route.post('/movies/:id/edit', Controller.edit_post);
route.get('/movies/:id/delete', Controller.delete);

module.exports = route;
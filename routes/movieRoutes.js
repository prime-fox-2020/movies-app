const express = require('express');
const routes = express.Router();

const MC = require('../controller/MovieController');

routes.get('/', MC.show);
routes.get('/add', MC.addForm);
routes.post('/add', MC.add);
routes.get('/:id/edit', MC.editForm);
routes.post('/:id/edit', MC.edit);
routes.get('/:id/delete', MC.delete);
// router.get('/:id/addCastMovie', MC.addMovieCastForm);
// router.post('/:id/addCastMovie', MC.addMovieCast);


module.exports = routes;

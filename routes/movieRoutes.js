const express = require('express');
const routes = express.Router();

const MC = require('../controller/MovieController');

routes.get('/', MC.show);
routes.get('/add', MC.addForm);
routes.post('/add', MC.add);
routes.get('/edit/:id', MC.editForm);
routes.post('/edit/:id', MC.edit);
routes.get('/delete/:id', MC.delete);


module.exports = routes;

const express = require('express');
const routes = express.Router();

const CC = require('../controller/CastController');

routes.get('/', CC.showCast);
routes.get('/:id/castMovie', CC.showMovie);
routes.get('/addCast', CC.addFormCast);
routes.post('/addCast', CC.addCast);
routes.get('/:id/editCast', CC.editFormCast );
routes.post('/:id/editCast', CC.editCast);
routes.get('/:id/deleteCast', CC.deleteCast);

module.exports = routes;

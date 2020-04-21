const routes = require('express').Router()
const CastController = require('../controller/castController')

routes.get('/', CastController.show)
routes.get('/add', CastController.getAdd)
routes.post('/add', CastController.postAdd)
routes.get('/:id/edit', CastController.getEdit)
routes.post('/:id/edit', CastController.postEdit)
routes.get('/:id/delete', CastController.delete)
routes.get('/:id/movies', CastController.getMovies)



module.exports = routes
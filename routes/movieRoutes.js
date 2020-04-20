const routes = require('express').Router()
const MovieController = require('../controller/moviesController')

routes.get('/', MovieController.show)
routes.get('/add', MovieController.getAdd)
routes.post('/add', MovieController.postAdd)
routes.get('/:id/delete', MovieController.delete)
routes.get('/:id/edit', MovieController.getEdit)
routes.post('/:id/edit', MovieController.postEdit)


module.exports = routes
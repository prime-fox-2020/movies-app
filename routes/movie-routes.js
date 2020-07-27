const express = require('express')
const routes = express.Router()

const controllerMovie = require('../controller/controllerMov.js')

routes.get('/movies',controllerMovie.showAll)
routes.get('/movies/add',controllerMovie.add)
routes.post('/movies/add',controllerMovie.postAdd)
routes.get('/movies/edit/:id',controllerMovie.edit)
routes.post('/movies/edit/:id',controllerMovie.postEdit)
routes.get('/movies/delete/:id',controllerMovie.delete)
routes.get('/movies/addcast/:id',controllerMovie.addCast)
routes.post('/movies/addcast/:id',controllerMovie.addCastPost)

module.exports = routes
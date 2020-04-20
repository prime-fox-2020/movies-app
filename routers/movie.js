const routers = require('express').Router()
const MovieController = require('../controllers/movieController')


routers.get('/', MovieController.showMovies)
routers.get('/add', MovieController.addMovies)
routers.post('/add', MovieController.addMoviesPost)
routers.get('/edit/:id', MovieController.editMovie)
routers.post('/edit/:id', MovieController.editMoviePost)
routers.get('/delete/:id', MovieController.deleteMovie)

module.exports = routers
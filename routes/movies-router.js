const router = require('express').Router()
const MoviesController = require('../controllers/movies-controller')

router.get('/', MoviesController.showMovies)
router.get('/add', MoviesController.getAddForm)
router.post('/add', MoviesController.postAdd)
router.get('/edit/:id', MoviesController.getEditForm)
router.post('/edit/:id', MoviesController.postEdit)
router.get('/delete/:id', MoviesController.delete)
router.post('/:id', MoviesController.searchMovieById)


module.exports = router
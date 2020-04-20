const router = require('express').Router()
const MoviesController = require('../controller/moviesController')

router.get('/', MoviesController.show)
router.get('/add', MoviesController.addGet)
router.post('/add', MoviesController.addPost)
router.get('/edit/:id', MoviesController.editGet)
router.post('/edit/:id', MoviesController.editPost)
router.get('/delete/:id', MoviesController.deleteMovie)


module.exports = router
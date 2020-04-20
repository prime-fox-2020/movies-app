const router = require('express').Router()
const moviesController = require('../controllers/movies')

router.get('/', moviesController.show)
router.get('/add', moviesController.getAdd)
router.post('/add', moviesController.add)
router.get('/:id/delete', moviesController.delete)
router.get('/:id/edit', moviesController.getEdit)
router.post('/:id/edit', moviesController.update)

module.exports = router
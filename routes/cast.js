const router = require('express').Router()
const castController = require('../controllers/cast')

router.get('/', castController.show)
router.get('/add', castController.getAdd)
router.post('/add', castController.add)
router.get('/:id/delete', castController.delete)
router.get('/:id/edit', castController.getEdit)
router.post('/:id/edit', castController.update)
router.get('/:id/see-movies', castController.seeMovies)

module.exports = router
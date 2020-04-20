const router = require('express').Router()

const movieController = require('../controllers/movies')

router.get('/', movieController.showData)
router.get('/add', movieController.addForm)
router.post('/add', movieController.addPost)
router.get('/edit/:id', movieController.editForm)
router.post('/edit/:id', movieController.editPost)
router.get('/delete/:id', movieController.delete)

module.exports = router
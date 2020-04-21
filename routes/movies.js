const express = require('express')
const MovieController = require('../controllers/moviesController')

const router = express.Router()

router.get('/', MovieController.getMovies)
router.get('/add', MovieController.addGet)
router.post('/add', MovieController.addPost)
router.get('/delete/:id', MovieController.delete)
router.get('/edit/:id', MovieController.editGet)
router.post('/edit/:id', MovieController.editPost)
router.get('/addcast/:id', MovieController.addCastGet)
router.post('/addcast/:id', MovieController.addCastPost)


module.exports = router
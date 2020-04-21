const express = require('express')
const MovieController = require('../controllers/MovieController')

const router = express.Router()

router.get('/', MovieController.getHome)
router.get('/add', MovieController.add)
router.post('/add', MovieController.addPost)
router.get('/edit/:id', MovieController.edit)
router.post('/edit/:id', MovieController.editPost)
router.get('/delete/:id', MovieController.delete)
router.get('/addcast/:id', MovieController.addMovieCast)
router.post('/addcast/:id', MovieController.addMovieCastPost)
module.exports = router
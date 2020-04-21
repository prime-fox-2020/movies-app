const express = require('express')
const CastController = require('../controllers/castsController')

const router = express.Router()

router.get('/', CastController.getCasts)
router.get('/add', CastController.addGet)
router.post('/add', CastController.addPost)
router.get('/delete/:id', CastController.delete)
router.get('/edit/:id', CastController.editGet)
router.post('/edit/:id', CastController.editPost)
router.get('/movies/:id', CastController.getMovies)


module.exports = router
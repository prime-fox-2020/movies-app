const express = require('express')
const CastController = require('../controllers/CastController')

const router = express.Router()

router.get('/', CastController.getHome)
router.get('/add', CastController.add)
router.post('/add', CastController.addPost)
router.get('/edit/:id', CastController.edit)
router.post('/edit/:id', CastController.editPost)
router.get('/delete/:id', CastController.delete)
router.get('/movies/:id', CastController.seeMovies)
module.exports = router
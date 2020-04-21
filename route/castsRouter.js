const router = require('express').Router()
const CastsController = require('../controller/castsController')

router.get('/', CastsController.show)
router.get('/add', CastsController.addGet)
router.post('/add', CastsController.addPost)
router.get('/edit/:id', CastsController.editGet)
router.post('/edit/:id', CastsController.editPost)
router.get('/delete/:id', CastsController.deleteCasts)
router.get('/seeMovies/:id', CastsController.seeMovies)


module.exports = router
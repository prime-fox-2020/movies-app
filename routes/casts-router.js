const router = require('express').Router()
const CastsController = require('../controllers/casts-controller')

router.get('/', CastsController.showCasts)
router.get('/add', CastsController.getAddForm)
router.post('/add', CastsController.postAdd)
router.get('/edit/:id', CastsController.getEditForm)
router.post('/edit/:id', CastsController.postEdit)
router.get('/delete/:id', CastsController.delete)

module.exports = router
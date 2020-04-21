const router = require('express').Router()

const castController = require('../controllers/casts')

router.get('/', castController.showData)
router.get('/add', castController.addForm)
router.post('/add', castController.addPost)
router.get('/edit/:id', castController.editGet)
router.post('/edit/:id', castController.editPost)
router.get('/delete/:id', castController.delete)


module.exports = router
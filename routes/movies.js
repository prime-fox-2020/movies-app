const router = require('express').Router()
const MovieController = require('../controllers/movie')

router.get('/', MovieController.showAll)
router.get('/add', MovieController.showForm)
router.post('/add', MovieController.addProcess)
router.get('/delete/:id', MovieController.deleteProcess)
router.get('/edit/:id', MovieController.showEdit)
router.post('/edit/:id', MovieController.editProcess)
router.get('/add-cast/:id', MovieController.showAddCast)
router.post('/add-cast/:id', MovieController.addCastProcess)

module.exports = router
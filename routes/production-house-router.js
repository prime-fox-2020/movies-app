const router = require('express').Router()
const ProductionHousesController = require('../controllers/ph-controller')

router.get('/', ProductionHousesController.showPh)
router.get('/add', ProductionHousesController.getAddForm)
router.post('/add', ProductionHousesController.postAdd)
router.get('/edit/:id', ProductionHousesController.getEditForm)
router.post('/edit/:id', ProductionHousesController.postEdit)
router.get('/delete/:id', ProductionHousesController.delete)
router.post('/:id', ProductionHousesController.searchPhById)

module.exports = router
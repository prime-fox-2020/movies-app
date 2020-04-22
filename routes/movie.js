const router = require('express').Router();

const MovieCont = require('../controller/movieCont');

router.get('/', MovieCont.show)

router.get('/add', MovieCont.addForm)
router.post('/add', MovieCont.add)

router.get('/:id/edit', MovieCont.editForm)
router.post('/:id/edit', MovieCont.update)

router.get('/:id/delete', MovieCont.delete)

router.get('/:id/addCast', MovieCont.addCast)
router.post('/:id/addCast', MovieCont.updateCast)
module.exports = router;

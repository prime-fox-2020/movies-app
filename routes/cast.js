const router = require('express').Router();

const CastCont = require('../controller/castCont');

router.get('/', CastCont.show)

router.get('/add', CastCont.addForm)
router.post('/add', CastCont.add)

router.get('/:id/edit', CastCont.editForm)
router.post('/:id/edit', CastCont.update)

router.get('/:id/delete', CastCont.delete)

module.exports = router;

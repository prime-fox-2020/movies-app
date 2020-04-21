const router = require('express').Router()
const Controller = require('../controllers/CastsController')

router.route('/')
  .get(Controller.show)

router.route('/add')
  .get(Controller.addForm)
  .post(Controller.add)

router.route('/edit/:id')
  .get(Controller.editForm)
  .post(Controller.edit)

router.route('/delete/:id')
  .get(Controller.delete)

module.exports = router
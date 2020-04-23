const router = require('express').Router()
const Controller = require('../controllers/PagesController')

router.route('/')
  .get(Controller.getHome)

router.route('/*')
  .get(Controller.notFound)
  
module.exports = router
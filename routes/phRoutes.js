const routes = require('express').Router()
const PhController = require('../controller/phController')

routes.get('/', PhController.show)


module.exports = routes
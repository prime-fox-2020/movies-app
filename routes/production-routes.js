const express = require('express')
const routes = express.Router()
const controllerProd = require('../controller/controllerProd')

routes.get('/production',controllerProd.show)


module.exports = routes
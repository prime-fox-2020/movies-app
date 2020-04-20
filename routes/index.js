const routes = require('express').Router()
const homeControl = require('../controller/home')
const phRoutes = require('./ph')
const movieRoutes = require('./movie')

routes.get('/', homeControl.getHome)
routes.use('/productionhouse', phRoutes)
routes.use('/movies', movieRoutes)

routes.get('/*', homeControl.notFound)

module.exports = routes;
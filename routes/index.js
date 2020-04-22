const routes = require('express').Router()
const homeControl = require('../controller/home')
const phRoutes = require('./ph')
const movieRoutes = require('./movie')
const castRoutes = require('./cast')

routes.get('/', homeControl.getHome)
routes.use('/productionhouse', phRoutes)
routes.use('/movies', movieRoutes)
routes.use('/cast', castRoutes)

routes.get('/*', homeControl.notFound)

module.exports = routes;
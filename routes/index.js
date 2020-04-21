const routes = require('express').Router()
const HomeController = require('../controller/homeController')
const PhRoutes = require('./phRoutes')
const MoviesRoutes = require('./movieRoutes')
const CastRoutes = require('./castRoutes')

routes.get('/', HomeController.getHome)
routes.use('/ph', PhRoutes)
routes.use('/movies', MoviesRoutes)
routes.use('/cast', CastRoutes)


module.exports = routes

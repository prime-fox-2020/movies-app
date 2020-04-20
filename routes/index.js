const routes = require('express').Router()
const HomeController = require('../controller/homeController')
const PhRoutes = require('./phRoutes')
const MoviesRoutes = require('./movieRoutes')

routes.get('/', HomeController.getHome)
routes.use('/ph', PhRoutes)
routes.use('/movies', MoviesRoutes)


module.exports = routes

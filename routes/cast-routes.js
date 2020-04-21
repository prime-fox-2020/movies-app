const express = require('express')
const routes = express.Router()
const ControllerCast = require('../controller/controllerCast.js')

routes.get('/casts',ControllerCast.findAll)
routes.get('/casts/add',ControllerCast.add)
routes.post('/casts/add',ControllerCast.addPost)
routes.get('/casts/edit/:id',ControllerCast.edit)
routes.post('/casts/edit/:id',ControllerCast.editPost)
routes.get('/casts/delete/:id',ControllerCast.delete)
routes.get('/casts/seemovies/:id',ControllerCast.seeMovie)

module.exports = routes
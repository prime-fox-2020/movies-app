const routers = require('express').Router()
const CastController = require('../controllers/castController')

routers.get('/', CastController.showCasts)
routers.get('/add', CastController.addCast)
routers.post('/add', CastController.addCastPost)
routers.get('/edit/:id', CastController.editCast)
routers.post('/edit/:id', CastController.editCastPost)
// routers.get('/delete/:id', MovieController.deleteMovie)

module.exports = routers
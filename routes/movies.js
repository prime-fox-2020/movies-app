'use strict'

const router  = require('express').Router()
const movie   = require('../controllers/movies') 

router.get('/',     movie.getMovies)
router.get('/add',  movie.addGetMovie)
router.post('/add',  movie.addPostMovie)
router.get('/:id/edit',  movie.editGetMovie)
router.post('/:id/edit',  movie.editPostMovie)
router.get('/:id/delete',  movie.deleteMovie)

module.exports = router
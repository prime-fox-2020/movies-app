const router = require('express').Router()
const {ProductionHouse, Movie, Cast} = require('../controllers')

router.get('/', (request, response) => {
    response.render('index')
})

router.get('/productionhouses', ProductionHouse.show)

router.get('/movies', Movie.show)
router.get('/movies/add', Movie.new)
router.get('/movies/edit/:movieid', Movie.edit)
router.get('/casting/add/:movieid', Movie.casting)
router.get('/movies/delete/:movieid', Movie.deleteMovie)

router.get('/casts', Cast.show)
router.get('/casts/add', Cast.new)
router.get('/casts/edit/:castid', Cast.edit)
router.get('/casts/:castid/movies', Cast.currentMovies)
router.get('/casts/delete/:castid', Cast.deleteCast)


router.post('/movies/add', Movie.create)
router.post('/movies/update/:movieid', Movie.update)

router.post('/casts/update/:castid', Cast.update)
router.post('/casts/add', Cast.create)
router.post('/casting/add/:movieid', Movie.saveCasting)

module.exports = router;

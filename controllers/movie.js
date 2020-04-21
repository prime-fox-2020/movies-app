const { Movie, ProductionHouse, Cast, MovieCast } = require('../models');

class MovieController {
    static showAll(req, res){
        Movie.findAll({
            attributes: ['id', 'name', 'released_year', 'genre', 'ProductionHouseId'],
            order: [
                ['released_year', 'DESC']
            ],
            include: ProductionHouse
        })
        .then(data => {
            res.render('list-of-movies', {data, title: 'List of Movies', nav: 'movie'})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showForm(req, res){
        res.render('add-movie-form', { title: 'Add New Movie', nav: 'movie'})
    }

    static addProcess(req, res){
        Movie.create({
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre
        })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static deleteProcess(req, res){
        Movie.destroy({
            where: {
              id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.send(err)   
        })
    }

    static showEdit(req, res){
        let ph, movie
        ProductionHouse.findAll()
        .then((data) => {
            ph = data
            return Movie.findOne({
                where: {
                  id: req.params.id
                },
                include: ProductionHouse
            })
        })
        .then((data) => {
            movie = data
            res.render('edit-movie-form', { movie, ph, title: 'Edit Movie', nav: 'movie' })
        })
        .catch(err => {
            res.send(err)   
        })
    }

    static editProcess(req, res){
        Movie.update(
            { 
                name: req.body.name,
                released_year: req.body.released_year,
                genre: req.body.genre,       
                ProductionHouseId: req.body.ph    
            }, 
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showAddCast(req, res){
        let error = req.query
        let movie, castList
        Movie.findOne({
            where: {
              id: req.params.id
            },
            include: [Cast]
        })
        .then((data) => {
            movie = data
            return Cast.findAll()
        })
        .then((data) => {
            castList = data
            res.render('add-cast-in-movie', {movie, castList, error, title: 'Add Cast in Movie', nav: 'movie'})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static addCastProcess(req, res){
        MovieCast.create({
            CastId: req.body.cast,
            MovieId: req.params.id,
            role: req.body.role
        })
        .then(() => {
            res.redirect(`/movies/add-cast/${req.params.id}`)
        })
        .catch(err => {
            // const errors = []
            // for(let i = 0; i < err.length; i++){
            //     errors.push(err.errors[i].message)
            // }
            res.redirect(`/movies/add-cast/${req.params.id}?error=${err.errors[0].message}`)
            // res.send(err)
        })
    }
}

module.exports = MovieController
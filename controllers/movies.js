const { Movie , ProductionHouse, Cast, MovieCast } = require('../models')

class Movies {
    static showData (req, res) {
        Movie.findAll({
            order : [
                ['name', 'asc']
            ],
            include : [{model :ProductionHouse}]
        })
        .then(data => {
            res.render('movie.ejs', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addForm(req, res) {
        ProductionHouse.findAll()
        .then(data => {
            res.render('addMovie.ejs', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addPost(req, res) {
        Movie.create({
            name : req.body.name,
            released_year : req.body.released_year,
            genre : req.body.genre,
            ProductionHouseId : req.body.ProductionHouseId,
            rating : req.body.rating
        })
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editForm(req, res) {

        let dataByPk
        let idParams = Number(req.params.id)

        ProductionHouse.findAll()
        .then(data => {
            dataByPk = data
            return Movie.findByPk(idParams)
        })
        .then(data => {
            res.render('editMovie.ejs', {data, dataByPk})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editPost(req, res) {
        Movie.update({
            name : req.body.name,
            released_year : req.body.released_year,
            genre : req.body.genre,
            ProductionHouseId : req.body.ProductionHouseId,
            rating : req.body.rating
        }, {
            where : {
                id : req.params.id
            }
        })
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static delete(req, res) {
        Movie.destroy({
            where : {
                id : Number(req.params.id)
            }
        })
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static addCastMovieForm(req, res) {
        let movies = null
        let data = null

        Movie.findOne({
            where : {
                id: req.params.id
            }   
        }, {include: [Cast]})
        .then(data => {
            movies = data
            return Cast.findAll()
        })
        .then(casts => {
            data = casts
            res.render('addCastMovie.ejs', {movies, data})
        } )
        .catch(err => {
            res.send(err)
        })
    }

    static addCastMoviePost(req, res) {
        let movieCast = {
            MovieId : req.params.id,
            CastId : req.body.CastId,
            role : req.body.role
        }

        MovieCast.create(movieCast)
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.redirect('/movies')
        })
    }
}

module.exports = Movies
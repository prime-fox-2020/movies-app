const { Movie } = require('../models');
const { ProductionHouse } = require('../models');

class MovieController{
    static show(req, res){
        Movie.findAll({
            order: [
                ['released_year', 'desc']
            ],
            include: [{model: ProductionHouse}]
        })
        .then(data => {
            res.render('movies', {movies: data})
            // res.send(data)
        })
        .catch(err => {
            res.render('error', {error: err})
        })
    }

    static getAdd(req, res){
        res.render('add-movie')
    }

    static add(req, res){
        Movie.create({
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre
        })
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.render('error', {error: err})
        })
    }

    static getEdit(req, res){
        Movie.findByPk(Number(req.params.id))
        .then(data => {
            res.render('edit-movie', {movies: data})
        })
        .catch(err => {
            res.render('error', {error: err})
        })
    }

    static update(req, res){
        Movie.update(
        {
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre,
            ProductionHouseId: req.body.productionHouse,
        }, {
            where: {
                id: req.body.movieId
            }
        })
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.render('error', {error: err})
        })
    }

    static delete(req, res){
        Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.render('error', {error: err})
        })
    }
}

module.exports = MovieController
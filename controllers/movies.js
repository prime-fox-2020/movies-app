const { Movie } = require('../models');

class MovieController{
    static show(req, res){
        Movie.findAll({
            order: [
                ['released_year', 'desc']
            ]
        })
        .then(data => {
            res.render('movies', {movies: data})
        })
        .catch(err => {
            res.send(err)
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
            res.send(err)
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
            res.send(err)
        })
    }
}

module.exports = MovieController
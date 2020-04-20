const Movie = require('../models').Movie

class MovieController {
    static show(req, res){
        Movie.findAll({
            order: [
                ['released_year', 'DESC']
              ]
        }).then(data => {
            // res.send(data)
            res.render('movies', {data})
        })
    } 

    static addMovieForm(req, res) {
        // res.send('yes')
        res.render('addMovieForm')
    }

    static addMovie(req, res) {
        Movie.create({
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre
        }).then(data =>{
            res.redirect('/movies')
        })
    }

    static editMovieForm(req, res){
        Movie.findByPk(req.params.id).then(data => {
            // res.send(data)
            res.render('editmovieform', {data})
        })
    }

    static delete(req, res){
        Movie.destroy({
            where:{
                id: Number(req.params.id)
            }
        }).then(data =>{
            res.redirect('/movies')
        }).catch(err => {
            res.send(err)
        })
    }
}

module.exports = MovieController
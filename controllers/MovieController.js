const Movie = require('../models').Movie
const ProductionHouse = require('../models').ProductionHouse

class MovieController {
    static show(req, res) {
        Movie.findAll({
            order: [
                ['released_year', 'DESC']
            ],
            include: [{ model: ProductionHouse }]
        }).then(data => {
            // res.send(data)
            res.render('movies', { data })
        })
    }

    static addMovieForm(req, res) {
        // res.send('yes')
        res.render('addMovieForm')
    }

    static addMovie(req, res) {
        Movie.create({
            name: req.body.name,
            released_year: Number(req.body.released_year),
            genre: req.body.genre
        }).then(data => {
            res.redirect('/movies')
        })
    }

    static editMovieForm(req, res) {
        Movie.findByPk(req.params.id).then(data => {
            // res.send(data)
            res.render('editmovieform', { data })
        })
    }

    static editMovie(req, res) {
        // console.log(req.body);
        // res.send(req.body)
        Movie.update({
            name: req.body.name,
            released_year: Number(req.body.released_year),
            genre: req.body.genre,
            ProductionHouseId: Number(req.body.ProductionHouseId),
        }, {
            where:{
                id: req.params.id
            }
        }).then(data =>{
            res.redirect('/movies')
        }).catch(err =>{
            res.send(err)
        })

    }

    static delete(req, res) {
        Movie.destroy({
            where: {
                id: Number(req.params.id)
            }
        }).then(data => {
            res.redirect('/movies')
        }).catch(err => {
            res.send(err)
        })
    }
}

module.exports = MovieController
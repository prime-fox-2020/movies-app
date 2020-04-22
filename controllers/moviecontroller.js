const Movie = require('../models').Movie
const ProductionHouse = require('../models').ProductionHouse

class MovieController {
    static show (req, res){
        Movie.findAll(
            {order: [['released_year', 'desc']], include: [{model: ProductionHouse}]}
        )
        .then(data => {
            res.render('viewmovies', { data })
            // res.send(data[0].ProductionHouse.name_prodHouse)
        }).catch(err => {
            res.send(err)
        })
    }

    static showAdd (req, res){
        res.render('addmovies')
    }

    static add (req, res){
        Movie.create({
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre
        }).then(data => {
            res.redirect('/movies')
        }).catch(err => {
            res.send(err)
        })
    }

    static showEdit (req, res){
        Movie.findByPk(req.params.id)
        .then(data => {
            res.render('editmovies', { data })
            // res.send(data)
        }).catch(err => {
            res.send(err)
        })
    }

    static edit (req, res){
        Movie.update(req.body, {
            where: {id: req.params.id}
        }).then(data => {
            res.redirect('/movies')
        }).catch(err => {
            res.send(req.body)
        })
    }

    static delete (req, res){
        Movie.destroy({
            where: {id:req.params.id}
        }).then(data => {
            res.redirect('/movies')
        }).catch(err => {
            res.send(err)
        })
    }
}

module.exports = MovieController
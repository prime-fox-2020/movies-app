const { Movie } = require('../models');

class MovieController {
    static showAll(req, res){
        Movie.findAll({
            attributes: ['id', 'name', 'released_year', 'genre', 'ProductionHouseId'],
            order: [
                ['released_year', 'DESC']
            ]
        })
        .then(data => {
            res.render('list-of-movies', {data, title: 'List of Movies', nav: 'movie'})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showForm(req, res){
        res.render('add-form', { title: 'Add New Movie', nav: 'movie'})
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
        Movie.findByPk(req.params.id)
        .then((data) => {
            res.render('edit-form', { data, title: 'Edit Movie', nav: 'movie' })
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
                genre: req.body.genre                
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
}

module.exports = MovieController
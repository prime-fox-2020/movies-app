const movieModel = require('../models').Movie
const phModel = require('../models').ProductionHouse
const castModel = require('../models').Cast
const movieCastModel = require('../models').MovieCast

class MovieControl {
    static getList (req, res) {
        movieModel.findAll({
            include: [{
                model: phModel
            }],
            order: [[
                'released_year', 'DESC'
            ]]
        })
        .then(data => {
            console.log(data)
            res.render('movie.ejs', {data})
        })
        .catch(err => {
            res.send(err, 'Cannot find movie data')
        })
    }
    static add (req, res) {
        const error = req.query.error
        res.render('addMovie.ejs', {error})
    }
    static postAdd (req, res) {
        movieModel.create(req.body)
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            let error  = []
            for (let i = 0; i < err.errors.length; i++) {
                error.push(err.errors[i].message)
            }
            res.redirect(`/movies/addMovie/?error=${error.join('')}`)
        })
    }

    static edit (req, res) {
        let movie;
        movieModel.findByPk(Number(req.params.id))
        .then(data => {
            movie = data.dataValues
            return phModel.findAll().then(data => {
                console.log(data)
                res.render('edit.ejs', {movie, data})
            })
        })
        .catch (err => {
            res.send(err, 'unable to edit')
        })
    }
    
    static postEdit (req, res) {
        movieModel.update({
            name : req.body.name,
            released_year : req.body.released_year,
            genre : req.body.genre,
            released_year: req.body.released_year,
            ProductionHouseId : req.body.productionHouse
        }, {
            where : {
                id : req.params.id
            }
        })
        .then (data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.send(err, 'Something went wrong')
        })
    }

    static delete (req, res) {
        movieModel.destroy({ where  : {id: req.params.id}})
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.send(err, 'Cannot delete movie')
        })
    }

    static addCast (req, res) {
        let movie;
        let cast;
        movieModel.findByPk(Number(req.params.id))
        .then(data => {
            movie = data.dataValues
            return castModel.findAll().then(data => {
                cast = data
                return movieCastModel.findAll().then(data => {
                    res.render('addCastToMovie.ejs', {movie, cast, data})
                })
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                res.send(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    static postAddCast (req, res) {
        // console.log(req.body)
        movieCastModel.create({
            MovieId : req.params.id,
            CastId : req.body.actor,
            role: req.body.role
        })
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = MovieControl;
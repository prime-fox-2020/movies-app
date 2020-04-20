const movieModel = require('../models').Movie
const phModel = require('../models').ProductionHouse

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
            res.render('movie.ejs', {data})
        })
        .catch(err => {
            res.send(err, 'Cannot find movie data')
        })
    }
    static add (req, res) {
        res.render('addMovie.ejs')
    }
    static postAdd (req, res) {
        movieModel.create(req.body)
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.send(err, 'Cannot get to here')
        })
    }

    static edit (req, res) {
        let movie;
        movieModel.findByPk(Number(req.params.id))
        .then(data => {
            // console.log(data.dataValues)
            movie = data.dataValues
            return phModel.findAll().then(data => {
                console.log(data)
                res.render('edit.ejs', {movie, data})
            })
            // res.render('edit.ejs', {
            //     paramId: req.params.id,
            //     data : data.dataValues
            // })
        })
        .catch (err => {
            res.send(err, 'unable to edit')
        })
    }
    
    static postEdit (req, res) {
        // console.log(req.params.id)
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
            res.send(err, 'Please check again')
        })
    }

    static delete (req, res) {
        movieModel.destroy({ where  : {id: req.params.id}})
        .then(data => {
            res.redirect('/movies')
        })
        .catch(err => {
            res.send(err, 'Unable to delete movie')
        })
    }
}

module.exports = MovieControl;
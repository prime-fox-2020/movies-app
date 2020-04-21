const Movie = require('../models').Movies
const ProductionHouse = require('../models').ProductionHouse
const MovieCast = require('../models').MovieCast
const Cast = require('../models').Cast

class MoviesController {
    static show(req, res) {
        Movie.findAll({
            include: [{ model: ProductionHouse }],
            order: [['id', 'ASC']]
        })
            .then(data => {
                // console.log(data);
                res.render('movie', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addGet(req, res) {
        let error = req.query.error
        ProductionHouse.findAll({
            order: [['name_prodHouse', 'ASC']]
        })
            .then(data => {
                res.render('add', { data , error})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addPost(req, res) {
        Movie.create({
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre,
            ProductionHouseId: Number(req.body.prodHouseId)
        })
            .then(data => {
                res.redirect('/movies')
            })
            .catch(err => {
                res.send(err);
                res.redirect(`/movies/add/?error=${err.errors[0].message}`)
            })
    }

    static editGet(req, res) {
        let data = []
        let error = req.query.error
        ProductionHouse.findAll({ order: [['name_prodHouse', 'ASC']] })
            .then(prodHouse => {
                data = prodHouse
                // console.log(prodHouse[0].dataValues);
                return Movie.findByPk(req.params.id)
            })
            .then(selected => {
                res.render('edit', {data, selected, error})
            })
            .catch(err => res.send(err))
    }

    static editPost(req,res){
        Movie.update({
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre,
            ProductionHouseId: Number(req.body.prodHouseId)
        }, {
            where: { id: req.params.id }
        })
            .then(data => {
                res.redirect('/movies')
            })
            .catch(err => {
                res.redirect(`/movies/edit/${req.params.id}?error=${err.errors[0].message}`)
            })
    }

    static deleteMovie(req, res) {
        Movie.destroy(
            { where: { id: req.params.id } }
        )
            .then(data => {
                res.redirect('/movies')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addCastGet(req,res){
        let data = []
        let error = req.query.error
        Cast.findAll({ order: [['id', 'ASC']] })
            .then(cast => {
                data = cast
                // console.log(prodHouse[0].dataValues);
                return Movie.findByPk(req.params.id,{include: [{ model: Cast }]})
            })
            .then(selected => {
                // console.log(selected.dataValues.id);
                // console.log('---------------------------');
                // console.log(data[0].id);
                // res.send(data);
                res.render('addCast', { data , selected, error })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addCastPost(req,res){
        // console.log(req.params.id);
        // console.log(req.body);
        MovieCast.create({
            MovieId: req.params.id,
            CastId: req.body.actor,
            role: req.body.role
        })
            .then(data => {
                res.redirect('/movies/')
            })
            .catch(err => {
                res.redirect(`/movies/addCast/${req.params.id}?error=${err.errors[0].message}`)
            })
    }
}
module.exports = MoviesController
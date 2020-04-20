const Movie = require('../models').Movies
const ProductionHouse = require('../models').ProductionHouse

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
        ProductionHouse.findAll({
            order: [['name_prodHouse', 'ASC']]
        })
            .then(data => {
                res.render('add', { data })
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
                res.send(err)
            })
    }

    static editGet(req, res) {
        let data = []
        ProductionHouse.findAll({ order: [['name_prodHouse', 'ASC']] })
            .then(prodHouse => {
                data = prodHouse
                console.log(prodHouse[0].dataValues);
                return Movie.findByPk(req.params.id)
            })
            .then(selected => {
                res.render('edit', {data, selected})
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
                res.send(err)
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
}
module.exports = MoviesController
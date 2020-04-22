const { Movie, ProductionHouse, Cast, MovieCast } = require('../models');

class Controller {
    static showData(req, res) {
        Movie.findAll({ order: [['released_year', 'DESC']], include: [{ model: ProductionHouse }] })
            .then(data => {
                res.render('movie', { data, alert: req.query.mes });
            })
            .catch(err => {
                res.render('error', { err });
            })
    }

    static addData(req, res) {
        const data = { name: '', released_year: '', genre: '' };
        ProductionHouse.findAll({ order: [['name_prodHouse', 'ASC']] })
            .then(data2 => {
                res.render('inputMovie', { title: 'Add Movie', data, data2, alert: req.query.mes });
            })
            .catch(err => {
                res.render('error', { err });
            })
    }

    static editData(req, res) {
        let data = null;
        Movie.findByPk(req.params.id)
            .then(dataMovie => {
                data = dataMovie;
                return ProductionHouse.findAll({ order: [['name_prodHouse', 'ASC']] })
            })
            .then(data2 => {
                res.render('inputMovie', { title: 'Edit Movie', data, data2, alert: req.query.mes });
            })
            .catch(err => {
                res.render('error', { err });
            })
    }

    static addPost(req, res) {
        const data = req.body;
        let data2 = null;
        ProductionHouse.findAll({ order: [['name_prodHouse', 'ASC']] })
            .then(dataPH => {
                data2 = dataPH;
                return Movie.create({
                    name: data.name,
                    released_year: data.released_year,
                    genre: data.genre,
                    ProductionHouseId: data.ProductionHouseId
                })
            })
            .then(data => {
                res.redirect('/movies?mes=Create Data Success');
            })
            .catch(err => {
                res.render('inputMovie', { title: data.act, data, data2, alert: err.errors[0].message });
            })
    }

    static editPost(req, res) {
        const data = req.body;
        let data2 = null;
        ProductionHouse.findAll({ order: [['name_prodHouse', 'ASC']] })
            .then(dataPH => {
                data2 = dataPH;
                return Movie.update({
                    name: data.name,
                    released_year: data.released_year,
                    genre: data.genre,
                    ProductionHouseId: data.ProductionHouseId
                }, {where: {id: req.params.id}})
            })
            .then(data => {
                res.redirect('/movies?mes=Update Data Success');
            })
            .catch(err => {
                res.render('inputMovie', { title: data.act, data, data2, alert: err.errors[0].message });
            })
    }

    static delete(req, res) {
        Movie.destroy({ where: { id: req.params.id } })
            .then(data => {
                res.redirect(`/movies?mes= Delete data with id ${req.params.id} success`);
            })
            .catch(err => {
                res.render('error', { err });
            });
    }

    static addCast(req, res) {
        let data = null;
        Movie.findOne({ where: { id: req.params.id }, include: [{ model: Cast }] })
            .then(dataMovie => {
                data = dataMovie;
                return Cast.findAll({ order: [['first_name', 'ASC']] })
            })
            .then(data2 => {
                res.render('inputMovieCast', { data, data2, title: 'Add Movie Cast', alert: req.query.mes });
            })
            .catch(err => {
                res.render('error', { err });
            })
    }

    static castPost(req, res) {
        let data = req.body, data2 = null;
        Cast.findAll({ order: [['first_name', 'ASC']] })
            .then(dataCast => {
                data2 = dataCast;
                return MovieCast.create({
                    CastId: data.CastId,
                    MovieId: req.params.id,
                    role: data.role
                })
            })
            .then(data => {
                res.redirect('/movies?mes=Add Cast Success')
            })
            .catch(err => {
                res.render('inputMovieCast', { data, data2, title: 'Add Movie Cast', alert: err.errors[0].message })
            })
    }
}

module.exports = Controller;
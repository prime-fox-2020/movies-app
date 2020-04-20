const { Movie, ProductionHouse } = require('../models');

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
        res.render('inputMovie', { title: 'Add Movie', data, alert: req.query.mes });
    }

    static editData(req, res) {
        Movie.findOne({ where: { id: req.params.id } })
            .then(data => {
                ProductionHouse.findAll({order: [['name_prodHouse', 'ASC']]})
                .then(data2 => {
                    res.render('inputMovie', { title: 'Edit Movie', data, data2, alert: req.query.mes });
                })
                .catch(err => {
                    res.render('error', { err });
                });
            })
            .catch(err => {
                res.render('error', { err });
            })
    }

    static postData(req, res) {
        const data = req.body;
        if (data.name == '') res.render('inputMovie', { title: data.act, data, alert: 'Input movie name' });
        else if (data.released_year == '') res.render('inputMovie', { title: data.act, data, alert: 'Input released year' });
        else if (data.released_year < 1500 || data.released_year > 2020) res.render('inputMovie', { title: data.act, data, alert: 'Invalid year' });
        else if (data.genre == '') res.render('inputMovie', { title: data.act, data, alert: 'Choose genre' });
        else {
            if (data.act[0] == 'A') {
                Movie.create({
                    name: data.name,
                    released_year: data.released_year,
                    genre: data.genre,
                })
                    .then(data => {
                        res.redirect('/movies?mes=Create Data Success');
                    })
                    .catch(err => {
                        res.render('error', { err });
                    });
            }
            else {
                Movie.update({
                    name: data.name,
                    released_year: data.released_year,
                    genre: data.genre,
                    ProductionHouseId: data.ProductionHouseId
                }, {where: {id: req.params.id}})
                    .then(data => {
                        res.redirect('/movies?mes=Update Data Success');
                    })
                    .catch(err => {
                        res.render('error', { err });
                    });
            }
        }
    }

    static delete(req, res) {
        Movie.destroy({where: {id: req.params.id}})
        .then( data => {
            res.redirect(`/movies?mes= Delete data with id ${req.params.id} success`);
        })
        .catch(err => {
            res.render('error', { err });
        });
    }
}

module.exports = Controller;
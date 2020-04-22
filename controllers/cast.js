const { Cast, Movie } = require('../models');
const age = require('../helpers/age');

class Controller {
    static showData(req, res) {
        Cast.findAll({ order: [['first_name', 'ASC']] })
            .then(data => {
                res.render('cast', { data, alert: req.query.mes });
            })
            .catch(err => {
                res.render('error', { err });
            })
    }

    static addData(req, res) {
        const data = { first_name: '', last_name: '', birth_year: '', phone_number: '', gender: '' };
        res.render('inputCast', { title: 'Add Cast', data, alert: req.query.mes });
    }

    static editData(req, res) {
        Cast.findByPk(req.params.id)
            .then(data => {
                res.render('inputCast', { title: 'Edit Cast', data, alert: req.query.mes });
            })
            .catch(err => {
                res.render('error', { err });
            })
    }

    static addPost(req, res) {
        const data = req.body;
        Cast.create({
            first_name: data.first_name,
            last_name: data.last_name,
            birth_year: data.birth_year,
            gender: data.gender,
            phone_number: data.phone_number
        })
            .then(data => {
                res.redirect('/casts?mes=Create Data Success');
            })
            .catch(err => {
                res.render('inputCast', { title: data.act, data, alert: err.errors[0].message });
            });
    }

    static editPost(req, res) {
        const data = req.body;
        Cast.update({
            first_name: data.first_name,
            last_name: data.last_name,
            birth_year: data.birth_year,
            gender: data.gender,
            phone_number: data.phone_number
        }, {where: {id: req.params.id}, individualHooks: true})
            .then(data => {
                res.redirect('/casts?mes=Update Data Success');
            })
            .catch(err => {
                res.render('inputCast', { title: data.act, data, alert: err.errors[0].message });
            });
    }

    static delete(req, res) {
        Cast.destroy({ where: { id: req.params.id } })
            .then(data => {
                res.redirect(`/casts?mes= Delete data with id ${req.params.id} success`);
            })
            .catch(err => {
                res.render('error', { err });
            });
    }

    static seeMovies(req, res) {
        let data = null;
        Cast.findOne({ where: { id: req.params.id }, include: [{ model: Movie }] })
            .then(data => {
                res.render('seeMovies', { data, age });
            })
            .catch(err => {
                res.render('error', { err });
            })
    }
}

module.exports = Controller;
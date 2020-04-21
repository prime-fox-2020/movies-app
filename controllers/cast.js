const { Cast } = require('../models');

class Controller {
    static showData(req, res) {
        Cast.findAll({ order: [['first_name', 'ASC']]})
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
        if (data.first_name == '') res.render('inputCast', { title: data.act, data, alert: 'Input first name' });
        else if (data.birth_year == '') res.render('inputCast', { title: data.act, data, alert: 'Input birth year' });
        else if (data.birth_year < 1500 || data.birth_year > 2020) res.render('inputCast', { title: data.act, data, alert: 'Invalid year' });
        else if (data.gender == null) res.render('inputCast', { title: data.act, data, alert: 'Choose gender' });
        else if (data.phone_number == '') res.render('inputCast', { title: data.act, data, alert: 'Input Phone Number' });
        else {
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
                    res.render('error', { err });
                });
        }
    }

    static editPost(req, res) {
        const data = req.body;
        if (data.first_name == '') res.render('inputCast', { title: data.act, data, alert: 'Input first name' });
        else if (data.birth_year == '') res.render('inputCast', { title: data.act, data, alert: 'Input birth year' });
        else if (data.birth_year < 1500 || data.birth_year > 2020) res.render('inputCast', { title: data.act, data, alert: 'Invalid year' });
        else if (data.gender == null) res.render('inputCast', { title: data.act, data, alert: 'Choose gender' });
        else if (data.phone_number == '') res.render('inputCast', { title: data.act, data, alert: 'Input Phone Number' });
        else {
            Cast.update({
                first_name: data.first_name,
                last_name: data.last_name,
                birth_year: data.birth_year,
                gender: data.gender,
                phone_number: data.phone_number
            }, {where: {id: req.params.id}})
                .then(data => {
                    res.redirect('/casts?mes=Update Data Success');
                })
                .catch(err => {
                    res.render('error', { err });
                });
        }
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
}

module.exports = Controller;
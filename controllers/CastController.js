const { Cast } = require('../models')

class CastController {
    static get(req, res) {
        Cast.findAll({
            order: [
                ['first_name', 'ASC']
            ]
        })
            .then(data => {
                return res.render('cast', { object: data })
            })
            .catch(err => {
                return res.render('error', { err: err })
            })
    }

    static add(req, res) {
        res.render('addCast')
    }

    static addPost(req, res) {
        Cast.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_year: req.body.birth_year,
            phone_number: req.body.phone_number,
            gender: req.body.gender
        })
            .then(data => {
                return res.redirect('/cast')
            })
            .catch(err => {
                return res.render('error', { err: err })
            })
    }

    static edit(req, res) {
        Cast.findByPk(req.params.id)
            .then((data) => {
                return res.render('editCast', { object: data });
            })
            .catch((err) => {
                return res.render('error', { err: err })
            });
    }

    static editPost(req, res) {
        Cast.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_year: req.body.birth_year,
            phone_number: req.body.phone_number,
            gender: req.body.gender
        }, {
            where: { id: Number(req.params.id) }
        })
            .then(data => {
                return res.redirect('/cast');
            })
            .catch(err => {
                return res.render('error', { err: err })
            })
    }

    static delete(req, res) {
        Cast.destroy({
            where: { id: Number(req.params.id) },
        })
            .then(data => {
                return res.redirect('/cast')
            })
            .catch(err => {
                return res.render('error', { err: err })
            })
    }
}


module.exports = CastController;
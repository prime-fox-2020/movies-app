const { Movie, Cast, ProductionHouse } = require('../models');

class CastCont {
    static show(req, res) {
        Cast.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
            .then((data) => {
                // console.log(data);
                // res.send (data)
                let msg = req.query.msg
                res.render('./cast/cast', { data, msg })
            }).catch((err) => {
                res.send(err)
            });
    }

    static addForm(req, res) {
        res.render('./cast/addFormCast')
    }

    static add(req, res) {
        // res.send(req.body);
        let newCast = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_year: req.body.birth_year,
            phone_number: req.body.phone_number,
            gender: req.body.gender
        }
        Cast.create(newCast)
            .then((data) => {
                res.redirect(`/cast?msg=Success add movie ${data.getFullName()}`)
            }).catch((err) => {
                res.send(err)
            });
    }
    static editForm(req, res) {
        Cast.findByPk(req.params.id)
            .then((data) => {
                // res.send({ data })
                res.render('./cast/editFormCast', { data })
            })
            .catch((err) => {
                res.send(err)
            });
    }
    static update(req, res) {
        let updatedCast = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_year: req.body.birth_year,
            phone_number: req.body.phone_number,
            gender: req.body.gender
        }
        Cast.update(updatedCast, {
            where: {
                id: req.params.id
            }
        })
            .then((data) => {
                res.redirect(`/cast?msg=Cast success updated`)
            }).catch((err) => {
                res.send(err)
            });
    }

    static delete(req, res) {
        Cast.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((data) => {
                // res.send(data)
                res.redirect(`/cast?msg=Success delete movies with id ${req.params.id}`)
            }).catch((err) => {
                res, send(err)
            });
    }
}

module.exports = CastCont

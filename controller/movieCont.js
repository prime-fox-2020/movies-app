const { Movie, ProductionHouse, Cast } = require('../models');

class MovieCont {
    static show(req, res) {
        Movie.findAll(
            {
                include: [ProductionHouse],
                order: [
                    ['name', 'DESC']
                ]
            }
        )
            .then((data) => {
                // res.send (data)
                let msg = req.query.msg
                res.render('movies', { data, msg })
            }).catch((err) => {
                res.send(err)
            });
    }
    static addForm(req, res) {
        ProductionHouse.findAll()
            .then((data) => {
                res.render('addFormMovie', { data })
            }).catch((err) => {
                res.send(err)
            });
    }
    static add(req, res) {
        console.log(req.body);
        Movie.create(req.body)
            .then((data) => {
                res.redirect(`/movies?msg=Success add movie ${req.body.name}`)
            }).catch((err) => {
                res.send(err)
            });
    }
    static editForm(req, res) {
        let data
        Movie.findByPk(req.params.id)
            .then((movie) => {
                data = movie
                return ProductionHouse.findAll()
            })
            .then((result) => {
                // res.send({ data, result })
                res.render('editFormMovie', { data, result })
            })
            .catch((err) => {
                res.send(err)
            });
    }
    static update(req, res) {
        console.log('req: ', req.body);

        Movie.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then((data) => {
                res.redirect(`/movies?msg=Movies success updated`)
            }).catch((err) => {
                res.send(err)
            });
    }

    static delete(req, res) {
        Movie.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((data) => {
                res.redirect(`/movies?msg=Success delete movies with id ${req.params.id}`)
            }).catch((err) => {
                res, send(err)
            });
    }

    static addCast(req, res) {
        let movie = null
        Movie.findByPk(req.params.id, { include: [Cast] })
            .then((data) => {
                movie = data
                // res.send(data)
                return Cast.findAll()
            })
            .then((data) => {
                // res.send({ movie, data })
                res.render('addCastToMovie',{movie, data})
            }).catch((err) => {
                res.send(err)
            });
    }

    static updateCast(req, res) {
        res.send(req.params.id, req.body)
    }
}

module.exports = MovieCont

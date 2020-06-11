const { Movie, ProductionHouse, Cast, MovieCast } = require('../models')

class MovieController {
    static get(req, res) {
        Movie.findAll({
            order: [
                ['released_year', 'DESC']
            ],
            include: [ProductionHouse]
        })
            .then(data => {
                return res.render('movie', { object: data })
            })
            .catch(err => {
                return res.render('error', { err: err })
            })
    }

    static add(req, res) {
        res.render('addMovie')
    }

    static addPost(req, res) {
        let check = Number(req.body.released_year)
        if (check % 4 == 0) {
            res.send('Cannot add movie, bad year')
        } else {
            Movie.create({
                name: req.body.name,
                released_year: req.body.released_year,
                genre: req.body.genre
            })
                .then(data => {
                    return res.redirect('/movie')
                })
                .catch(err => {
                    return res.render('error', { err: err })
                })
        }
    }

    static edit(req, res) {
        let movie;
        Movie.findByPk(req.params.id)
            .then((data) => {
                movie = data
                return ProductionHouse.findAll()
            })
            .then((data) => {
                return res.render('editMovie', { object: movie, object2: data });
            })
            .catch((err) => {
                return res.render('error', { err: err })
            });
    }

    static editPost(req, res) {
        Movie.update({
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre,
            ProductionHouseId: req.body.ProductionHouseId
        }, {
            where: { id: Number(req.params.id) }
        })
            .then(data => {
                return res.redirect('/movie');
            })
            .catch(err => {
                return res.render('error', { err: err })
            })
    }

    static delete(req, res) {
        Movie.destroy({
            where: { id: Number(req.params.id) },
        })
            .then(data => {
                return res.redirect('/movie')
            })
            .catch(err => {
                return res.render('error', { err: err })
            })
    }

    static addCast(req, res) {
        let data2;
        Movie.findByPk(req.params.id, {
            include: [Cast]
        })
            .then((data) => {
                data2 = data;
                return Cast.findAll()
            })
            .then((data) => {
                // res.send({ object: data, object2: data2 })
                return res.render('addMovieCast', { object: data, object2: data2 });
            })
            .catch(err => {
                return res.render('error', { err: err })
            })
    }

    static addCastPost(req, res) {
        if (!req.body.role) {
            res.send('Isi Rolenya')
        } else {
            MovieCast.create({
                MovieId: req.params.id,
                CastId: req.body.CastId,
                role: req.body.role
            })
                .then(data => {
                    return res.redirect(`/movie/addCast/${req.params.id}`)
                })
                .catch(err => {
                    return res.render('error', { err: err })
                })
        }
    }
}


module.exports = MovieController;
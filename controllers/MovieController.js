const { Movie, ProductionHouse } = require('../models')

class MovieController {
    static get(req, res) {
        Movie.findAll({ include: [ProductionHouse] })
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
        // Movie.findOne({
        //     where: { id: Number(req.params.id) }
        // })
        //     .then(data => {
        //         // return res.send({object: data})
        //         return res.render('editMovie', { object: data });
        //     })
        //     .catch(err => {
        //         return res.render('error', { err: err })
        //     })
    }

    static editPost(req, res) {
        Movie.update(req.body,
            // name: req.body.name,
            // released_year: req.body.released_year,
            // genre: req.body.genre,
            // ProductionHouseId: req.body.ProductionHouseId
            {
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
}


module.exports = MovieController;
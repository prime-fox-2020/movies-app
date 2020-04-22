const {Cast, Movie, MovieCast} = require('../models')
const age = require('../helper/age')


class CastControl {
    static getHome (req, res) {
        Cast.findAll()
        .then(data => {
            res.render('cast.ejs', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }
    static add (req, res) {
        res.render('addCast.ejs')
    }
    static postAdd (req, res) {
        // res.send(req.body)
        // console.log(req.body)
        Cast.create(req.body)
        .then(data => {
            // res.send(req.body)
            // console.log(Cast.getFullName)
            // Cast.getFullName
            // res.send(data.getFullName)
            res.redirect('/cast')
        })
        .catch(err => {
            console.log(err)
        })
    }

    static edit(req, res) {
        let cast;
        Cast.findByPk(Number(req.params.id))
        .then(data => {
            cast = data.dataValues
            return Cast.findAll().then(data => {
                res.render('editCast.ejs', {cast, data})
            })
        })
    }

    static postEdit(req, res) {
        Cast.update({
            first_name : req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            birth_year: req.body.birth_year,
            gender: req.body.gender
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.redirect('/cast')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static delete (req, res) {
        Cast.destroy({where : {id: req.params.id}})
        .then(data => {
            res.redirect('/cast')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static seeMovies (req, res) {
        Cast.findAll({
            where: {
                id: req.params.id
            },
            include: [{model: Movie}]
        })
        .then(data => {
            console.log(data[0].getFullName(), data[0], age)
            res.render('seeMovies.ejs', {cast: data[0], age})
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = CastControl
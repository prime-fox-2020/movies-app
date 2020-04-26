const { Cast ,Movie, MovieCast} = require('../models')
const getAgeCast = require('../helper/ageCast')

class Casts {   
    static showData (req, res) {
        Cast.findAll()
        .then(data => {
            res.render('cast.ejs', {data})
        })
        .catch (err => {
            res.send(data)
        })
    }

    static addForm(req, res) {
        res.render('addCast.ejs')
    }

    static addPost(req, res) {
        Cast.create({
            first_name :req.body.first_name,
            last_name : req.body.last_name,
            birth_year : req.body.birth_year,
            phone_number : req.body.phone_number,
            gender : req.body.gender
        })
        .then(data => {
            res.redirect('/casts')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editGet(req, res) {
        Cast.findByPk(Number(req.params.id))
        .then(data => {
            res.render('editCast.ejs', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editPost(req, res) {
        Cast.update({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            birth_year : req.body.birth_year,
            phone_number : req.body.phone_number,
            gender : req.body.gender,
        }, {
            where : {
                id : req.params.id
            }
        })
        .then(data => {
            res.redirect('/casts')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static delete(req, res) {
        Cast.destroy({
            where : {
                id : Number(req.params.id)
            }
        })
        .then(data => {
            res.redirect('/casts')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showMovies(req, res) {
        Cast.findByPk(Number(req.params.id), {
            include: [Movie]
        })
        .then(data => {
            res.render('showMovies.ejs', { object: data, getAgeCast })
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Casts
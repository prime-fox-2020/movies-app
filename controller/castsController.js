const Cast = require('../models').Cast
const Movies = require('../models').Movies
const AgeWhenReleased  = require('../ageWhenReleased')

class CastsController {
    static show(req, res) {
        Cast.findAll({
            order: [['id', 'ASC']]
        })
            .then(data => {
                // console.log(data);
                res.render('cast', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addGet(req, res) {
        res.render('castAddForm')
    }

    static addPost(req, res) {
        // console.log(req.body);
        Cast.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_year: Number(req.body.birth_year),
            phone_number: req.body.phone_number,
            gender: req.body.gender
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
            .then(selected => {
                // console.log(selected);
                res.render('castEditForm', {selected})
            })
            .catch(err => res.send(err))
    }

    static editPost(req,res){
        Cast.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birth_year: Number(req.body.birth_year),
            phone_number: req.body.phone_number,
            gender: req.body.gender
        }, {
            where: { id: req.params.id }
        })
            .then(data => {
                res.redirect('/casts')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static deleteCasts(req, res) {
        Cast.destroy(
            { where: { id: req.params.id } }
        )
            .then(data => {
                res.redirect('/casts')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static seeMovies(req, res) {
        Cast.findByPk(req.params.id,{
            include: [{ model: Movies }],
            order: [['id', 'ASC']]
        })
        .then(data => {
            // res.send(data.Movies);
            res.render('actorPage', { data, AgeWhenReleased })
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = CastsController
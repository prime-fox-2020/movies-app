const {Cast, MovieCast, Movie} = require('../models');
const helper = require('../helpers/calculateAge');

class CastController {
    static show(req, res){
        Cast.findAll({
            order: [
                ['id', 'asc']
            ]
        })
        .then(data => {
            res.render('casts', {casts: data, alert: req.query})
        })
        .catch(err => {
            res.render('error', {error: err})
        })
    }

    static getAdd(req, res){
        const error = req.query
        res.render('add-cast', {error})
    }

    static add(req, res){
        Cast.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            birth_year: req.body.birth_year,
            gender: req.body.gender
        })
        .then(data => {
            const message = `New cast with name ${req.body.first_name} ${req.body.last_name} has been added.`
            res.redirect(`/casts?message=${message}&type=success`)
        })
        .catch( err => {
            const msg = []
            for(let i = 0; i < err.errors.length; i++){
                msg.push(err.errors[i].message)
            }
            res.redirect(`/casts/add?msg=${msg.join(', ')}`)
        })
    }

    static getEdit(req, res) {
        const error = req.query
        Cast.findByPk(Number(req.params.id))
        .then( data => {
            res.render('edit-cast', {casts: data, error})
        })
        .catch( err => {
            res.render('error', {error: err})
        })
    }

    static update(req, res){
        Cast.update(
            {
                id: req.body.id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone_number,
                birth_year: req.body.birth_year,
                gender: req.body.gender
            }, {
                where: {
                    id: req.body.id
                }
            })
            .then(data => {
                const message = `Cast with name ${req.body.name} has been edited !`
                res.redirect(`/casts?message=${message}&type=success`)
            })
            .catch( err => {
                const msg = []
                for(let i = 0; i < err.errors.length; i++){
                    msg.push(err.errors[i].message)
                }
                res.redirect(`/casts/${req.body.id}/edit?msg=${msg.join(', ')}`)
            })
    }

    static delete(req, res){
        Cast.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            // console.log(data)
            const message = `Cast with id ${req.params.id} has been deleted.`
            res.redirect(`/casts?message=${message}&type=danger`)
        })
        .catch(err => {
            res.render('error', {error: err})
        })
    }

    static seeMovies(req, res){
        MovieCast.findAll({
            where: {
                CastId: req.params.id
            },
            include: [Movie, Cast]
        })
        .then(data => {
            res.render('see-movies', {
                movies: data,
                cast: data.Cast,
                calculateAge: helper
            })
        })
        .catch(err => {
            res.render('error', {error: err})
        })
    }
}

module.exports = CastController
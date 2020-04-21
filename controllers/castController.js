const {Cast, MovieCast, Movie} = require('../models');
const helper = require('../helpers/calculateAge');

class CastController{
    static read(req, res){
        Cast.findAll({order: [['id', 'asc']]})
        .then(data => {
            res.render('cast/cast', {data, message: req.query.message});
        })
        .catch(err => {
            res.send(err);
        })
    }

    static add_get(req,res){
        res.render('cast/cast_add');
    }

    static add_post(req, res){
        let data = req.body;
        data.createdAt = new Date(), data.updatedAt = new Date();
        data.birth_year = Number(data.birth_year);

        Cast.create(data)
        .then(() => {
            res.redirect('/casts');
        })
        .catch(err => {
            res.send(err);
        })
    }

    static edit_get(req, res){
        Cast.findByPk(req.params.id, {})
        .then(data => {
            res.render('cast/cast_edit', {data});
        })
        .catch(err => {
            res.send(err);
        })
    }

    static edit_post(req, res){
        let data = req.body;
        data.updatedAt = new Date();
        data.birth_year = Number(data.birth_year);
        
        Cast.update(data, {where: {id: req.params.id}})
        .then(() => {
            res.redirect('/casts');
        })
        .catch(err => {
            res.send(err);
        })
    }

    static delete(req, res){
        Cast.destroy({where: {id: Number(req.params.id)}})
        .then(() => {
            res.redirect('/casts');
        })
        .catch(err => {
            res.send(err);
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
            res.render('cast/cast_see_movies', {
                data,
                castName: req.query.name,
                calculateAge: helper
            });
        })
        .catch(err => {
            res.send(err);
        })
    }
}

module.exports = CastController;
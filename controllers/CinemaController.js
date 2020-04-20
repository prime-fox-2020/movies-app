const Movie = require('../models').Movie;
const ProductionHouse = require('../models').ProductionHouse;

class CinemaController {
    static showMovie(req, res) {
        const msg = req.query.msg;
        Movie.findAll({
            attributes:['id', 'name', 'released_year', 'genre', 'ProductionHouseId'],
            order: [['released_year', 'DESC']]
        })
        .then(list => res.render('movie', {list, msg, type:"success", action:'true'}))
        .catch(err => res.render('error', {msg:err}));
    }

    static showProductionHouse(req, res) {
        const msg = req.query.msg;
        ProductionHouse.findAll({attributes:['id', 'name_prodHouse', 'headquarters']})
        .then(list => res.render('productionHouse', {list, msg, type:"success", action:null}))
        .catch(err => res.render('error', {msg:err}));
    }

    static addMovieGet(req, res) {
        const msg = req.query.msg;
        const type = req.query.type;
        res.render('add_movie', {msg, type, command:'add', list:null});
    }
    static addMoviePost(req, res) {
        if (req.body.name && req.body.released_year && req.body.genre) {
            Movie.create({
                name: req.body.name,
                released_year: req.body.released_year,  
                genre: req.body.genre
            })
            .then(() => res.redirect('/movie?msg=New movie successfully added to the list'))
            .catch(err => res.render('error', {msg:err, type:"error"}));
        } else {
            res.redirect('/movie/add?msg=All movie details must be filled&type=error');
        }
    }

    static editMovieGet(req, res) {
        const msg = req.query.msg;
        const type = req.query.type;
        Movie.findByPk(req.params.id)
        .then(list => res.render('edit_movie', {list, command:'edit', msg, type}))
        .catch(err => res.render('error', {msg: err, type:"error"}));
    }
    static editMoviePost(req, res) {
        if (req.body.name && req.body.released_year && req.body.genre) {
            Movie.update({
                name: req.body.name,
                released_year: req.body.released_year,  
                genre: req.body.genre
            }, {where:{id:req.params.id}})
            .then(() => res.redirect(`/movie?msg=Successfully update movie data with id ${req.params.id}`))
            .catch(() => res.render('error', {msg:err, type:"error"}));
        } else {
            res.redirect(`/movie/edit/${req.params.id}?msg=All movie details must be filled&type=error`);
        }
    }

    static deleteMovie(req, res) {
        Movie.destroy({where:{id:req.params.id}})
        .then(() => res.redirect(`/movie?msg=Delete movie with id ${req.params.id} successful`))
        .catch(() => res.redirect(`/movie?msg=Delete movie with id ${req.params.id} failed`));
    }
    
    static showError(req, res) {
        res.render('error', {msg: "Page not found!", type:'error'})
    }
}

module.exports = CinemaController;
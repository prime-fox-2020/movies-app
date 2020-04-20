const Movie = require('../models').Movie;
const ProductionHouse = require('../models').ProductionHouse;

class CinemaController {
    static showMovie(req, res) {
        const msg = req.query.msg;
        Movie.findAll({
            attributes:['id', 'name', 'released_year', 'genre'],
            include:[{model:ProductionHouse, attributes:['name_prodHouse']}],
            order: [['released_year', 'DESC']]
        })
        .then(list => {
            for (let entry of list) {
                entry.ProductionHouse = entry.ProductionHouse.name_prodHouse;
            }
            res.render('movie', {list, msg, type:"success", action:'true'})
        })
        .catch(err => {
            res.render('error', {msg:err})
        });
    }

    static showProductionHouse(req, res) {
        const msg = req.query.msg;
        ProductionHouse.findAll({
            attributes:['id', 'name_prodHouse', 'headquarters'],
            include:[{model:Movie, attributes:['name']}]
        })
        .then(list => {
            for (let [i, entry] of list.entries()) {
                const movies = [];
                for (let movie of entry.Movies){
                    movies.push(movie.name);
                }
                list[i].Movies = movies.join(', ');
            }
            res.render('productionHouse', {list, msg, type:"success", action:null});
        })
        .catch(err => res.render('error', {msg:err}));
    }

    static addMovieGet(req, res) {
        const msg = req.query.msg;
        const type = req.query.type;
        res.render('add_movie', {msg, type, command:'add', list:null});
    }
    static addMoviePost(req, res) {
        if (req.body.name && req.body.released_year && req.body.genre && req.body.name_prodHouse) {
            ProductionHouse.findAll({attributes:['id'], where:{name_prodHouse:req.body.name_prodHouse}})
            .then(prodHouse => {
                Movie.create({
                    name: req.body.name,
                    released_year: req.body.released_year,  
                    genre: req.body.genre,
                    ProductionHouseId: prodHouse[0].id
                })
                .then(() => res.redirect('/movie?msg=New movie successfully added to the list'))
                .catch(err => res.render('error', {msg:err, type:"error"}));
            })
            .catch(err => res.render('error', {msg:err, type:"error"}));
        } else {
            res.redirect('/movie/add?msg=All movie details must be filled&type=error');
        }
    }

    static editMovieGet(req, res) {
        const msg = req.query.msg;
        const type = req.query.type;
        Movie.findAll({
            where:{id:req.params.id},
            attributes:['id', 'name', 'released_year', 'genre'],
            include:[{model:ProductionHouse, attributes:['name_prodHouse']}]
        })
        .then(list => {
            res.render('edit_movie', {list:list[0], command:'edit', msg, type});
        })
        .catch(err => res.render('error', {msg: err, type:"error"}));
    }
    static editMoviePost(req, res) {
        if (req.body.name && req.body.released_year && req.body.genre && req.body.name_prodHouse) {
            ProductionHouse.findAll({attributes:['id'], where:{name_prodHouse:req.body.name_prodHouse}})
            .then(prodHouse => {
                Movie.update({
                    name: req.body.name,
                    released_year: req.body.released_year,  
                    genre: req.body.genre,
                    ProductionHouseId: prodHouse[0].id
                }, {where:{id:req.params.id}})
                .then(() => res.redirect(`/movie?msg=Successfully update movie data with id ${req.params.id}`))
                .catch(() => res.render('error', {msg:err, type:"error"}));
            })
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
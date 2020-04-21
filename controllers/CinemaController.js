const Movie = require('../models').Movie;
const ProductionHouse = require('../models').ProductionHouse;
const Cast = require('../models').Cast;
const MovieCast = require('../models').MovieCast;


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
            res.render('movie', {list, msg, type:"success", action:{edit:'true', delete:'true', addCast:'true'}})
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
        res.render('add_edit_movie', {msg, type, command:'add', list:null, header:"Add Movie"});
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
            res.render('add_edit_movie', {list:list[0], command:'edit', msg, type, header:"Edit Movie"});
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

    static addCastGet(req, res){
        const msg = req.query.msg;
        const type = req.query.type;
        Movie.findAll({
            where:{id:req.params.id},
            attributes:['id','name'],
            include:{model:Cast, attributes:['first_name','last_name']}
        })
        .then(movie => {
            const showList = []
            for (let actor of movie[0].Casts) {
                    showList.push({dataValues : {
                        name : actor.fullName(),
                        role : actor.MovieCast.role
                    },
                    name : actor.fullName(),
                    role : actor.MovieCast.role})
            }
            Cast.findAll({
                attributes:['id', 'first_name', 'last_name']
            })
            .then(actors => {
                for (let i in actors) {
                    actors[i].dataValues.name = actors[i].fullName();
                    actors[i].name = actors[i].dataValues.name;
                };
                res.render('add_cast_movie', {list:showList, casts:actors , header:"Add cast to", movieTitle:movie[0].name, movieId:movie[0].id, action:null, msg, type});
            })
            .catch(err => res.render('error', {msg: err, type:"error"}));
        })
        .catch(err => res.render('error', {msg: err, type:"error"}));
    }
    static addCastPost(req, res){
        if (req.body.actorId && req.body.movieId && req.body.role) {
            MovieCast.create({
                MovieId: req.body.movieId,
                CastId: req.body.actorId,
                role: req.body.role
            })
            .then(() => res.redirect('/movie/?msg=New cast successfully added to the movie'))
            .catch(err => res.render('error', {msg:err, type:"error"}));
        } else {
            res.redirect(`/movie/add/cast/${req.body.movieId}?msg=All movie details must be filled&type=error`);
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
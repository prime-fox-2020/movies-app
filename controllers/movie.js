const { Movie, ProductionHouse, Cast, MovieCast } = require('../models');

class MovieController {
    static list(req, res) {
        Movie.findAll({
            order: [
                ['releasedYear', 'DESC']
            ],
            include: [
                ProductionHouse
            ]
        }).then(data => {
            res.render('movies', {movies: data});
        });
    }

    static showCasts(req, res) {
        let id = req.params.id;
        Promise.all([Cast.findAll(), Movie.findByPk(id, {include: Cast})]).then(([casts, movie]) => {
            res.render('movie-casts', {casts, movie});
        }).catch(err => {
            res.send(err);
        });
    }

    static addCast(req, res) {
        let movieId = req.params.id;
        let fields = req.body;
        MovieCast.create({
            MovieId: movieId,
            CastId: fields.cast,
            role: fields.role
        }).then(data => {
            res.redirect(`/movies/casts/${movieId}`);
        }).catch(err => {
            if(err.name === 'SequelizeValidationError') {
                let errorsMsg = [];
                err.errors.forEach(error => {
                    errorsMsg.push(error.message);
                });
                res.send(errorsMsg);
            } else {
                res.send(err);
            }
        });
    }

    static showAddForm(req, res) {
        ProductionHouse.findAll().then(productionHouses => {
            res.render('input-movie', {productionHouses});
        }).catch(err => {
            res.send(err);
        });
    }

    static add(req, res) {
        let fields = req.body;
        Movie.create({
            name: fields.name,
            releasedYear: fields.released_year,
            genre: fields.genre,
            ProductionHouseId: fields.production_house || null
        }).then(() => {
            res.redirect('/movies');
        }).catch(err => {
            if(err.name === 'SequelizeValidationError') {
                let errorsMsg = [];
                err.errors.forEach(error => {
                    errorsMsg.push(error.message);
                });
                res.send(errorsMsg);
            } else {
                res.send(err);
            }
        })
    }

    static showEditForm(req, res) {
        let id = req.params.id;
        Promise.all([Movie.findByPk(id), ProductionHouse.findAll()]).then(([movie, productionHouses]) => {
            if(movie) {
                res.render('input-movie', {movie, productionHouses});
            } else {
                res.send('Movie not found');
            }
        }).catch(err => {
            res.send(err);
        });
    }

    static edit(req, res) {
        let id = req.params.id;
        let fields = req.body;
        Movie.findByPk(id).then(data => {
            if(data) {
                return Movie.update({
                    name: fields.name,
                    releasedYear: fields.released_year,
                    genre: fields.genre,
                    ProductionHouseId: fields.production_house || null
                }, {
                    where: {
                        id: id
                    }
                });
            } else {
                res.send('Movie not found');
            }
        }).then(() => {
            res.redirect('/movies');
        }).catch(err => {
            if(err.name === 'SequelizeValidationError') {
                let errorsMsg = [];
                err.errors.forEach(error => {
                    errorsMsg.push(error.message);
                });
                res.send(errorsMsg);
            } else {
                res.send(err);
            }
        });
    }
    
    static delete(req, res) {
        let id = req.params.id;
        Movie.findByPk(id).then(data => {
            if(data) {
                return Movie.destroy({
                    where: {
                        id: id
                    }
                });
            } else {
                res.send('Movie not found');
            }
        }).then(() => {
            res.redirect('/movies');
        }).catch(err => {
            res.send(err);
        });
    }
}

module.exports = MovieController;
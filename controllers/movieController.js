const {Movie, ProductionHouse, Cast, MovieCast} = require('../models');

class MovieController{
    static read(req, res){
        console.log('READ')
        Movie.findAll({
            include: ProductionHouse,
            order: [['released_year', 'desc']]
        })
        .then(data => {
            res.render('movie/movie', {data});
        })
        .catch(err => {
            console.log(err)
            res.send(err);
        })
    }

    static add_get(req,res){
        ProductionHouse.findAll({})
        .then(data => {
            res.render('movie/movie_add', {data});
        })
        .catch(err => {
            console.log(err)
            res.send(err);
        })
    }

    static add_post(req, res){
        let data = req.body;
        data.createdAt = new Date(), data.updatedAt = new Date();
        data.released_year = Number(data.released_year)
        data.ProductionHouseId = Number(data.ProductionHouseId);

        Movie.create(data)
        .then(() => {
            res.redirect('/movies');
        })
        .catch(err => {
            res.send(err);
        })
    }

    static edit_get(req, res){
        let dataMovie = null;
        Movie.findByPk(req.params.id, {})
        .then(data => {
            dataMovie = data;
            return ProductionHouse.findAll({})
        })
        .then(dataProdHouse => {
            res.render('movie/movie_edit', {dataMovie, dataProdHouse});

        })
        .catch(err => {
            res.send(err);
        })
    }

    static edit_post(req, res){
        let data = req.body;
        data.updatedAt = new Date();
        data.released_year = Number(data.released_year);
        data.ProductionHouseId = Number(data.ProductionHouseId);
        
        Movie.update(data, {where: {id: req.params.id}})
        .then(() => {
            res.redirect('/movies');
        })
        .catch(err => {
            res.send(err);
        })
    }

    static delete(req, res){
        Movie.destroy({where: {id: req.params.id}})
        .then(() => {
            res.redirect('/movies');
        })
        .catch(err => {
            res.send(err);
        })
    }

    static add_cast_get(req, res){
        let cast = null;
        Cast.findAll({})
        .then(data => {
            cast = data;
            return MovieCast.findAll({
                where: {MovieId: req.params.id},
                include: [Cast, Movie]
            });
        })
        .then(data => {
            console.log(data)
            res.render('movie/movie_add_cast', {
                data,
                castData: cast,
                id: req.params.id,
                movieName: req.query.name
            });        
        })
        .catch(err => {
            res.send(err);
        })
    }

    static add_cast_post(req, res){
        let data = req.body;
        data.CastId = Number(data.CastId);
        data.MovieId = Number(req.params.id);
        data.createdAt = new Date(), data.updatedAt = new Date();

        MovieCast.create(data)
        .then(() => {
            res.redirect(`/movies/casts/${req.params.id}`);
        })
        .catch(err => {
            res.send(err);
        })
    }
}

module.exports = MovieController;
const { Movie, ProductionHouse, Cast, MovieCast } = require('../models');

class MovieController{
    static show(req, res){
        Movie.findAll({
            order: [
                ['released_year', 'desc']
            ],
            include: [{model: ProductionHouse}]
        })
        .then(data => {
            res.render('movies', {movies: data, alert: req.query})
            // res.send(data)
        })
        .catch(err => {
            res.render('error', {error: err})
        })
    }

    // static validation(data){
    //     const error = []
    //     if(!data.name){
    //         error.push('Fill in your movie name!')
    //     }
    //     if(!data.released_year){
    //         error.push('Invalid released year')
    //     }else if(data.released_year < 1000 || data.released_year > (new Date().getFullYear())){
    //         error.push('Invalid released year')
    //     }
    //     if(!data.genre){
    //         error.push('Movie genre is required')
    //     }
    //     return error
    // }

    static getAdd(req, res){
        const error = req.query
        res.render('add-movie', {error})
    }

    static add(req, res){
        let rating
        if(!req.body.rating){
            rating = null
        }else{
            rating = Number(req.body.rating)
        }
        Movie.create({
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre,
            rating: rating
        })
        .then(data => {
            const message = `New movie with name ${req.body.name} has been added.`
            res.redirect(`/movies?message=${message}&type=success`)
        })
        .catch(err => {
            const msg = []
            for(let i = 0; i < err.errors.length; i++){
                msg.push(err.errors[i].message)
            }
            res.redirect(`/movies/add?msg=${msg.join(', ')}`)
        })
    }

    static getEdit(req, res){
        const error = req.query
        let dataMovie
        Movie.findByPk(Number(req.params.id), {include: {model: ProductionHouse}})
        .then(data => {
            dataMovie = data
            return ProductionHouse.findAll()
        })
        .then(prodHouse => {
            res.render('edit-movie', {movies: dataMovie, prodHouse, error})
        })
        .catch(err => {
            // console.log(err)
            res.render('error', {error: err})
        })
    }

    static update(req, res){
        let rating
        if(!req.body.rating){
            rating = null
        }else{
            rating = Number(req.body.rating)
        }
        Movie.update(
        {
            name: req.body.name,
            released_year: req.body.released_year,
            genre: req.body.genre,
            ProductionHouseId: req.body.productionHouse,
            rating: rating
        }, {
            where: {
                id: req.body.movieId
            }
        })
        .then(data => {
            const message = `Movie with name ${req.body.name} has been edited !`
            res.redirect(`/movies?message=${message}&type=success`)
        })
        .catch(err => {
            const msg = []
            for(let i = 0; i < err.errors.length; i++){
                msg.push(err.errors[i].message)
            }
            res.redirect(`/movies/${req.body.movieId}/edit?msg=${msg.join(', ')}`)
        })
    }

    static delete(req, res){
        Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            // console.log(data)
            const message = `Movie with id ${req.params.id} has been deleted.`
            res.redirect(`/movies?message=${message}&type=danger`)
        })
        .catch(err => {
            res.render('error', {error: err})
        })
    }

    static getAddCast(req, res){
        let data
        let casts
        Cast.findAll()
        .then( data => {
            casts = data
            return Movie.findByPk(Number(req.params.id), {include : {model: Cast}})
        })
        .then( dataMovie => {
            data = dataMovie
            return MovieCast.findAll({
                where: {
                    MovieId : req.params.id
                }
            })
        })
        .then( dataMovieCast => {
            // console.log(casts);
            
            res.render('add-moviecast', {movies: data, casts, dataMovieCast, alert: req.query})
        })
        .catch( err => {
            res.render('error', {message : err})
        })
    }

    static AddCast(req, res){
        MovieCast.create({
            MovieId: req.body.MovieId,
            CastId: req.body.CastId,
            role: req.body.role
        })
        .then(data => {
            res.redirect(`/movies/${req.params.id}/add-moviecast`)
        })
        .catch( err => {
            const message = []
            for(let i = 0; i < err.errors.length; i++){
                message.push(err.errors[i].message)
            }
            res.redirect(`/movies/add-moviecast/${req.params.id}?message=${message.join(', ')}&type=danger`)
        })
    }
}

module.exports = MovieController
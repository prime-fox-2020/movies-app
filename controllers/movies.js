const { Movie } = require('../models');
const { ProductionHouse } = require('../models');

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

    static validation(data){
        const error = []
        if(!data.name){
            error.push('Fill in your movie name!')
        }
        if(data.released_year){
            if(!data.released_year){
                error.push('Invalid released year')
            }
            else {
                if(data.released_year < 1000 || data.released_year > (new Date().getFullYear())){
                    error.push('Invalid released year')
                }
            }
        }
        if(!data.genre){
            error.push('Movie genre is required')
        }
        return error
    }

    static getAdd(req, res){
        const error = req.query.error
        res.render('add-movie', {error})
    }

    static add(req, res){
        const error = MovieController.validation(req.body)

        if (error.length > 0) {
            res.redirect(`/movies/add?error=${error.join(', ')}`)
        } else {
            Movie.create({
                name: req.body.name,
                released_year: req.body.released_year,
                genre: req.body.genre
            })
            .then(data => {
                const message = `New movie with name ${req.body.name} has been added.`
                res.redirect(`/movies?message=${message}&type=success`)
            })
            .catch(err => {
                res.render('error', {error: err})
            })
        }
    }

    static getEdit(req, res){
        const error = req.query.error
        let dataMovie = null
        let id = req.params.id
        Movie.findByPk(id, {include: {model: ProductionHouse}})
        .then(data => {
            dataMovie = data.dataValues
            return ProductionHouse.findAll()              
        })
        .then(prodHouse => {
            res.render('edit-movie', {id, movies: dataMovie, prodHouse, error})
        })
        .catch(err => {
            console.log(err)
            res.render('error', {error: err})
        })
    }

    static update(req, res){
        const error = MovieController.validation(req.body)
        
        if (error.length > 0) {
            res.redirect(`/movies/${req.body.movieId}/edit?error=${error.join(' ')}`)
        } else {
            Movie.update(
            {
                name: req.body.name,
                released_year: req.body.released_year,
                genre: req.body.genre,
                ProductionHouseId: req.body.productionHouse,
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
                res.render('error', {error: err})
            })
        }
    }

    static delete(req, res){
        Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            console.log(data)
            const message = `Movie with id ${data} has been deleted.`
            res.redirect(`/movies?message=${message}&type=danger`)
        })
        .catch(err => {
            res.render('error', {error: err})
        })
    }
}

module.exports = MovieController
'use strict'

const { Movie, ProductionHouse, Cast, MovieCast } = require('../models')

class MovieController{
  static getMovies(req, res){
    Movie.findAll({
      include : [{model:ProductionHouse}]
    })
      .then(movies => res.render('movies', {movies}))
      .catch(err => {
        res.send(err)
      })
  }

  static addGetMovie(req, res){
    const name              = req.query.name
    const released_year     = req.query.released_year
    const genre             = req.query.genre
    const ProductionHouseId = req.query.ProductionHouseId
    
    ProductionHouse.findAll({order: [['name_prodHouse', 'ASC']]})
      .then(productionHouses => res.render('movies/add', {
        productionHouses, name, released_year, genre, ProductionHouseId
      }))
      .catch(err => res.send(err))
  }

  static addPostMovie(req, res){
    Movie.create({
      name              : req.body.name,
      released_year     : Number(req.body.released_year),
      genre             : req.body.genre,
      ProductionHouseId : req.body.ProductionHouseId
    })
      .then(result => res.redirect('/movies'))
      .catch(err => {
        const error = {}
        for(let e of err.errors){
          error[e.path] = e.message
        }
        const errors = Object.keys(error).map(key => `${key}=${error[key]}`).join('&')
        res.redirect(`/movies/add?${errors}`)
      })
  }

  static editGetMovie(req, res){
    let pH = []
    ProductionHouse.findAll({order: [['name_prodHouse', 'ASC']]})
      .then(prodHouse => {
        pH = prodHouse
        return Movie.findByPk(req.params.id)
      })
      .then(movie => res.render('movies/edit', {movie, productionHouses: pH}))
      .catch(err => res.send(err))
  }

  static editPostMovie(req, res){
    Movie.update({
      name              : req.body.name,
      released_year     : Number(req.body.released_year),
      genre             : req.body.genre,
      ProductionHouseId : req.body.ProductionHouseId
    },
    {
      where: { id: req.params.id }
    })
      .then(result => res.redirect('/movies'))
      .catch(err => res.send(err))
  }

  static deleteMovie(req, res){
    Movie.findByPk(req.params.id)
      .then(movie => movie.destroy())
      .then(result => res.redirect('/movies'))
      .catch(err => res.send(err))
  }

  static castsGetMovie(req, res){
    let cast = []
    let error = req.query.error
    Cast.findAll()
      .then(casts =>{
        cast = casts
        return Movie.findByPk(req.params.id,{
          include: [{model:Cast}]
        })
      })
      .then(movie => res.render('movies/movieCast', {movie, cast, error}))
      .catch(err => res.send(err))
  }

  static castsPostMovie(req, res){
    MovieCast.create({
      MovieId: req.params.id,
      CastId: req.body.CastId,
      role: req.body.role
    })
      .then(result => res.redirect(`/movies/${req.params.id}/casts`))
      .catch(err => res.redirect(`/movies/${req.params.id}/casts?error=${err.errors[0].message}`))
  }
}

module.exports = MovieController
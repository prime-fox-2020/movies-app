'use strict'

const { Movie, ProductionHouse } = require('../models')

class MovieController{
  static getMovies(req, res){
    Movie.findAll({
      include : [{model:ProductionHouse}]
    })
      .then(movies => res.render('movies', {movies}))
      .catch(err => {
        console.log(err)
        res.send(err)
      })
  }

  static addGetMovie(req, res){
    ProductionHouse.findAll({order: [['name_prodHouse', 'ASC']]})
      .then(productionHouses => res.render('movies/add', {productionHouses}))
      .catch(err => res.send(err))
    
  }

  static addPostMovie(req, res){
    Movie.create({
      name: req.body.name,
      released_year: Number(req.body.released_year),
      genre: req.body.genre,
      ProductionHouseId: req.body.ProductionHouseId
    })
      .then(result => res.redirect('/movies'))
      .catch(err => res.send(err))
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
      name: req.body.name,
      released_year: Number(req.body.released_year),
      genre: req.body.genre,
      ProductionHouseId: req.body.ProductionHouseId
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
}

module.exports = MovieController
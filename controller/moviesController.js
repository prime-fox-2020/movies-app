const Movie = require('../models').Movie
const ProductionHouse = require('../models').ProductionHouse
const Cast = require('../models').Cast
const MovieCast = require('../models').MovieCast


class MovieController {

  static show(req, res) {
    let alert = req.query
    Movie.findAll({include:[{model:ProductionHouse}], order:[['released_year', 'DESC']]})
    .then(data => {
      res.render('movies', {data, alert})
    })
    .catch(err => {
      console.log(err)
    })
  }

  static getAdd(req,res) {
    res.render('add')
  }

  static postAdd(req,res) {
    Movie.create({
      name: req.body.name,
      released_year: req.body.released_year,
      genre: req.body.genre,
    })
    .then(() => {
      res.redirect(`/movies?message=Successfully added ${req.body.name}&type=success`)
    })
    .catch(err => {
      res.render('error', {error:err})
    })
  }

  static delete(req, res) {
    Movie.destroy({ where: {id: Number(req.params.id)}})
    .then(() => {
      res.redirect(`/movies?message=Movie id ${req.params.id} has been deleted&type=success`)
    })
    .catch(err => {
      res.render('error', {error: err})
    })
  }

  static getEdit(req, res) {
    let dataPh;
    ProductionHouse.findAll()
    .then(data => {
      dataPh = data
      return Movie.findAll({ where: {id: req.params.id}})
    })
    .then(data => {
      res.render('edit', {data:data[0], dataPh})
    })
    .catch(err => {
      res.render('error', {error: err})
    })
  }

  static postEdit(req, res) {
    Movie.update({
      name: req.body.name,
      released_year: req.body.released_year,
      genre: req.body.genre,
      ProductionHouseId: req.body.ProductionHouseId
    }, {where: {id: Number(req.params.id)}})
    .then(()=> {
      res.redirect(`/movies?message=Successfully edited ${req.body.name} &type=success`)
    })
    .catch(err => {
      res.render('error', {error:err})
    })
  }

  static getAddCast(req, res) {
    let alert = req.query
    let dataCast;
    let data;
    Cast.findAll()
    .then( data => {
        dataCast = data
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
        res.render('addMovieCast', {data, dataCast, dataMovieCast, alert})
    })
    .catch( err => {
        res.render('error', {msg : err})
    })
  }

  static postAddCast(req, res) {
    MovieCast.create({
      MovieId: req.body.MovieId,
      CastId: req.body.CastId,
      role: req.body.role
    })
    .then(() => {
      res.redirect(`/movies/${req.params.id}/addCast?message=Successfully added Cast to Movie &type=success`)
    })
    .catch(err => {
      res.render('error', {error:err})
    })
  }

}

module.exports = MovieController
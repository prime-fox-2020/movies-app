const Movie = require('../models').Movie
const ProductionHouse = require('../models').ProductionHouse


class MovieController {

  static show(req, res) {
    Movie.findAll({include:[{model:ProductionHouse}], order:[['released_year', 'DESC']]})
    .then(data => {
      res.render('movies', {data})
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
      res.redirect(`/movies?message=Student id ${req.params.id} has been deleted&type=success`)
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
      res.redirect('/movies')
    })
    .catch(err => {
      res.render('error', {error:err})
    })
  }

}

module.exports = MovieController
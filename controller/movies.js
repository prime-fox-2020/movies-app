const Movie = require('../models').Movie;

class MoviesController {
  static getData(req, res) {
    Movie.findAll({order: [['released_year', 'DESC']]})
    .then(data => {
      res.render('movies', {data});
    })
    .catch(err => res.send(err));
  }

  static addData(req, res) {
    res.render('movie_form', {title: 'Add', data: null});
  }

  static add(req, res) {
    Movie.create({
      name: req.body.name,
      released_year: req.body.released_year,
      genre: req.body.genre,
      ProdHouseId: 0
    })
    .then(() => {
      res.redirect('/movies');
    })
    .catch(err => res.send(err));
  }

  static editData(req, res) {
    Movie.findAll({where: {id: req.params.id}})
    .then(data => {
      res.render('movie_form', {data: data[0], title: 'Edit'});
    })
    .catch(err => res.send(err));
  }

  static edit(req, res) {
    Movie.update({
      name: req.body.name,
      released_year: req.body.released_year,
      genre: req.body.genre,
      ProdHouseId: 0
    }, {where: {id: req.params.id}})
    .then(() => {
      res.redirect('/movies');
    })
    .catch(err => res.send(err))
  }

  static delete(req, res) {
    Movie.destroy({where: {id: req.params.id}})
    .then(() => {
      res.redirect('/movies');
    })
    .catch(err => res.send(err));
  }
}

module.exports = MoviesController;
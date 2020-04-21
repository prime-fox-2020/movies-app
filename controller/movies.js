const {Movie, ProductionHouse, Cast, MovieCast} = require('../models');

class MoviesController {
  static getData(req, res) {
    Movie.findAll({
      order: [['released_year', 'DESC']],
      include: ProductionHouse
    })
    .then(data => {
      // res.send(data);
      res.render('movies', {data});
    })
    .catch(err => res.send(err));
  }

  static addData(req, res) {
    ProductionHouse.findAll()
    .then(data => {
      res.render('movie_form', {title: 'Add', prodHouse: data, data: null, validation: null});
      // res.send(data);
    })
    .catch(err => res.send(err))
  }

  static add(req, res) {
    const validation = MoviesController.validate(req.body.name, Number(req.body.released_year), req.body.genre, req.body.ProdHouseId);

    const value = {
      name: req.body.name,
      released_year: req.body.released_year,
      genre: req.body.genre,
      ProdHouseId: req.body.ProdHouseId
    }

    if (validation.length) {
      ProductionHouse.findAll()
      .then(data2 => {
        res.render('movie_form', {data: value, title: 'Edit', prodHouse: data2, validation});
      })
      .catch(err => res.send(err))
    } else {
      Movie.create(value)
      .then(() => {
        res.redirect('/movies');
      })
      .catch(err => res.send(err));
    }
  }

  static editData(req, res) {
    Movie.findAll({where: {id: req.params.id}})
    .then(data => {
      ProductionHouse.findAll()
      .then(data2 => {
        res.render('movie_form', {data: data[0], title: 'Edit', prodHouse: data2, validation: null});

      })
      .catch(err => res.send(err))
    })
    .catch(err => res.send(err));
  }

  static edit(req, res) {
    const validation = MoviesController.validate(req.body.name, Number(req.body.released_year), req.body.genre, req.body.ProdHouseId);

    const value = {
      name: req.body.name,
      released_year: req.body.released_year,
      genre: req.body.genre,
      ProdHouseId: req.body.ProdHouseId
    }

    if (validation.length) {
      ProductionHouse.findAll()
      .then(data2 => {
        res.render('movie_form', {data: value, title: 'Edit', prodHouse: data2, validation});

      })
      .catch(err => res.send(err))
    } else {
      Movie.update({
        name: req.body.name,
        released_year: req.body.released_year,
        genre: req.body.genre,
        ProdHouseId: req.body.ProdHouseId
      }, {where: {id: req.params.id}})
      .then(() => {
        res.redirect('/movies');
      })
      .catch(err => res.send(err))
    }
  }

  static delete(req, res) {
    Movie.destroy({where: {id: req.params.id}})
    .then(() => {
      res.redirect('/movies');
    })
    .catch(err => res.send(err));
  }

  static validate(name, released, genre, PHId) {
    let msg = [];
    if (!name) msg.push('name cannot be empty');
    if (!released) {
      msg.push('released year cannot be empty');
    } else if (typeof released != 'number') {
      msg.push('wrong release year')
    }
    if (!genre) msg.push('genre cannot be empty');
    if (!PHId) msg.push('Production House cannot be empty');

    return msg.join(', ');
  }

  static addCastGet(req, res) {
    Movie.findOne({
      where: {id: req.params.id},
      include: Cast
    })
    .then(movie => {
      Cast.findAll()
      .then(cast => {
        // res.send(movie)
        res.render('addcast', {movie, cast})
      })
      .catch(err => res.send(err))
    })
    .catch(err => res.send(err))
  }

  static addCast(req, res) {
    const value = {
      MovieId: req.params.id,
      CastId: req.body.CastId,
      role: req.body.role
    }

    MovieCast.create(value)
    .then(() => res.redirect('/movies'))
    .catch(err => res.send(err))
  }
}

module.exports = MoviesController;
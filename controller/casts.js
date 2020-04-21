const {Cast, Movie} = require('../models');
const ageReleased = require('../helpers/ageRelease');

class CastsController {
  static getData(req, res) {
    Cast.findAll()
    .then(data => res.render('casts', {data}))
    .catch(err => res.send(err))
  }

  static addData(req, res) {
    res.render('casts_form', {title: 'Add', data: null, validation: null})
  }

  static add(req, res) {
    const value = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      birth_year: req.body.birth_year,
      gender: req.body.gender
    }
    Cast.create(value)
    .then(() => {
      res.redirect('/casts');
    })
    .catch(err => res.send(err))
  }

  static editData(req, res) {
    Cast.findOne({where: {id: req.params.id}})
    .then(data => {
      res.render('casts_form', {data, title: 'Edit', validation: null});
    })
    .catch(err => res.send(err))
  }

  static edit(req, res) {
    const value = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number,
      birth_year: req.body.birth_year,
      gender: req.body.gender
    }
    Cast.update(value, {where: {id: req.params.id}, individualHooks: true})
    .then(() => res.redirect('/casts'))
    .catch(err => res.send(err))
  }

  static delete(req, res) {
    Cast.destroy({where: {id: req.params.id}})
    .then(() => res.redirect('/casts'))
    .catch(err => res.send(err))
  }

  static getMovies(req, res) {
    Cast.findOne({where: {id: req.params.id}, include: Movie})
    .then(data => res.render('castmovie', {data, ageReleased}))
    .catch(err => res.send(err))
  }
}

module.exports = CastsController;
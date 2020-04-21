const Cast = require('../models').Cast
const Movie = require('../models').Movie
const countAge = require('../helper/countAge')


class CastController {

  static show(req, res) {
    let alert = req.query
    Cast.findAll()
    .then(data => {
      res.render('cast', {data, alert})
    })
    .catch(err => {
      res.render('error', {error:err})
    })
  }

  static getAdd(req, res) {
    let alert = req.query
    res.render('addCast',{alert})
  }

  static postAdd(req, res) {
    Cast.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birth_year: req.body.birth_year,
      phone_number: req.body.phone_number,
      gender: req.body.gender
    })
    .then(() => {
      res.redirect(`/cast?message=Successfully added ${req.body.first_name} ${req.body.last_name}&type=success`)
    })
    .catch(err => {
      res.render('error', {error:err})
    })
  }

  static getEdit(req, res) {
    Cast.findByPk(req.params.id)
    .then(data => {
      res.render('editCast', {data})
    })
    .catch(err => {
      res.render('error', {error: err})
    })
  }

  static postEdit(req, res) {
    Cast.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birth_year: req.body.birth_year,
      phone_number: req.body.phone_number,
      gender: req.body.gender
    }, {where: {id: req.params.id}})
    .then(() => {
      res.redirect(`/cast?message=Successfully edited ${req.body.first_name} ${req.body.last_name}&type=success`)
    })
    .catch(err => {
      res.render('error', {error:err})
    })
  }

  static delete(req, res) {
    Cast.destroy({where: {id:req.params.id}})
    .then(() => {
      res.redirect(`/cast?message=Success deleted Cast&type=success`)
    })
    .catch(err => {
      res.render('error', {error:err})
    })
  }

  static getMovies(req, res) {
    Cast.findByPk(Number(req.params.id), {include: [{model: Movie}]})
    .then(data => {
      res.render('movieCast', {data, countAge})
    })
    .catch(err => {
      res.render('error', {error:err})
    })
  }
}

module.exports = CastController
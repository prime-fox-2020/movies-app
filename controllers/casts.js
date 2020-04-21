'use strict'

const { Cast, Movie } = require('../models')
const getAge          = require('../helper/getAge')

class CastsController{
  static getCasts(req, res){
    Cast.findAll()
      .then(casts => {
        res.render('casts', {casts})
      })
      .catch(err => res.send(err))
  }

  static addGetCast(req, res){
    res.render('casts/add')
  }

  static addPostCast(req, res){
    Cast.create({
      first_name  : req.body.first_name,
      last_name   : req.body.last_name,
      phone_number: req.body.phone_number,
      birth_year  : Number(req.body.birth_year),
      gender      : req.body.gender
    })
      .then(result => res.redirect('/casts'))
      .catch(err => res.send(err))
  }

  static editGetCast(req, res){
    Cast.findByPk(req.params.id)
      .then(cast => res.render('casts/edit', {cast}))
      .catch(err => res.send(err))
  }

  static editPostCast(req, res){
    Cast.update(
      {
        first_name  : req.body.first_name,
        last_name   : req.body.last_name,
        phone_number: req.body.phone_number,
        birth_year  : Number(req.body.birth_year),
        gender      : req.body.gender
      },{
        where: {id: req.params.id}
      }
    )
      .then(result => res.redirect('/casts'))
      .catch(err => res.send(err))
  }

  static deleteCast(req, res){
    Cast.findByPk(req.params.id)
      .then(cast => cast.destroy())
      .then(result => res.redirect('/casts'))
      .catch(err => res.send(err))
  }

  static moviesCast(req, res){
    Cast.findByPk(req.params.id,{
      include: [{model: Movie}]
    })
      .then(cast => res.render('casts/moviesCast', {cast, getAge}))
      .catch(err => res.send(err))
  }
}


module.exports = CastsController
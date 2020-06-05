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
    const first_name = req.query.first_name
    const birth_year = req.query.birth_year
    const gender     = req.query.gender
    res.render('casts/add', {first_name, birth_year, gender})
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
      .catch(err => {
        const error = {}
        for(let e of err.errors){
          error[e.path] = e.message
        }
        const errors = Object.keys(error).map(key => `${key}=${error[key]}`).join('&')
        res.redirect(`/casts/add?${errors}`)
      })
  }

  static editGetCast(req, res){
    const first_name = req.query.first_name
    const birth_year = req.query.birth_year
    const gender     = req.query.gender
    Cast.findByPk(req.params.id)
      .then(cast => res.render('casts/edit', {cast, first_name, birth_year, gender}))
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
      .catch(err => {
        const error = {}
        for(let e of err.errors){
          error[e.path] = e.message
        }
        const errors = Object.keys(error).map(key => `${key}=${error[key]}`).join('&')
        res.redirect(`/casts/${req.params.id}/edit?${errors}`)
      })
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
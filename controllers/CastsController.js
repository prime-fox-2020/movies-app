const {Cast, Movie} = require('../models')
const helper = require('../helpers')

class CastController {

  static show(req, res) {
    CastController.setLocals(res)
    res.locals.pageTitle = 'List of Talents'
    res.locals.alert = { message: [req.query.message], type: req.query.type }

    Cast.findAll({
      order: [['first_name', 'ASC']]
    })
    .then(results => {
      if (results.length) {
        res.locals.casts = results
        res.render('cast')
      } else {
        res.locals.alert.message = [`You dont have any talent data in database.`]
        res.locals.alert.type = 'danger'
        res.render('cast')
      }
    })
    .catch(err => {
      res.locals.alert.message = [err]
      res.locals.alert.type = 'danger'
      res.render('cast')
    })
  }

  static addForm(req, res) {
    CastController.setLocals(res)
    res.locals.pageTitle = 'Add new talent'

    res.render('cast/add')
  }
  
  static add(req, res) {
    const message = 'New talent added successfully.'
    const {first_name, last_name, birth_year, gender, phone_number} = req.body
    CastController.setLocals(res)
    res.locals.title = 'Add new talent'
    res.locals.alert.type = 'danger'
    res.locals.tempData = req.body

    Cast.create({
      first_name,
      last_name,
      birth_year,
      gender,
      phone_number
    })
    .then(results => {
      res.redirect(`/casts?message=${message}&type=success`)
    })
    .catch(err => {
      if (Array.isArray(err.errors)) {
        res.locals.alert.message = err.errors.map(er => er.message)
        res.render('cast/add')
      } else {
        res.locals.alert.message = [err]
        res.render('cast/add')
      }
    })
  }

  static editForm(req, res) {
    const fail = `Talent with ID ${req.params.id} is not found.`
    CastController.setLocals(res)
    res.locals.title = 'Edit data talent'

    if (isNaN(req.params.id)) {
      res.redirect(`/casts?message=${fail}&type=danger`)
    } else {
      Cast.findByPk(req.params.id)
      .then(results => {
        res.locals.cast = results
        res.render('cast/edit')
      })
      .catch(err => {
        res.redirect(`/casts?message=${err}&type=danger`)
      })
    }  
  }
  
  static edit(req, res) {
    const message = 'Data talent updated successfully.'
    const {first_name, last_name, birth_year, gender, phone_number} = req.body
    CastController.setLocals(res)
    res.locals.title = 'Edit data talent'
    res.locals.method = 'edit'
    res.locals.alert.type = 'danger'
    res.locals.cast = req.body
    res.locals.cast.id = req.params.id

    Cast.update({
        first_name,
        last_name,
        birth_year,
        gender,
        phone_number
      }, {
        where: {id: req.params.id}
    })
    .then(results => {
      res.redirect(`/casts?message=${message}&type=success`)
    })
    .catch(err => {
      res.locals.alert.message = [err]
      // res.send(res.locals)
      res.render('cast/edit')
    })
  }

  static delete(req, res) {
    const success = `Talent with ID ${req.params.id} successfully deleted.`
    const fail = `Talent with ID ${req.params.id} is not found.`
    let found

    if (isNaN(req.params.id)) {
      res.redirect(`/casts?message=${fail}&type=danger`)
    } else {
      Cast.findByPk(req.params.id)
      .then(results => {
        found = results
        return Cast.destroy({ where: { id: req.params.id } })
      })
      .then(results => {
        console.log(found)
          res.redirect(`/casts?message=${success}&type=success`)
      })
      .catch(err => {
        if (found === null) {
          res.redirect(`/casts?message=${fail}&type=danger`)
        } else {
          res.redirect(`/casts?message=${err}&type=danger`)
        }
      })
    }  
  }

  static getMovies(req, res) {
    CastController.setLocals(res)
    
    Cast.findByPk(req.params.id, {
      include: [{model: Movie}]
    })
    .then(results => {
      res.locals.cast = results
      res.locals.helper = {
        ageCalc: helper.ageCalc
      }
      res.render('cast/movies')
    })
    .catch(err => res.send(err))
  }
  
  static setLocals(res) {
    res.locals.page = 'Cast'
    res.locals.tempData = null
  }
}

module.exports = CastController
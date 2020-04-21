const {Cast} = require('../models')

class CastController {

  static show(req, res) {
    const locals = CastController.getLocals()
    locals.title = 'List of Talents'
    locals.alert = { message: [req.query.message], type: req.query.type }

    Cast.findAll({
      order: [['first_name', 'ASC']]
    })
    .then(results => {
      if (results.length) {
        locals.data = results
        res.render('cast', locals)
      } else {
        locals.alert.message = [`You dont have any talent data in database.`]
        locals.alert.type = 'danger'
        res.render('cast', locals)
      }
    })
    .catch(err => {
      locals.alert.message = [err]
      locals.alert.type = 'danger'
      res.render('cast', locals)
    })
  }

  static addForm(req, res) {
    const locals = CastController.getLocals()
    locals.title = 'Add new talent'
    locals.method = 'add'

    res.render('cast/add', locals)
  }
  
  static add(req, res) {
    const locals = CastController.getLocals()
    const message = 'New talent added successfully.'
    const {first_name, last_name, birth_year, gender, phone_number} = req.body
    locals.title = 'Add new talent'
    locals.method = 'add'
    locals.alert.type = 'danger'
    locals.data = req.body

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
      locals.alert.message = [err]
      res.render('cast/add', locals)
    })
  }

  static editForm(req, res) {
    const locals = CastController.getLocals()
    const fail = `Talent with ID ${req.params.id} is not found.`
    locals.title = 'Edit data talent'
    locals.method = 'edit'

    if (isNaN(req.params.id)) {
      res.redirect(`/casts?message=${fail}&type=danger`)
    } else {
      Cast.findByPk(req.params.id)
      .then(results => {
        locals.data = results
        if (results) {
          res.render('cast/edit', locals)
        } else {
          res.redirect(`/casts?message=${fail}&type=danger`)
        }
      })
      .catch(err => {
        res.redirect(`/casts?message=${err}&type=danger`)
      })
    }  
  }
  
  static edit(req, res) {
    const locals = CastController.getLocals()
    const message = 'Data talent updated successfully.'
    const {first_name, last_name, birth_year, gender, phone_number} = req.body
    locals.title = 'Edit data talent'
    locals.method = 'edit'
    locals.alert.type = 'danger'
    locals.data = req.body
    locals.data.id = req.params.id

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
      locals.alert.message = [err]
      res.render('cast/edit', locals)
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
        if (found) {
          res.redirect(`/casts?message=${success}&type=success`)
        } else {
          res.redirect(`/casts?message=${fail}&type=danger`)
        }
      })
      .catch(err => res.redirect(`/casts?message=${err}&type=danger`))
    }  
  }

  static getLocals() {
    return {
      alert: { message: null, type: null },
      data: null,
      method: null,
      title: null,
      page: 'Cast'
    }
  }
}

module.exports = CastController
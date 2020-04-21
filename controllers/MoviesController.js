const {Movie, ProductionHouse} = require('../models')

class MovieController {

  static show(req, res) {
    const locals = MovieController.getLocals()
    locals.title = 'List of Movies'
    locals.alert = { message: [req.query.message], type: req.query.type }

    Movie.findAll({
      order: [['released_year', 'DESC']],
      include: [{model: ProductionHouse}]
    })
    .then(results => {
      if (results.length) {
        locals.data = results
        console.log(locals.data)
        res.render('movie', locals)
      } else {
        locals.alert.message = [`You dont have any movie data in database.`]
        locals.alert.type = 'danger'
        res.render('movie', locals)
      }
    })
    .catch(err => {
      locals.alert.message = [err]
      locals.alert.type = 'danger'
      res.render('movie', locals)
    })
  }

  static addForm(req, res) {
    const locals = MovieController.getLocals()
    locals.title = 'Add new movie'
    locals.method = 'add'
    locals.prodHouse = []

    ProductionHouse.findAll({
      order: [['name_prodHouse', 'ASC']]
    })
    .then(results => {
      locals.prodHouse = results
      res.render('movie/add', locals)
    })
    .catch(err => {
      locals.alert.message = [err]
      locals.alert.type = 'danger'
      res.render('movie/add', locals)
    })
  }
  
  static add(req, res) {
    const error = MovieController.validation(req.body)
    const locals = MovieController.getLocals()
    const message = 'New movie added successfully.'
    const {title, released_year, genre, ProductionHouseId} = req.body
    locals.title = 'Add new movie'
    locals.method = 'add'
    locals.alert.message = error
    locals.alert.type = 'danger'
    locals.data = req.body

    ProductionHouse.findAll({
      order: [['name_prodHouse', 'ASC']]
    })
    .then(results => {
      locals.prodHouse = results
      return new Promise((resolve, reject) => {
        if (error.length) return reject(error)
        return resolve(Movie.create({
          title,
          released_year,
          genre,
          ProductionHouseId
        }))
      })
    })
    .then(results => {
      res.redirect(`/movies?message=${message}&type=success`)
    })
    .catch(err => {
      console.log(req.body)
      locals.alert.message = [err]
      res.render('movie/add', locals)
    })    
  }

  static editForm(req, res) {
    const locals = MovieController.getLocals()
    const fail = `Movie with ID ${req.params.id} is not found.`
    locals.title = 'Edit data movie'
    locals.method = 'edit'

    if (isNaN(req.params.id)) {
      res.redirect(`/movies?message=${fail}&type=danger`)
    } else {
      Movie.findByPk(req.params.id)
      .then(results => {
        if (results !== null) {
          locals.data = results
          return ProductionHouse.findAll({
            order: [['name_prodHouse', 'ASC']]
          })
        } else {
          res.redirect(`/movies?message=${fail}&type=danger`)
        }
      })
      .then(results => {
        locals.prodHouse = results
        res.render('movie/edit', locals)
      })
      .catch(err => {
        locals.alert.message = [err]
        res.render('movie/add', locals)
      })
    }  
  }
  
  static edit(req, res) {
    const error = MovieController.validation(req.body)
    const locals = MovieController.getLocals()
    const message = 'Data movie updated successfully.'
    locals.title = 'Edit data movie'
    locals.method = 'edit'
    locals.alert.type = 'danger'
    locals.data = req.body
    locals.data.id = req.params.id
    locals.alert.message = error

    ProductionHouse.findAll({
      order: [['name_prodHouse', 'ASC']]
    })
    .then(results => {
      locals.prodHouse = results
      if (error.length) {
        res.render('movie/edit', locals)
      } else {
        const {title, released_year, genre, ProductionHouseId} = req.body
        Movie.update({
          title,
          released_year,
          genre,
          ProductionHouseId
        }, {
          where: {id: req.params.id}
        })
        .then(results => {
          res.redirect(`/movies?message=${message}&type=success`)
        })
        .catch(err => {
          locals.alert.message = [err]
          res.render('movie/edit', locals)
        })
      }
    })
    .catch(err => {
      locals.alert.message = [err]
      res.render('movie/edit', locals)
    })
  }

  static delete(req, res) {
    const success = `Movie with ID ${req.params.id} successfully deleted.`
    const fail = `Movie with ID ${req.params.id} is not found.`
    if (isNaN(req.params.id)) {
      res.redirect(`/movies?message=${fail}&type=danger`)
    } else {
      Movie.findByPk(req.params.id)
      .then(results => {
        if (results !== null) {
          Movie.destroy({ where: { id: req.params.id } })
          .then(results => res.redirect(`/movies?message=${success}&type=success`))
          .catch(err => res.redirect(`/movies?message=${err}&type=danger`))
        } else {
          res.redirect(`/movies?message=${fail}&type=danger`)
        }
      })
      .catch(err => res.redirect(`/movies?message=${err}&type=danger`))
    }
  }

  static getLocals() {
    return {
      alert: { message: null, type: null },
      data: null,
      method: null,
      title: null,
      page: 'Movie'
    }
  }
  
  static validation(obj) {
    if (obj.title) obj.title = obj.title.trim()
    if (obj.released_year) obj.released_year = Number(obj.released_year)
    const {title, released_year, genre} = obj
    const error = []
    if (!title) error.push('Please enter movie title.')
    if (isNaN(released_year)) {
      error.push('Please enter number only for released year.')
    } else if (released_year === '') {
      error.push('Please enter released year.')
    }
    if (released_year > new Date().getFullYear()) error.push('Unreleased movie cant be submited')
    if (!genre) error.push('Please select movie genre')
    console.log(error)
    return error
  }
}

module.exports = MovieController
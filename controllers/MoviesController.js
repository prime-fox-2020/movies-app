const {Movie, ProductionHouse, Cast, MovieCast} = require('../models')

class MovieController {

  static show(req, res) {
    MovieController.setLocals(res)
    res.locals.pageTitle += 'List of Movies'
    if (req.query.type) res.locals.alert = { message: [req.query.message], type: req.query.type }

    Movie.findAll({
      order: [['released_year', 'DESC']],
      include: [{model: ProductionHouse}]
    })
    .then(results => {
      if (results.length) {
        res.locals.movies = results
        res.render('movie')
      } else {
        res.locals.alert.message = [`You dont have any movie data in database.`]
        res.locals.alert.type = 'danger'
        res.render('movie')
      }
    })
    .catch(err => {
      res.locals.alert.message = [err]
      res.locals.alert.type = 'danger'
      res.render('movie')
    })
  }

  static addForm(req, res) {
    MovieController.setLocals(res)
    res.locals.pageTitle = 'Add new movie'
    res.locals.prodHouses = []

    ProductionHouse.findAll({
      order: [['name_prodHouse', 'ASC']]
    })
    .then(results => {
      res.locals.prodHouses = results
      res.render('movie/add')
    })
    .catch(err => {
      res.locals.alert.message = [err]
      res.locals.alert.type = 'danger'
      res.render('movie/add')
    })
  }
  
  static add(req, res) {
    const message = 'New movie added successfully.'
    const {title, released_year, genre, ProductionHouseId, rating} = req.body
    MovieController.setLocals(res)
    res.locals.pageTitle = 'Add new movie'
    res.locals.alert.type = 'danger'
    res.locals.tempData = req.body

    ProductionHouse.findAll({
      order: [['name_prodHouse', 'ASC']]
    })
    .then(results => {
      res.locals.prodHouses = results
      return Movie.create({
        title,
        released_year,
        genre,
        ProductionHouseId,
        rating
      })
    })
    .then(results => {
      res.redirect(`/movies?message=${message}&type=success`)
    })
    .catch(err => {
      if (Array.isArray(err.errors)) {
        res.locals.alert.message = err.errors.map(er => er.message)
        res.render('movie/add')
      } else {
        res.locals.alert.message = [err]
        res.render('movie/add')
      } 
    })    
  }

  static editForm(req, res) {
    const fail = `Movie with ID ${req.params.id} is not found.`
    MovieController.setLocals(res)
    res.locals.pageTitle = 'Edit data movie'

    if (isNaN(req.params.id)) {
      res.redirect(`/movies?message=${fail}&type=danger`)
    } else {
      Movie.findByPk(req.params.id)
      .then(results => {
        res.locals.movie = results
        return ProductionHouse.findAll({
          order: [['name_prodHouse', 'ASC']]
        })
      })
      .then(results => {
        res.locals.prodHouses = results
        if (res.locals.movie) {
          res.render('movie/edit')
        } else {
          res.redirect(`/movies?message=${fail}&type=danger`)
        }
      })
      .catch(err => {
        res.redirect(`/movies?message=${err}&type=danger`)
      })
    }  
  }
  
  static edit(req, res) {
    const message = 'Data movie updated successfully.'
    const {title, released_year, genre, ProductionHouseId, rating} = req.body
    MovieController.setLocals(res)
    res.locals.pageTitle = 'Edit data movie'
    res.locals.alert.type = 'danger'
    res.locals.movie = req.body
    res.locals.movie.id = req.params.id

    Movie.update({
      title,
      released_year,
      genre,
      ProductionHouseId,
      rating
    }, {
      where: {id: req.params.id}
    })
    .then(results => {
      res.redirect(`/movies?message=${message}&type=success`)
    })
    .catch(err => {
      if (Array.isArray(err.errors)) {
        res.locals.alert.message = err.errors.map(er => er.message)
      } else {
        res.locals.alert.message = [err]
      }
      ProductionHouse.findAll({
        order: [['name_prodHouse', 'ASC']]
      })
      .then(results => {
        res.locals.prodHouses = results
        res.render('movie/edit')
      })
      .catch(err => {
        res.locals.alert.message.push(err)
        res.render('movie/edit')
      })
    }) 
  }

  static delete(req, res) {
    const success = `Movie with ID ${req.params.id} successfully deleted.`
    const fail = `Movie with ID ${req.params.id} is not found.`
    let movie

    if (isNaN(req.params.id)) {
      res.redirect(`/movies?message=${fail}&type=danger`)
    } else {
      Movie.findByPk(req.params.id)
      .then(results => {
        movie = results
        if (results) return Movie.destroy({ where: {id: results.id}})
      })
      .then(results => {
        if (movie) {
          res.redirect(`/movies?message=${success}&type=success`)
        } else {
          res.redirect(`/movies?message=${fail}&type=danger`)
        }
      })
      .catch(err => res.redirect(`/movies?message=${err}&type=danger`))
    }
  }

  static addTalent(req, res) {
    MovieController.setLocals(res)
    if (req.query.type) res.locals.alert = { message: [req.query.message], type: req.query.type }

    Cast.findAll({
      attributes: ['id', 'first_name', 'last_name']
    })
    .then(results => {
      res.locals.casts = results
      return Movie.findOne({
        attributes: ['id', 'title'],
        where: {
          id: req.params.id
        }
      })
    })
    .then(results => {
      res.locals.movie = results
      return MovieCast.findAll({
        include: [{model: Movie}, {model: Cast}],
        where: {
          MovieId: req.params.id
        }
      })
    })
    .then(results => {
      res.locals.pageTitle = res.locals.movie.title
      res.locals.movieCasts = results
      res.render('movie/addTalent')
    })
    .catch(err => {
      if (!res.locals.casts) {
        res.redirect(`/movies?message=You dont have talent in database. Add some first.&type=danger`)
      } else if (!res.locals.movie) {
        res.redirect(`/movies?message=Movie with ID ${req.params.id} is not found&type=danger`)
      } else {
        res.send(err)
      }
    })
  }

  static addTalentPost(req, res) {
    const {CastId, role} = req.body
    const MovieId = Number(req.params.id)
    const success = `Talent successfully added.`

    MovieCast.create({CastId, MovieId, role})
    .then(results => {
      res.redirect(`/movies/${MovieId}/add-talent?message=${success}&type=success`)
    })
    .catch(err => {
      let errors
      if (Array.isArray(err.errors)) {
        errors = err.errors.map(elm => elm.message).join(' ')
      } else {
        errors = err
      }
      res.redirect(`/movies/${MovieId}/add-talent?message=${errors}&type=danger`)
    })
  }

  static setLocals(res) {
    res.locals.page = 'Movie'
    res.locals.tempData = null
  }
}

module.exports = MovieController
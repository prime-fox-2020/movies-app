const { Movie } = require('../models')
const { ProductionHouse } = require('../models')

class MovieController {

  static getMovies(req, res){
    let alert = req.query
    Movie.findAll({order : [['released_year', 'DESC']],  include: [{model: ProductionHouse}]})
    .then(data=>{
      res.render('movies', {data, alert})      
    }).catch(error=>{
      res.render('error', {error})      
    })
  }

  static addGet(req, res){
    res.render('add')
  }

  static addPost(req,res){
    Movie.create({
      name: req.body.name,
      genre: req.body.genre,
      released_year: req.body.released_year,
      ProductionHouseId: req.body.ProductionHouseId
    })
      .then(()=>{
        let msg = `${req.body.name} has been success add to list movies`
        res.redirect(`/movies?message=${msg}&type=success`)
      }).catch(error=>{
        res.render('error', {error})
      })
  }

  static delete(req,res){
    Movie.destroy({ where: { id: Number(req.params.id) }})
    .then(()=>{
      res.redirect(`/movies?message=Movie with id: ${req.params.id} has been deleted!&type=success`)
    }).catch(error=>{
      res.render('error', {error})
    })
  }

  static editGet(req,res){
    let temp
    ProductionHouse.findAll()
    .then( data => {
      temp = data
      return Movie.findAll({ where: { id: Number(req.params.id) }})
    })
    .then(data=>{
      res.render('edit', {data, temp})
    }).catch(error=>{
      res.render('error', {error})
    })
  }

  static editPost(req,res){
    // res.send(req.body)
    Movie.update({
      name: req.body.name,
      released_year: req.body.released_year,
      genre: req.body.genre,
      ProductionHouseId: req.body.ProductionHouseId
    }, { where: { id: Number(req.params.id) }})
    .then(()=>{        
      res.redirect(`/movies?message=Movies with id: ${req.params.id} has been succeess edited!&type=success`)
    })
    .catch(error=>{
      res.render('error', {error})
    })
  }

}


module.exports = MovieController
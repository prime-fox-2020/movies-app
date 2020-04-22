const MM = require('../models').Movie;
const PHM = require('../models').ProductionHouse;
const Cast = require('../models').Cast;
const MC = require('../models').MovieCast;


class MovieController {
  static show(req, res) {
    MM.findAll({include: [{ model: PHM}],order: [['released_year', 'DESC']]})
    .then(data => {
      res.render('movie' , {data})
    })
    .catch( err => {
      res.send(err);
    })
  }

  static addForm(req, res){
    PHM.findAll()
    .then(data => {
      res.render('add', {data})
    })
    .catch(err => {
      res.send(err);
    })
   }

   static add(req, res){
     let rating
      if(!req.body.rating){
          rating = null
      } else {
          rating = Number(req.body.rating)
      }
     MM.create({
       name: req.body.name,
       released_year: req.body.released_year,
       genre: req.body.genre,
       ProductionHouseId: req.body.ProductionHouseId,
       rating : rating
     })
     .then(data => {
       res.redirect('/movie');
     })
     .catch(err => {
       res.send(err);
     })
  }

  static editForm(req, res) {
    let dataPH;
    PHM.findAll()
    .then(data => {
      dataPH = data
      return MM.findByPk(Number(req.params.id))
    })
    .then(data => {
      res.render('edit', {data, dataPH})
    })
    .catch(err => {
      res.send(err)
    })
  }

  static edit(req, res) {
    let rating
      if(!req.body.rating){
          rating = null
      } else {
          rating = Number(req.body.rating)
      }
    MM.update(
      {
      name : req.body.name,
      released_year : req.body.released_year,
      genre : req.body.genre,
      ProductionHouseId : req.body.ProductionHouseId,
      Rating: rating
    },
  {
    where : {id : Number(req.params.id)}
  })
        .then (() => {
            res.redirect('/movie')
        })
        .catch(err => {
            res.send(err)
        })
  }

  static delete(req, res) {
    MM.destroy({where:{id:req.params.id}})
    .then( () => {
      return MC.destroy({where:{MovieId: Number(req.params.id)}})
    })
    .then(() => {
      res.redirect('/movie')
    })
    .catch(err => {
      res.send(err);
    })
  }

  static addMovieCastForm(req, res){
      // const alert = req.query
      let dataCast
      let data
      CM.findAll()
      .then( data => {
          dataCast = data
          return MM.findByPk(Number(req.params.id), {include : {model: CM}})
      })
      .then( dataMovie => {
          data = dataMovie
          return MC.findAll({
              where: {
                  MovieId : req.params.id
              }
          })
      })
      .then( dataMovieCast => {
          res.render('addMovieCastForm', {data, dataCast, dataMovieCast, alert})
      })
      .catch( err => {
          res.send(err)
      })
    }

      static addMovieCast(req, res){
          MovieCast.create({
              MovieId: req.body.MovieId,
              CastId: req.body.CastId,
              role: req.body.role
          })
          .then( () => {
              res.redirect(`/movie/${req.params.id}/addMovieCast`)
          })
          .catch( err => {
              res.redirect(`/movie/addMovieCast`)
          })
      }




}

module.exports = MovieController;

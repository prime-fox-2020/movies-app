const MM = require('../models').Movie;
const PHM = require('../models').ProductionHouse;


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
    // let rating
    //   if(!req.body.rating){
    //       rating = null
    //   } else {
    //       rating = Number(req.body.rating)
    //   }
    MM.update(
      {
      name : req.body.name,
      released_year : req.body.released_year,
      genre : req.body.genre,
      ProductionHouseId : req.body.ProductionHouseId
      // rating: rating
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
      res.redirect('/movie')
    })
    .catch(err => {
      res.send(err);
    })
  }


}

module.exports = MovieController;

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
    res.render('add');
   }

   static add(req, res){
     MM.create({
       name: req.body.name,
       released_year: req.body.released_year,
       genre: req.body.genre,
     })
     .then(data => {
       res.redirect('/movie');
     })
     .catch(err => {
       res.send(err);
     })
  }

  static editForm(req, res) {
    MM.findByPK(Number(req.params.id))
    .then(data => {
         res.render('edit', {data})
      })
      .catch(err =>{
         res.send(err);
      })
  }

  static edit(req, res) {
    MM.update({
      name : req.body.name,
      released_year : req.body.released_year,
      genre : req.body.genre,
      released_year: req.body.released_year,
      ProductionHouseId : req.body.productionHouse
    },
    {
      where : {id : req.params.id}
        })
        .then (data => {
            res.redirect('/movie')
        })
        .catch(err => {
            res.send(err)
        })
  }

  static delete(req, res) {
    MM.destroy({where:{id:req.params.id}})
    .then(data => {
      res.redirect('/movie')
    })
    .catch(err => {
      res.send(err);
    })
  }


}

module.exports = MovieController;

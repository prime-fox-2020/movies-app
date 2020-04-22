const MM = require('../models').Movie;
const CM = require('../models').Cast;
const MC = require('../models').MovieCast;


class CastController {

  static showCast(req, res) {
    CM.findAll()
      .then(data => {
        res.render('cast', {data});
      })
      .catch(err => {
        res.send(err);
      })
  }

  static addFormCast(req, res) {
    res.render('addCast')
  }

  static addCast(req, res){
    CM.create({
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      phone_number:req.body.phone_number,
      birth_year: req.body.birth_year,
      gender: req.body.gender
    })
    .then( () => {
      res.redirect('/cast');
    })
    .catch(err => {
      res.send(err);
    })
  }
  //
  static editFormCast(req, res) {
    CM.findByPk(Number(req.params.id))
    .then(data => {
         res.render('edit', {data})
      })
      .catch(err =>{
         res.send(err);
      })
  }
  //
  static editCast(req, res) {
    CM.update({
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      phone_number:req.body.phone_number,
      birth_year: req.body.birth_year,
      gender: req.body.gender
    },
    {
      where : {id : Number(req.params.id)}
        })
        .then (data => {
            res.redirect('/cast')
        })
        .catch(err => {
            res.send(err)
        })
  }

  static showMovie(req, res) {
    CM.findByPk(Number(req.params.id), {include: [{model: MM}]})
    .then(data => {
      res.render('castMovie',{data});
    })
    .catch(err => {
      res.send(err)
    })
  }

  static deleteCast(req,res) {
    CM.destroy({where:{id:req.params.id}})
    .then( () => {
      return MC.destroy({where: {CastId: Number(req.params.id)}})
      .then( data => {
        res.redirect('/cast')
      })
    })
    .catch(err => {
      res.send(err);
    })
  }

}
module.exports = CastController

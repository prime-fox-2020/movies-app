const MM = require('../models').Movie;
const Cast = require('../models').Cast;
const MC = require('../models').MovieCast;


class CastController {

  static show(req, res) {
    Cast.findAll()
      .then(data => {
        res.render('cast', {data});
      })
      .catch(err => {
        res.send(err);
      })
  }

  // static addForm(req, res) {
  //   res.render('addCast')
  // }

  // static add(req, res){
  //   CM.create({
  //     first_name:req.params.first_name,
  //     last_name:req.params.last_name,
  //     phone_number:req.params.phone_number,
  //     birth_year: req.params.birth_year,
  //     gender: req.params.gender
  //   })
  //   .then(data => {
  //     res.redirect('/cast');
  //   })
  //   .catch(err => {
  //     res.send(err);
  //   })
  // }
  //
  // static editForm(req, res) {
  //   CM.findByPK(Number(req.params.id))
  //   .then(data => {
  //        res.render('edit', {data})
  //     })
  //     .catch(err =>{
  //        res.send(err);
  //     })
  // }
  //
  // static edit(req, res) {
  //   CM.update({
  //     name : req.body.name,
  //     released_year : req.body.released_year,
  //     genre : req.body.genre,
  //     released_year: req.body.released_year,
  //     ProductionHouseId : req.body.ProductionHouseId
  //   },
  //   {
  //     where : {id : Number(req.params.id)}
  //       })
  //       .then (data => {
  //           res.redirect('/cast')
  //       })
  //       .catch(err => {
  //           res.send(err)
  //       })
  // }
  //
  // static showMovie(req, res) {
  //
  //   res.render(data);
  // }
  //
  // static delete(req,res) {
  //   CM.destroy({where:{id:req.params.id}})
  //   .then(data => {
  //     res.redirect('/cast')
  //   })
  //   .catch(err => {
  //     res.send(err);
  //   })
  // }

}

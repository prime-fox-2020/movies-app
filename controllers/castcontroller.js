const Cast = require('../models').Cast
const ProductionHouse = require('../models').ProductionHouse

class CastController {
    static show (req, res){
        Cast.findAll(
            {order: [['first_name', 'asc']]}
        )
        .then(data => {
            res.render('viewcasts', { data })
        }).catch(err => {
            res.send(err)
        })
    }

    static showAdd (req, res){
        res.render('addcasts')
    }

    static add (req, res){
        Cast.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            birth_year: req.body.birth_year,
            gender: req.body.gender
        }).then(data => {
            res.redirect('/casts')
        }).catch(err => {
            res.send(err)
        })
    }

    static showEdit (req, res){
        Cast.findByPk(req.params.id)
        .then(data => {
            res.render('editcasts', { data })
            // res.send(data)
        }).catch(err => {
            res.send(err)
        })
    }

    static edit (req, res){
        Cast.update(req.body, {
            where: {id: req.params.id}
        }).then(data => {
            res.redirect('/casts')
        }).catch(err => {
            res.send(req.body)
        })
    }

    static delete (req, res){
        Cast.destroy({
            where: {id:req.params.id}
        }).then(data => {
            res.redirect('/casts')
        }).catch(err => {
            res.send(err)
        })
    }
}

module.exports = CastController
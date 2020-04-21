const { Cast } = require('../models');

class CastController {
    static showAll(req, res){
        Cast.findAll({
            order: [
                ['first_name', 'ASC']
            ]
        })
        .then(data => {
            res.render('list-of-casts', {data, title: 'List of Casts', nav: 'cast'})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showForm(req, res){
        res.render('add-cast-form', { title: 'Add New Cast', nav: 'cast'})
    }

    static addProcess(req, res){
        Cast.create({ 
            first_name: req.body.first_name, 
            last_name: req.body.last_name,
            birth_year: req.body.birth_year,
            phone_number: req.body.phone_number,
            gender: req.body.gender 
        })
        .then(() => {
            res.redirect('/casts')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static deleteProcess(req, res){
        Cast.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/casts')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static showEdit(req, res){
        Cast.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((data) => {
            res.render('edit-cast-form', { data, title: 'Edit Cast', nav: 'cast'})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static editProcess(req, res){
        Cast.update(
            {
                first_name: req.body.first_name, 
                last_name: req.body.last_name,
                birth_year: req.body.birth_year,
                phone_number: req.body.phone_number,
                gender: req.body.gender
            }, 
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then(() => {
            res.redirect('/casts')
        })
        .catch((err) => {
            res.send(err)
        })
    }
}

module.exports = CastController
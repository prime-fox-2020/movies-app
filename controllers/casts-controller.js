const {Cast, Movies} = require('../models')

class CastsController {
    static showCasts(req, res) {
        let id = req.params.id;
        let queryBody = req.body;
        let pesan = req.query.pesan;
        let error = req.query.error;
        Cast.findAll({order: [['id', 'asc']]})
        .then(data => {
            let dataCast = data
            res.render("casts.ejs", {dataCast, id, queryBody, pesan, error})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getAddForm(req, res) {
        let id = req.params.id;
        let queryBody = req.body;
        let pesan = req.query.pesan;
        let error = req.query.error;
        res.render("add-casts.ejs", {id, queryBody, pesan, error})
        // res.send('<h1>Add Casts Page pending, is in development</h1>')
    }

    static postAdd(req, res) {
        let id = req.params.id;
        let queryBody = req.body;
        let pesan = req.query.pesan;
        let error = req.query.error;
        Cast.create({
            "first_name": queryBody.first_name,
            "last_name": queryBody.last_name,
            "phone_number": queryBody.phone_number,
            "birth_year": queryBody.birth_year,
            "gender": queryBody.gender
        })
        .then(data => {
            console.log(data.dataValues);
            res.redirect(`/casts?pesan=Berhasil menambahkan data cast dengan nama ${queryBody.first_name} ${queryBody.last_name}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getEditForm(req, res) {
        let id = req.params.id;
        let queryBody = req.body;
        let pesan = req.query.pesan;
        let error = req.query.error;
        Cast.findByPk(id)
        .then(data => {
            let thisCast = data
            console.log(thisCast);
            
            res.render("edit-casts.ejs", {thisCast, id, queryBody, pesan, error})
            // res.send(`Ini adalah halaman edit dari cast bernama ${thisCast.first_name}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static postEdit(req, res) {
        let id = req.params.id;
        let queryBody = req.body;
        // let pesan = req.query.pesan;
        // let error = req.query.error;
        Cast.update({
            "first_name": queryBody.first_name,
            "last_name": queryBody.last_name,
            "phone_number": queryBody.phone_number,
            "birth_year": queryBody.birth_year,
            "gender": queryBody.gender
        }, {where: {id}})
        .then(data => {
            res.redirect(`/casts?pesan=Berhasil edit data cast dengan id ${id}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static delete(req, res) {
        let id = req.params.id;
        let queryBody = req.body;
        let pesan = req.query.pesan;
        let error = req.query.error;
        Cast.destroy({where: {id}})
        .then(data => {
            res.redirect(`/casts?pesan=Berhasil delete data cast dengan id ${id}`)
        })
        .catch()
    }
}

module.exports = CastsController
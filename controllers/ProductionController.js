const { ProductionHouse } = require('../models')

class ProductionController {
    static get(req, res) {
        ProductionHouse.findAll({
            order: [
                ['name_prodHouse', 'ASC']
            ]
        })
            .then(data => {
                return res.render('production', { object: data })
            })
            .catch(err => {
                return res.render('error', { err: err })
            })
        // StudentModel.get((err, data) => {
        //     if (err) {
        //         res.render('error', { error: err });
        //     } else {
        //         res.render('student', { object: data });
        //     }
        // })
    }

    // static add(req, res) {
    //     res.render('addStudent')
    // }

    // static addPost(req, res) {
    //     Student.create({
    //         first_name: req.body.first_name,
    //         last_name: req.body.last_name,
    //         email: req.body.email,
    //         gender: req.body.gender,
    //         birth_date: req.body.birth_date
    //     })
    //         .then(data => {
    //             return res.redirect('/student')
    //         })
    //         .catch(err => {
    //             throw err
    //         })
        // StudentModel.add(req.body.first_name, req.body.last_name, req.body.email, req.body.gender, req.body.birth_date)
        // .then(data => {
        //     return res.redirect('/student')
        // })
        // .catch(err => {
        //     throw err
        // })
    // }

    // static edit(req, res) {
    //     Student.findAll({
    //         where: { id: Number(req.params.id) }
    //     })
    //         .then(data => {
    //             return res.render('editStudent', { object: data });
    //         })
    //         .catch(err => {
    //             throw err
    //         })
        // StudentModel.editById(Number(req.params.id))
        // .then(data => {
        //     return res.render('editStudent', { object: data })
        // })
        // .catch(err => {
        //     throw err
        // })
    // }

    // static editPost(req, res) {
    //     Student.update({
    //         first_name: req.body.first_name,
    //         last_name: req.body.last_name,
    //         email: req.body.email,
    //         gender: req.body.gender,
    //         birth_date: req.body.birth_date
    //     }, {
    //         where: { id: Number(req.params.id) }
    //     })
    //         .then(data => {
    //             return res.redirect('/student');
    //         })
    //         .catch(err => {
    //             throw err
    //         })
        // StudentModel.editPost(Number(req.params.id), req.body.first_name, req.body.last_name, req.body.email, req.body.gender, req.body.birth_date)
        // .then(data => {
        //     return res.redirect('/student');
        // })
        // .catch(err => {
        //     throw err
        // })

    // }

    // static delete(req, res) {
    //     Student.destroy({
    //         where: { id: Number(req.params.id) },
    //     })
    //         .then(data => {
    //             return res.redirect('/student')
    //         })
    //         .catch(err => {
    //             throw err
    //         })
        // StudentModel.delete(Number(req.params.id))
        // .then(data => {
        //     return res.redirect('/student')
        // })
        // .catch(err => {
        //     throw err
        // })
    // }
}


module.exports = ProductionController;
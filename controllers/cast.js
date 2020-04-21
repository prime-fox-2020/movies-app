const { Cast, Movie } = require('../models');

class CastController {
    static list(req, res) {
        Cast.findAll().then(casts => {
            res.render('casts', {casts});
        }).catch(err => {
            res.send(err);
        });
    }

    static showAddForm(req, res) {
        res.render('input-cast');
    }

    static add(req, res) {
        let fields = req.body;
        Cast.create({
            firstName: fields.first_name,
            lastName: fields.last_name,
            birthYear: fields.birth_year,
            phoneNumber: fields.phone_number,
            gender: fields.gender
        }).then(() => {
            res.redirect('/casts');
        }).catch(err => {
            res.send(err);
        })
    }

    static showCastMovies(req, res) {
        let id = req.params.id;
        Cast.findByPk(id, { include: Movie }).then(cast => {
            if(cast) {
                res.render('cast-movies', {cast});
            } else {
                res.send('Cast not found');
            }
        }).catch(err => {
            res.send(err);
        });
    };

    static showEditForm(req, res) {
        let id = req.params.id;
        Cast.findByPk(id).then(cast => {
            if(cast) {
                res.render('input-cast', {cast});
            } else {
                res.send('Cast not found');
            }
        }).catch(err => {
            res.send(err);
        });
    }

    static edit(req, res) {
        let id = req.params.id;
        let fields = req.body;
        Cast.findByPk(id).then(data => {
            if(data) {
                return Cast.update({
                    firstName: fields.first_name,
                    lastName: fields.last_name,
                    birthYear: fields.birth_year,
                    phoneNumber: fields.phone_number,
                    gender: fields.gender
                }, {
                    where: {
                        id: id
                    }
                });
            } else {
                res.send('Cast not found');
            }
        }).then(() => {
            res.redirect('/casts');
        }).catch(err => {
            res.send(err);
        });
    }
    
    static delete(req, res) {
        let id = req.params.id;
        Cast.findByPk(id).then(data => {
            if(data) {
                return Cast.destroy({
                    where: {
                        id: id
                    }
                });
            } else {
                res.send('Cast not found');
            }
        }).then(() => {
            res.redirect('/casts');
        }).catch(err => {
            res.send(err);
        });
    }
}

module.exports = CastController;
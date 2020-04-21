const Cast = require('../models').Cast;
const Movie = require('../models').Movie;

class CastController {
    static showCast(req, res) {
        const msg = req.query.msg;
        Cast.findAll({
            attributes:["id", "first_name", "last_name", "phone_number", "birth_year", "gender"]
        })
        .then(list => {
            for (let i in list) {
                const showList = {
                        id: list[i].id,
                        name: list[i].fullName(),
                        phone_number: list[i].phone_number,
                        birth_year: list[i].birth_year,
                        gender: list[i].gender
                     }
                list[i].name = list[i].fullName();
                list[i].dataValues = showList;
            };
            res.render('cast', {list, msg, type:"success", action:{edit:'true', delete:'true', see:'true'}});
        })
        .catch(err => {
            res.render('error', {msg:err})
        });
    }

    static seeMovies(req, res){
        const msg = req.query.msg;
        const type = req.query.type;
        Cast.findAll({
            where: {id: req.params.id},
            attributes:["first_name", "last_name", "birth_year"],
            include: {model: Movie, attributes:["name", "released_year"]}
        })
        .then(actor => {
            const showList = []
            for (let movie of actor[0].Movies) {
                showList.push({
                    dataValues : {
                        name : movie.name,
                        released_year: movie.released_year,
                        age_when_movie_released: movie.released_year-actor[0].birth_year,
                        role : movie.MovieCast.role
                    },
                    name : movie.name,
                    released_year: movie.released_year,
                    age_when_movie_released: movie.released_year-actor[0].birth_year,
                    role : movie.MovieCast.role
                })
            } 
            console.log(showList);
            // res.send(actor[0].Movies);
            res.render('see_movies', {list:showList, header:"See Your Movies:", actor:actor[0].fullName(), msg, type, command:'add', action:null});
        })
        .catch(err => {
            res.render('error', {msg:err})
        });
    }

    static addCastGet(req, res) {
        const msg = req.query.msg;
        const type = req.query.type;
        res.render('add_edit_cast', {msg, type, command:'add', list:null, header:"Add Cast"});
    }
    static addCastPost(req, res) {
        if (req.body.first_name && req.body.phone_number && req.body.birth_year && req.body.gender) {
            Cast.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,  
                phone_number: req.body.phone_number,
                birth_year: req.body.birth_year,
                gender: req.body.gender,
            })
            .then(() => res.redirect('/cast?msg=New cast successfully added to the list'))
            .catch(err => res.render('error', {msg:err, type:"error"}));
        } else {
            res.redirect('/cast/add?msg=All details must be filled&type=error');
        }
    }
    static editCastGet(req, res) {
        const msg = req.query.msg;
        const type = req.query.type;
        Cast.findAll({
            where:{id:req.params.id},
            attributes:["id", "first_name", "last_name", "phone_number", "birth_year", "gender"]
        })
        .then(list => {
            res.render('add_edit_cast', {list:list[0], command:'edit', msg, type, header:"Edit Cast"});
        })
        .catch(err => res.render('error', {msg: err, type:"error"}));
    }
    static editCastPost(req, res) {
        if (req.body.first_name && req.body.phone_number && req.body.birth_year && req.body.gender) {
                Cast.update({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,  
                    phone_number: req.body.phone_number,
                    birth_year: req.body.birth_year,
                    gender: req.body.gender,
                }, {where:{id:req.params.id}})
                .then(() => res.redirect(`/cast?msg=Successfully update cast data with id ${req.params.id}`))
                .catch(() => res.render('error', {msg:err, type:"error"}));
        } else {
            res.redirect(`/cast/edit/${req.params.id}?msg=All details must be filled&type=error`);
        }
    }
    static deleteCast(req, res) {
        Cast.destroy({where:{id:req.params.id}})
        .then(() => res.redirect(`/cast?msg=Delete cast with id ${req.params.id} successful`))
        .catch(() => res.redirect(`/cast?msg=Delete cast with id ${req.params.id} failed`));
    }
}

module.exports = CastController;
const Cast = require('../models').Cast;
// const MovieCast = require('../models').MovieCast;

class CastController {
    static showCast(req, res) {
        const msg = req.query.msg;
        Cast.findAll({
            attributes:["id", "first_name", "last_name", "phone_number", "birth_year", "gender"]
            // include:[{model:ProductionHouse, attributes:['name_prodHouse']}],
            // order: [['released_year', 'DESC']]
        })
        .then(list => {
            // for (let entry of list) {
            //     entry.ProductionHouse = entry.ProductionHouse.name_prodHouse;
            // }
            res.render('cast', {list, msg, type:"success", action:'true'})
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
        console.log(req.body);
        if (req.body.first_name && req.body.last_name && req.body.phone_number && req.body.birth_year && req.body.gender) {
            // Cast.findAll({attributes:['id'], where:{name_prodHouse:req.body.name_prodHouse}})
            // .then(prodHouse => {
                Cast.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,  
                    phone_number: req.body.phone_number,
                    birth_year: req.body.birth_year,
                    gender: req.body.gender,
                })
                .then(() => res.redirect('/cast?msg=New cast successfully added to the list'))
                .catch(err => res.render('error', {msg:err, type:"error"}));
            // })
            // .catch(err => res.render('error', {msg:err, type:"error"}));
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
            // include:[{model:ProductionHouse, attributes:['name_prodHouse']}]
        })
        .then(list => {
            res.render('add_edit_cast', {list:list[0], command:'edit', msg, type, header:"Edit Cast"});
        })
        .catch(err => res.render('error', {msg: err, type:"error"}));
    }
    static editCastPost(req, res) {
        if (req.body.first_name && req.body.last_name && req.body.phone_number && req.body.birth_year && req.body.gender) {
            // ProductionHouse.findAll({attributes:['id'], where:{name_prodHouse:req.body.name_prodHouse}})
            // .then(prodHouse => {
                Cast.update({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,  
                    phone_number: req.body.phone_number,
                    birth_year: req.body.birth_year,
                    gender: req.body.gender,
                }, {where:{id:req.params.id}})
                .then(() => res.redirect(`/cast?msg=Successfully update cast data with id ${req.params.id}`))
                .catch(() => res.render('error', {msg:err, type:"error"}));
            // })
            // .catch(() => res.render('error', {msg:err, type:"error"}));
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
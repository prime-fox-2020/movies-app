const{Cast,Movie}=require('../models')
const movieOld=require('../helpers/MovieOld')

class CastController{
    static show(req,res){
        Cast.findAll()
        .then(data=>{
            data.forEach(element => {
                element.full_name=element.fullName()
            });
            res.render('cast',{data})
        }).catch(err=>{
            res.send(err)
        })

    }

    static add(req,res){
        res.render('addcast')
    }

    static addPost(req,res){
        Cast.create({
            first_name:req.body.fname,
            last_name:req.body.lname,
            birth_year:req.body.birthyear,
            phone_number:req.body.phonenumber,
            gender:req.body.gender
        }).then(data=>{
            res.redirect('/casts')
        }).catch(err=>{
            res.send(err)
        })
    }

    static edit(req,res){
        Cast.findOne({
            where:{
                id:Number(req.params.id)
            },
        }).then(data=>{
            res.render('editcast',{data})
        }).catch(err=>{
            res.send(err)
        })
    }

    static editPost(req,res){
        Cast.update({
            first_name:req.body.fname,
            last_name:req.body.lname,
            birth_year:req.body.birthyear,
            phone_number:req.body.phonenumber,
            gender:req.body.gender
        },{
            where:{
                id:Number(req.params.id)
            },
        }).then(data=>{
            res.redirect('/casts')
        }).catch(err=>{
            res.send(err)
        })
    }

    static delete(req,res){
        Cast.destroy({
            where:{
                id:Number(req.params.id)
            }
        }).then(data=>{
            res.redirect('/casts')
        }).catch(err=>{
            res.send(err)
        })
    }

    static seemovie(req,res){
        Cast.findOne({
            include:[{model:Movie}],
            where:{
                id:Number(req.params.id)
            }
        }).then(data=>{
            res.render('seemovie',{data,movieOld})
        }).catch(err=>{
            res.send(err)
        })
    }
}

module.exports=CastController
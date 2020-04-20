const {Movie,ProductionHouse}=require('../models')


class MovieController{
    static show(req,res){
        Movie.findAll({
            include:[{model: ProductionHouse}],
            order:[
                ['released_year','DESC'],
            ],
        })
        .then(data=>{
            res.render('movie',{data})
        }).catch(err=>{
            res.send(err)
        })
    }

    static addForm(req,res){
        res.render('add')
    }

    static addPost(req,res){
        Movie.create({
            name:req.body.name,
            released_year:req.body.releasedyear,
            genre:req.body.genre
        }).then(data=>{
            res.redirect('/movies')
        }).catch(err=>{
            res.send(err)
        })
    }

    static edit(req,res){
        Movie.findOne({
            where:{
                id:Number(req.params.id)
            },
        }).then(data=>{
            ProductionHouse.findAll()
            .then(dataPro=>{
                res.render('edit',{data,dataPro})
            }).catch(err=>{
                res.send(err)
            })
        }).catch(err=>{
            res.send(err)
        })
    }

    static editPost(req,res){
        Movie.update({
            name:req.body.name,
            released_year:req.body.releasedyear,
            genre:req.body.genre,
            ProductionHouseId:req.body.prodhouse
        },{
            where:{
                id:Number(req.params.id)
            },
        }).then(data=>{
            res.redirect('/movies')
        }).catch(err=>{
            res.send(err)
        })
    }

    static delete(req,res){
        Movie.destroy({
            where:{
                id:Number(req.params.id)
            }
        }).then(data=>{
            res.redirect('/movies')
        }).catch(err=>{
            res.send(err)
        })
    }
}

module.exports=MovieController
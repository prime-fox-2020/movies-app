const {Movie,ProductionHouse}=require('../models')


class MovieController{
    static show(req,res){
        Movie.findAll({
            include:[{model: ProductionHouse}],
            order:[
                ['name','ASC'],
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
        // res.send(req.body)
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
            res.render('edit',{data})
        }).catch(err=>{
            res.send(err)
        })
    }

    static editPost(req,res){
        let angka
        if(req.body.prodhouse=='Walt Disney Studios'){
            angka=1
        }else if(req.body.prodhouse=='Pixar'){
            angka=2
        }else if(req.body.prodhouse=='Warner Bros'){
            angka=3
        }else if(req.body.prodhouse=='Universal Pictures'){
            angka=4
        }else if(req.body.prodhouse=='Paramount Pictures'){
            angka=5
        }
        Movie.update({
            name:req.body.name,
            released_year:req.body.releasedyear,
            genre:req.body.genre,
            ProductionHouseId:angka
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
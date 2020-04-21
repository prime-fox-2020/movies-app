const {Movie,ProductionHouse,Cast,MovieCast}=require('../models')


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
        const error=req.query.error
        res.render('add',{error})
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
            res.redirect(`/movies/add?error=${err.message}`)
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
                const error=req.query.error
                res.render('edit',{data,dataPro,error})
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
            res.redirect(`/movies/edit/${Number(req.params.id)}?error=${err.message}`)
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

    static addRole(req,res){
        Movie.findOne({
            include:[{model: Cast}],
            where:{
                id:Number(req.params.id)
            },
        }).then(data=>{
            Cast.Name()
            .then(dataactor=>{
                const error=req.query.error
                res.render('addrole',{data,dataactor,error})
            }).catch(err=>{
            res.send(err)
            })
        }).catch(err=>{
            res.send(err.message)
        })
    }

    static addRolePost(req,res){
        MovieCast.create({
            MovieId:Number(req.params.id),
            CastId:req.body.actor,
            role:req.body.role
        }).then(data=>{
            res.redirect(`/movies/addrole/${Number(req.params.id)}`)
        }).catch(err=>{
            res.redirect(`/movies/addrole/${Number(req.params.id)}?error=${err.message}`)
        })
    }
}

module.exports=MovieController
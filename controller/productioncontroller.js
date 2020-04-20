const{ProductionHouse}=require('../models')

class ProductHouse{
    static show(req,res){
        ProductionHouse.findAll({
            order:[
                ['name_prodHouse','ASC'],
            ],
        })
        .then(data=>{
            res.render('product',{data})
        }).catch(err=>{
            res.send(err)
        })
    }
}

module.exports=ProductHouse
const {ProductionHouses} = require('../models/index')

class ProductionHousesController{
    
    static create(req,res){

    }
    
    static findAll(req,res){
        ProductionHouses.findAll({

        })
        .then(ProductionHousesData => {
            res.render('productionhouses',{data : ProductionHousesData})
            // res.send(data)
        })
        .catch(err =>{
            console.log(err)
            res.send(err)
        })

        
    }

}

module.exports=ProductionHousesController
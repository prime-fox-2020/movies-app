const { Movie,ProductionHouse } = require('../models/index')

class Controller{

    static findAll(req,res){
        ProductionHouse.findAll({
        })
        .then(data => {
            // res.render('',{data : Movie})
            res.send(data)
        })
        .catch(err =>{
            console.log(err)
            res.send(err)
        })
    }

}

module.exports = Controller
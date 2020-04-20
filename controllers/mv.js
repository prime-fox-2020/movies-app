const { Movie,ProductionHouse } = require('../models/index')

class Controller{

    static findAll(req,res){
        Movie.findAll({
            order: [['name', 'asc']],
            include: [{ model: ProductionHouse }]
        })
        .then(data => {
            // res.render('',{data : Movie})
            res.render('mv',{data})
            console.log(data[0].ProductionHouse)
            // res.send(data)
        })
        .catch(err =>{
            console.log(err)
            res.send(err)
        })
    }

}

module.exports = Controller
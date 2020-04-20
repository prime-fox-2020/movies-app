class DefaultController{
    static getHome(req, res){
        res.render('home')
    }
    static getNoImplement(req, res){
        res.render('cast')
    }

    static getError(req, res){
        res.render('error', {msg: '404 ERROR - PAGE NOT FOUND'})
    }
}

module.exports = DefaultController

class HomeController {

    static getHome(req, res){
        res.render('home')
    }

    static notFound(req, res){
        res.render('error')
    }
}

module.exports = HomeController;
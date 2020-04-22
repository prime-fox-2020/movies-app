class IndexController {
    static home(req, res) {
        res.render('home.ejs')
    }
}

module.exports = IndexController
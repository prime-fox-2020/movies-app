class HomeControl {
    static getHome (req, res) {
        res.render('home.ejs')
    }
    static notFound (req, res) {
        res.send('This page is currently under construction')
    }
}

module.exports = HomeControl
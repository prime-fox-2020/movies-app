class Controller {
    static homePage(req, res) {
        res.render('home');
    }

    static notFound(req, res) {
        res.render('error', {mes: '404 - Page Not Found'});
    }
}

module.exports = Controller;
class PagesController {

  static getHome(req, res) {
    res.locals.title += ' | Home Page'
    res.render('page/index')
  }

  static notFound(req, res) {
    res.locals.title += ' | 404 - Page Not Found'
    res.render('page/404')
  }
}

module.exports = PagesController
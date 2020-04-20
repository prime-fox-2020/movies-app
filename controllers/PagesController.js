class PagesController {

  static getHome(req, res) {    
    const locals = PagesController.getLocals()
    locals.title = 'Home Page Movie App'
    res.render('page/index',locals)
  }

  static notFound(req, res) {
    const locals = PagesController.getLocals()
    locals.title = '404 - Page Not Found'
    res.render('page/404', locals)
  }
  
  static getLocals() {
    return {
      alert: { message: null, type: null },
      data: null,
      method: null,
      title: null,
      page: 'Page'
    }
  }
}

module.exports = PagesController
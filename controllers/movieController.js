const { Movie, ProductionHouse, Cast, MovieCast } = require("../models");

class MovieController {
  static show(req, res) {
    Movie.findAll({
      order: [["released_year", "DESC"]],
      include: [{ model: ProductionHouse }],
    })
      .then((data) => {
        res.render("movie", { data });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static addForm(req, res) {
    const error = req.query.error;
    res.render("addmovie", { error });
  }

  static add(req, res) {
    Movie.create({
      name: req.body.name,
      released_year: req.body.released_year,
      genre: req.body.genre,
    })
      .then(() => {
        res.redirect("/movies");
      })
      .catch((err) => {
        let error = [];
        for (let i = 0; i < err.errors.length; i++) {
          error.push(err.errors[i].message);
        }
        res.redirect(`/movies/add/?error=${error.join(", ")}`);
      });
  }

  static editForm(req, res) {
    const error = req.query.error;
    let listProductionHouse;
    ProductionHouse.findAll()
      .then((data) => {
        listProductionHouse = data;
        return Movie.findByPk(Number(req.params.id));
      })
      .then((data) => {
        res.render("editmovie", { data, listProductionHouse, error });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static edit(req, res) {
    Movie.update(
      {
        first_name: req.body.name,
        released_year: req.body.released_year,
        genre: req.body.genre,
        ProductionHouseId: req.body.listProductionHouseId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() => {
        res.redirect("/movies");
      })
      .catch((err) => {
        let error = [];
        for (let i = 0; i < err.errors.length; i++) {
          error.push(err.errors[i].message);
        }
        res.redirect(`/movies/${req.params.id}/edit?error=${error.join("")}`);
      });
  }

  static delete(req, res) {
    Movie.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.redirect("/movies");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static addCastForm(req, res) {
    const error = req.query.error;
    let listCast;
    let listMovie;
    Movie.findAll({
      where: {
        id: Number(req.params.id),
      },
      include: [{ model: Cast }],
      })
      .then((data)=>{
        listMovie = data
        return Cast.findAll()
      })
      .then((data) => {
        listCast = data
        res.render("addcastmovie", { listCast, error, movie:listMovie[0] });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static addCast(req, res) {
    MovieCast.create({
      MovieId: req.params.id,
      CastId: req.body.listCastId,
      role: req.body.role,
    })
      .then(() => {
        res.redirect("/movies");
      })
      .catch((err) => {
        let error = [];
        for (let i = 0; i < err.errors.length; i++) {
          error.push(err.errors[i].message);
        }
        res.redirect(
          `/movies/${req.params.id}/addcast/?error=${error.join("")}`
        );
      });
  }
}

module.exports = MovieController;

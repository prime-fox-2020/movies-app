const { Movie, ProductionHouse } = require("../models");

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
    res.render("addmovie", {error:null});
  }

  static add(req, res) {
    const errors = MovieController.validate(req.body);
    if (errors.length > 0) {

      res.render('addmovie', {error:errors.join(', ')})

    } else {
      Movie.create({
        name: req.body.name,
        released_year: req.body.released_year,
        genre: req.body.genre,
      })
        .then(() => {
          res.redirect("/movies");
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }

  static editForm(req, res) {
    let listProductionHouse;
    ProductionHouse.findAll()
      .then((data) => {
        listProductionHouse = data;
        return Movie.findByPk(Number(req.params.id));
      })
      .then((data) => {
        res.render("editmovie", { data, listProductionHouse, error: null });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static edit(req, res) {
    const errors = MovieController.validate(req.body);
    if (errors.length > 0) {
      let listProductionHouse;
      ProductionHouse.findAll()
        .then((data) => {
          listProductionHouse = data;
          return Movie.findByPk(Number(req.params.id));
        })
        .then((data) => {
          res.render("editmovie", {
            data,
            listProductionHouse,
            error: errors.join(", "),
          });
        });
    } else {
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
          res.send(err);
        });
    }
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

  static validate(data) {
    const error = [];
    if (!data.name) {
      error.push("name must be filled");
    }
    if (!data.released_year) {
      error.push("released year must be filled");
    }
    if (!data.genre) {
      error.push("genre must be selected");
    }
    return error;
  }
}

module.exports = MovieController;

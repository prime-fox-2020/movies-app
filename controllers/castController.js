const { Movie, ProductionHouse, Cast, MovieCast } = require("../models");

const age = require("../helpers/castAge");

class CastController {
  static show(req, res) {
    Cast.findAll({
      order: [["id", "ASC"]],
    })
      .then((data) => {
        res.render("cast", {
          data,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static addForm(req, res) {
    const error = req.query.error;
    res.render("addcasts", { error });
  }

  static add(req, res) {
    Cast.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birth_year: req.body.birth_year,
      phone_number: req.body.phone_number,
      gender: req.body.gender,
    })
      .then(() => {
        res.redirect("/casts");
      })
      .catch((err) => {
        let error = [];
        for (let i = 0; i < err.errors.length; i++) {
          error.push(err.errors[i].message);
        }
        res.redirect(`/casts/add/?error=${error.join("")}`);
      });
  }

  static editForm(req, res) {
    const error = req.query.error;
    Cast.findByPk(Number(req.params.id))
      .then((data) => {
        res.render("editcast", {
          data,
          error,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static edit(req, res) {
    Cast.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_year: req.body.birth_year,
        phone_number: req.body.phone_number,
        gender: req.body.gender,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() => {
        res.redirect("/casts");
      })
      .catch((err) => {
        let error = [];
        for (let i = 0; i < err.errors.length; i++) {
          error.push(err.errors[i].message);
        }
        res.redirect(`/casts/${req.params.id}/edit/?error=${error.join("")}`);
      });
  }

  static delete(req, res) {
    Cast.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.redirect("/casts");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static seeMovie(req, res) {
    Cast.findAll({
      where: {
        id: Number(req.params.id),
      },
      include: [{ model: Movie }],
    })
      .then((data) => {
        res.render("filmByCast", {
          casts: data[0],
          age,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }
}
module.exports = CastController;

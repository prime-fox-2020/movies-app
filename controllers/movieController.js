const { ProductionHouse, Movie } = require('../models');

class MovieController {
	static addGet(req, res) {
		res.render('movieAdd');
	}

	static addPost(req, res) {
		Movie.create({
			name: req.body.name,
			released_year: Number(req.body.released_year),
			genre: req.body.genre
		})
			.then((movies) => {
				res.redirect('/movies');
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static show(req, res) {
		Movie.findAll({
			include: [ { model: ProductionHouse } ],
			order: [ [ 'released_year', 'DESC' ] ]
		})
			.then((movies) => {
				res.render('movie', { movies });
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static editGet(req, res) {
		let movies = null;
		Movie.findByPk(Number(req.params.id))
			.then((data) => {
				movies = data;

				return ProductionHouse.findAll().then((productionHouse) => {
					res.render('movieEdit', { movies, productionHouse });
				});
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static editPost(req, res) {
		Movie.update(
			{
				name: req.body.name,
				genre: req.body.genre,
				released_year: Number(req.body.released_year),
				ProductionHouseId: Number(req.body.productionHouse)
			},
			{
				where: {
					id: req.params.id
				}
			}
		)
			.then((sukses) => {
				res.redirect('/movies');
			})
			.catch((err) => {
				console.log('error disinii');
				res.send(err);
			});
	}

	static delete(req, res) {
		Movie.destroy({
			where: {
				id: req.params.id
			}
		})
			.then((hapus) => {
				res.redirect('/movies');
			})
			.catch((err) => {
				res.send(err);
			});
	}
}

module.exports = MovieController;

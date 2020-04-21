const { ProductionHouse, Movie, Cast, MovieCast } = require('../models');

class MovieController {
	static addGet(req, res) {
		const error = req.query.error
		res.render('movieAdd', {error});
	}

	static addPost(req, res) {
		Movie.create({
			name: req.body.name,
			released_year: Number(req.body.released_year),
			genre: req.body.genre,
			rating: req.body.rating
		})
			.then((movies) => {
				res.redirect('/movies');
			})
			.catch((err) => {
				console.log(err.errors)
				let error = [];
				for (let i = 0; i < err.errors.length; i++) {
					error.push(err.errors[i].message);
				}
				res.redirect(`/movies/add/?error=${error.join('')}`);
			});
	}

	static show(req, res) {
		const msg = req.query.msg;
		Movie.findAll({
			include: [ { model: ProductionHouse } ],
			order: [ [ 'released_year', 'DESC' ] ]
		})
			.then((movies) => {
				res.render('movie', { movies, msg });
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static editGet(req, res) {
		const error = req.query. error
		let movies = null;
		Movie.findByPk(Number(req.params.id))
			.then((data) => {
				movies = data;

				return ProductionHouse.findAll().then((productionHouse) => {
					res.render('movieEdit', { movies, productionHouse , error});
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
				ProductionHouseId: Number(req.body.productionHouse),
				rating: req.body.rating
			},
			{
				where: {
					id: req.params.id
				}
			}
		)
			.then((sukses) => {
				res.redirect('/movies/');
			})
			.catch((err) => {
				let error = [];
				for (let i = 0; i < err.errors.length; i++) {
					error.push(err.errors[i].message);
				}
				res.redirect(`/movies/${req.params.id}/edit/?error=${error.join('')}`);
			});
	}

	static delete(req, res) {
		let data;
		Movie.findByPk(req.params.id)
			.then((movies) => {
				data = movies.name;
				return Movie.destroy({
					where: {
						id: req.params.id
					}
				}).then((hapus) => {
					res.redirect(`/movies/?msg=Succesfully deleted (${data}) movie`);
				});
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static deleteQuestion(req, res) {
		Movie.findByPk(Number(req.params.id))
			.then((movies) => {
				res.render('movieQuestion', { movies });
			})
			.catch((err) => {
				res.send(err);
			});
	}

	static addCastForm(req, res) {
		const error = req.query.error;
		let movies = null;
		let casts = null;
		Movie.findByPk(req.params.id).then((data) => {
			movies = data;

			return Cast.findAll().then((artis) => {
				casts = artis;
				return MovieCast.findAll({
					where: {
						MovieId: Number(req.params.id)
					}
				}).then((data) => {
					res.render('addCastToMovie', { movies, casts, error, data });
				});
			});
		});
	}

	static addCastToMovie(req, res) {
		MovieCast.create({
			CastId: req.body.castId,
			MovieId: req.params.id,
			role: req.body.role
		})
			.then((sukses) => {
				res.redirect('/movies');
			})
			.catch((err) => {
				let error = [];
				for (let i = 0; i < err.errors.length; i++) {
					error.push(err.errors[i].message);
				}
				res.redirect(`/movies/${req.params.id}/addCast/?error=${error.join('')}`);
			});
	}
}

module.exports = MovieController;

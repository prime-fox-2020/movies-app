'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Movie extends Model {

  }
  Movie.init({
    name: DataTypes.STRING,
    released_year: {type: DataTypes.INTEGER,
    validate: {
      isKabisat(value) {
        if (value % 400 === 0 || value % 400 !== 0 && value % 100 !== 0 && value % 4 === 0) {
          throw new Error ('Unable to add movie when kabisat')
        }
      }
    }},
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {
    sequelize
  });
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    Movie.belongsToMany(models.Cast, {through: models.MovieCast})
  };
  return Movie;
};
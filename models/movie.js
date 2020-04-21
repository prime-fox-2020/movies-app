'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  class Movie extends Model {}
  Movie.init({
    name: DataTypes.STRING,
    released_year: 
    {
      type: DataTypes.INTEGER,
      validate: {
        isintercalary(released_year) {
          if (released_year % 4 == 0) {
            throw new Error('Tidak boleh merelease film di tahun kabisat bro!');
          }
        }
      } 
    },
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER,
  }, {sequelize});

  Movie.associate = function(models) {
    Movie.belongsTo(models.ProductionHouse)
    Movie.belongsToMany(models.Cast, {through: models.MovieCast})
    // Movie.belongsTo(models.MovieCast)
  };
  return Movie;
};
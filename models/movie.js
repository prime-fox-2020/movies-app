'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  
  class Movie extends Model {}

  Movie.init({
    name: DataTypes.STRING,
    releasedYear: {
      type: DataTypes.INTEGER,
      validate: {
        isLeapYear(value) {
          if((Number(value) % 4 === 0 && Number(value) % 100 !== 0) || Number(value) % 400 === 0) {
            throw new Error("Movie can't be released on leap year to avoid bad luck.");
          }
        }
      }
    },
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {sequelize});
  Movie.associate = function(models) {
    Movie.belongsTo(models.ProductionHouse);
    Movie.belongsToMany(models.Cast, {through: models.MovieCast});
    Movie.hasMany(models.MovieCast);
  };
  return Movie;
};
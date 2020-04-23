'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Movie extends Model{}
  
  Movie.init({
    name: DataTypes.STRING,
    releasedYear: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER
  }, { sequelize });

  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    Movie.hasMany(models.MovieCast)
  };
  return Movie;
};
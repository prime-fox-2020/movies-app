'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Movie extends Model { }
  
  Movie.init({
    name: DataTypes.STRING,
    released_year: DataTypes.INTEGER,
    genre: DataTypes.STRING, 
    ProductionHouseId: DataTypes.INTEGER, //add new PH Id
    rating: DataTypes.INTEGER //add new rating
  }, {});
  
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    
    Movie.belongsToMany(models.Cast, { through: models.MovieCast })

  };
  return Movie;
};
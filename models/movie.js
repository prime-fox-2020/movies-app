'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Movie extends Model {}

  Movie.init({
    name: DataTypes.STRING,
    released_year: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER
  }, {sequelize});
  
  // const Movie = sequelize.define('Movie', {
  //   name: DataTypes.STRING,
  //   released_year: DataTypes.INTEGER,
  //   genre: DataTypes.STRING,
  //   ProductionHouseId: DataTypes.INTEGER
  // }, {});
  Movie.associate = function(models) {
    Movie.belongsTo(models.ProductionHouse);
    // associations can be defined here
  };
  return Movie;
};
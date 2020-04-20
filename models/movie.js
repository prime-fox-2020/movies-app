'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  class Movie extends Model {}

  Movie.init({
    name: DataTypes.STRING,
    released_year: DataTypes.INTEGER,
    genre: DataTypes.STRING
  }, {sequelize});
  Movie.associate = function(models) {
    // associations can be defined here
  };
  return Movie;
};

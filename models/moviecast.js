'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class MovieCast extends Model { }

  MovieCast.init({
    role: DataTypes.STRING,
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER
  }, { sequelize });
  MovieCast.associate = function(models) {
    // associations can be defined here
  };
  return MovieCast;
};
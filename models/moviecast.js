'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model  = sequelize.Sequelize.Model
  class MovieCast extends Model {

  }

  MovieCast.init ({
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, { sequelize });
  MovieCast.associate = function(models) {
    // associations can be defined here
  };
  return MovieCast;
};
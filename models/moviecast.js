'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class MovieCast extends Model {}
  MovieCast.init({
    CastId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {sequelize})

  MovieCast.associate = function(models) {
    // associations can be defined here
  };
  return MovieCast;
};
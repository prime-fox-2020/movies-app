'use strict';
module.exports = (sequelize, DataTypes) => {
  const MovieCast = sequelize.define('MovieCast', {
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {});
  MovieCast.associate = function(models) {
    // associations can be defined here
  };
  return MovieCast;
};
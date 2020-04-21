'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class MovieCast extends Model{}
  MovieCast.init({
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER,
    role: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg : `Role must be filled`
        }
      }}
  }, { sequelize });
  MovieCast.associate = function(models) {
  };
  return MovieCast;
};
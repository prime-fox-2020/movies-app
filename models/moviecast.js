'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class MovieCast extends Model {}

  MovieCast.init({
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {sequelize});
  MovieCast.associate = function(models) {
    // associations can be defined here
    MovieCast.belongsTo(models.Movies)
    MovieCast.belongsTo(models.Cast)

  };
  return MovieCast;
};
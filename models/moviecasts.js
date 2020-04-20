'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class MovieCasts extends Model {

  }

  MovieCasts.init({
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, { sequelize })

  MovieCasts.associate = function (models) {
    // associations can be defined here
    MovieCasts.belongsTo(models.Casts);
    MovieCasts.belongsTo(models.Movies);
  };
  return MovieCasts;
};
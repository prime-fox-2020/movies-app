'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model

  class MovieCast extends Model{

  }
  
  MovieCast.init({
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER
  }, {sequelize});
  MovieCast.associate = function(models) {
    // associations can be defined here
    MovieCast.belongsTo(models.Cast,{ foreignKey: 'CastId' });
    MovieCast.belongsTo(models.Movie,{ foreignKey: 'MovieId' });
  };
  return MovieCast;
};
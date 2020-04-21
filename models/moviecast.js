'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class MovieCast extends Model {}

  MovieCast.init({
    MovieId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    CastId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {sequelize});

  MovieCast.associate = function(models) {
    // associations can be defined here
    MovieCast.belongsTo(models.Movie)
    MovieCast.belongsTo(models.Cast)
  };
  
  return MovieCast;
};
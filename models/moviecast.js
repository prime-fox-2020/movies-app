'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class MovieCast extends Model {}

  MovieCast.init({
    MovieId: {
      type: DataTypes.INTEGER
    },
    CastId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Cast must be filled.'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg: 'Role must be filled.'
        }
      }
    }
  }, {sequelize});
  MovieCast.associate = function(models) {
    MovieCast.belongsTo(models.Movie);
    MovieCast.belongsTo(models.Cast);
  };
  return MovieCast;
};
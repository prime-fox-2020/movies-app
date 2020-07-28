'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class MovieCast extends Model { }

  MovieCast.init({
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER,
    role: {                     //custom valid
      type: Sequelize.STRING,
      validate : {
        notEmpty : {
          msg : `Please do not leave an empty data`
        }
      }
    }
  }, { sequelize });
   
  MovieCast.associate = function(models) {
    // associations can be defined here
  };
  return MovieCast;
};
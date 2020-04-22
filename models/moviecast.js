'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  class MovieCast extends Model {}

  MovieCast.init({
    role: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Role is empty'
        }
      }
    },
    MovieId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        customNull(value) {
          if(value === null) {
            throw new Error('Actor is invalid')
          }
        }
      }
    },
    CastId: DataTypes.INTEGER
  }, {sequelize});
  MovieCast.associate = function(models) {
    // associations can be defined here
  };
  return MovieCast;
};

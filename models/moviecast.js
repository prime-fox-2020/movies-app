'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model     = Sequelize.Model
  class MovieCast extends Model {}
  MovieCast.init({
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER,
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Role cannot be empty'
        },
        notEmpty: {
          msg: 'Role cannot be empty'
        }
      }
    }
  }, {sequelize});
  MovieCast.associate = function(models) {
    // associations can be defined here
    
  };
  return MovieCast;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class MovieCast extends Model {}
  MovieCast.init({
    CastId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER,
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please input the role'
        }
      }
    }
  }, {sequelize})

  MovieCast.associate = function(models) {
    // associations can be defined here
    MovieCast.belongsTo(models.Cast)
  };
  return MovieCast;
};
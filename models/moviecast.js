'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class MovieCast extends Model {}

  MovieCast.init({
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'role tidak boleh kosong'
        }
      }
    } ,
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER,
    createdAt: new Date(),
    updatedAt: new Date()
  },{sequelize})
  // const MovieCast = sequelize.define('MovieCast', {
  // }, {});
  MovieCast.associate = function(models) {
    // associations can be defined here
  };
  return MovieCast;
};
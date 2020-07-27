'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Cast_Movie extends Model { }
  Cast_Movie.init({
    CastId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER,
    roles: DataTypes.STRING
  }, { sequelize })


  // const Cast_Movie = sequelize.define('Cast_Movie', {
  //   cast_id: DataTypes.INTEGER,
  //   movie_id: DataTypes.INTEGER
  // }, {});
  Cast_Movie.associate = function (models) {
    // associations can be defined here
    // models.Cast.belongsToMany(models.Movie, { through: Cast_Movie })
    // models.Movie.belongsToMany(models.Cast, { through: Cast_Movie })
  };
  return Cast_Movie;
};
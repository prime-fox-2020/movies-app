'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model

  class Movies extends Model {

  }

  Movies.init({
    name: DataTypes.STRING,
    released_year: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER
  },{sequelize})


  Movies.associate = function (models) {
    // associations can be defined here
    Movies.belongsTo(models.ProductionHouses);
    Movies.belongsToMany(models.Casts, { 
      through: models.MovieCasts});
    Movies.hasMany(models.MovieCasts)
    // Movies.hasMany(model.MovieCasts)
  };
  return Movies;
};
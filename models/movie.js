'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Movie extends Model {

  }

  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type : Sequelize.INTEGER,
      validate : {
        kabisatCheck(value){
          const year = Number(value)
          if(year % 4 === 0 && year % 100 !== 0){
            throw error
          } else if( year % 4 === 0 && year % 100 === 0 && year % 400 === 0){
            throw error
          }
        }
      }
    },
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {
    sequelize
  });

  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    Movie.belongsToMany(models.Cast, {through:models.MovieCast})

  };
  return Movie;
};
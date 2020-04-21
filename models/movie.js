'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize=sequelize.Sequelize
  const Model=Sequelize.Model

  class Movie extends Model{

  }

  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type:DataTypes.STRING,
      validate:{
        isKabisat(year){
          if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
            throw new Error('this year is leap year')
          }
        }
      }
    },
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER
  }, {sequelize});

  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    Movie.belongsToMany(models.Cast,{ through : models.MovieCast })
  };

  return Movie;
};
'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Movie extends Model {
    
  }

  Movie.init( {
    name: DataTypes.STRING,
    released_year: {
      type: DataTypes.INTEGER,
      validate : {
        isLeapYear(value) {
          if(value % 4 === 0) {
            throw new Error('Leap Year is wrong')
          }
        }
      }
    },

    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER,
    rating : DataTypes.INTEGER
  }, { sequelize });

  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    Movie.hasMany(models.MovieCast)
  };
  
  return Movie;
};
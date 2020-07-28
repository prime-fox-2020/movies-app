'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Movie extends Model { }
  
  Movie.init({
    name: DataTypes.STRING,
    released_year: { // custom validation
      type : Sequelize.INTEGER,
      validate : {
        checkValidityAndKabisat(temp){
          let year = Number(temp)
          if((year % 4 == 0 && year % 100 != 0) || year % 4 == 0 && year % 100 == 0 && year % 400 == 0){
            throw new Error('Highly not recommended to release movie on kabisat year')
          }else if (!year){
            throw new Error('incorrect value of release year')
          }else if(year > 2020){
            throw new Error('Invalid released year')
          }
        }
      }
    },
    genre: DataTypes.STRING, 
    ProductionHouseId: DataTypes.INTEGER, //add new PH Id
    rating: DataTypes.INTEGER //add new rating
  }, { sequelize });

  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    
    Movie.belongsToMany(models.Cast, { through: models.MovieCast })

  };
  return Movie;
};
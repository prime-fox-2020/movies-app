'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Movie extends Model{}
  Movie.init({
    name: {
      type : DataTypes.STRING
      // validate : {
      //   isName(value){
      //     if(isNaN(value)){
      //       throw new Error(`Invalid Empty Name`)
      //     }
      //   }
      // }
    },
    released_year: {
      type : DataTypes.INTEGER,
      validate: {
        isKabisatYear(value) {
          if(isNaN(value)){
            throw new Error('Invalid Empty Year')
          } else {
            const number = Number(value)
            if(number%4===0){
              throw new Error("Tahun Kabisat - Tidak bisa menginput movie")
            }
          }
        }
      }
    },
    genre: {
      type : DataTypes.STRING
      // validate : {
      //   isGenre(value){
      //     if(isNaN(value)){
      //       throw new Error(`Invalid Empty Genre`)
      //     }
      //   }
      // }
    },
    ProductionHouseId: DataTypes.INTEGER,
    rating: {
      type : DataTypes.INTEGER,
      validate : {
        isRating(value){
          if(isNaN(value)){
            throw new Error(`Invalid Empty Rating`)
          } else {
            if(Number(value)<1 || Number(value)>5){
              throw new Error(`Invalid Rating Value`)
            }
          }
        }
      }
    }
  }, { sequelize });
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    Movie.belongsToMany(models.Cast, {through:models.MovieCast})
  };
  return Movie;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Movie extends Model{}
  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type : DataTypes.INTEGER,
      validate: {
        isKabisatYear(value) {
          if(isNan(value)){
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
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER,
    rating: {
      type : DataTypes.INTEGER,
      validate : {
        min : 1,
        max : 5
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
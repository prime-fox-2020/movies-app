'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Movie extends Model{}

  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type : Sequelize.INTEGER,
      validate : {
        isKabisatYear(value){
          if(isNaN(value)){
            throw new Error('Invalid released year')
          } else {
            const num = Number(value)
            if(num % 4 === 0 && num % 100 !== 0){
              throw new Error('Unable to release movie in Kabisat Year')
            } else if( num % 4 === 0 && num % 100 === 0 && num % 400 === 0){
              throw new Error('Unable to release movie in Kabisat Year')
            }
          }
        }
      }
    },
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {sequelize});


  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    Movie.belongsToMany(models.Cast, {through: models.MovieCast})

  };
  return Movie;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Movie extends Model{}

  Movie.init({
    name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg : 'Fill in your movie name!'
        }
      }
    },
    released_year: {
      type : Sequelize.INTEGER,
      validate : {
        isKabisatYear(value){
          if(isNaN(value)){
            throw new Error('Invalid released year')
          } else {
            const num = Number(value)
            if(num % 4 === 0 && num % 100 !== 0){
              throw new Error('This is Kabisat year, unable to release movie')
            } else if( num % 4 === 0 && num % 100 === 0 && num % 400 === 0){
              throw new Error('this is Kabisat year, unable to release movie')
            }
          }
        }
      }
    },
    genre: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg : 'Genre is required'
        }
      }
    },
    ProductionHouseId: DataTypes.INTEGER,
    rating: {
      type: Sequelize.INTEGER,
      allowNull : true,
      validate : {
        ratingCheck(value){
          if(isNaN(value)){
            throw new Error('Invalid rating input')
          }
          if(Number(value) > 5 || Number(value) <1){
            throw new Error('Rating is between 1 and 5')
            
          }
        }
      }
    }
  }, {sequelize});

  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    Movie.belongsToMany(models.Cast, {through: models.MovieCast})
  };
  return Movie;
};
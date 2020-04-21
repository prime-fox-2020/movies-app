'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  class Movie extends Model {
  }

  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type : Sequelize.INTEGER,
      validate : {
        isKabisat(value){
          if(isNaN(value)){
            throw new Error('Invalid released year')
          } else {
            const num = Number(value)
            if(num % 4 === 0 && num % 100 !== 0){
              res.send('Tahun kabisat')
            } else if( num % 4 === 0 && num % 100 === 0 && num % 400 === 0){
              res.send('Tahun kabisat')
            }
          }
        }
      }
    },
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER,
    Rating: {
      type: Sequelize.INTEGER,
      validate: {
        ratingCheck(value){
          if (Number(value) > 5 || Number(value) < 1) {
            res.send('Invalid rating');
          }
        }
      }
    }
  }, {sequelize});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.hasMany(models.MovieCast);
    Movie.belongsTo(models.ProductionHouse);
    Movie.belongsToMany(models.Cast, {through: models.MovieCast});
  };
  return Movie;
};

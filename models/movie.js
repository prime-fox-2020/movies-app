'use strict';
// const isKabisat = require('../helpers/isKabisat')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Movie extends Model {}

  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type: DataTypes.INTEGER,
      validate: {
        isKabisat(year){
          if((year % 4 === 0 && year % 100 !== 0) || (year % 4 === 0 && year % 100 === 0 && year % 400 === 0)){
              throw new Error('Jangan tahun kabisat')
          }
        }
      }
    },
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
  }, { sequelize })

  // Movie.beforeCreate((movie, options) => {
  //   if(!isKabisat(this.released_year)){
  //     throw new Error('Jangan tahun kabisat')
  //   }
  // })

  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    Movie.belongsToMany(models.Cast, { through: models.MovieCast });
  };
  return Movie;
};
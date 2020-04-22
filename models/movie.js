'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Movie extends Model {}

  Movie.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    released_year: {
      type: DataTypes.STRING,
      validate: {
        isKabisat(num) {
          if (!num) {
            throw new Error('Released Year harus diisi')
          } else if (num % 400 === 0){
            throw new Error('Tahun Kabisat! Ganti ya!')
          } else if (num % 400 !== 0 && num % 100 !==0 && num % 4 === 0) {
            throw new Error('Tahun Kabisat! Ganti ya!')
          }
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    ProductionHouseId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    rating: DataTypes.INTEGER
  }, {sequelize});

  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    Movie.belongsToMany(models.Cast, {through: models.MovieCast})
    Movie.hasMany(models.MovieCast)
  };

  return Movie;
};
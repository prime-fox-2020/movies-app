'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Movie extends Model {}

  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type: DataTypes.INTEGER,
      validate: {
        isKabisat(value) {
          console.log(value);
          if((value % 400 == 0) || (value % 4 == 0 && value % 100 !== 0)) {
            throw new Error('Film tidak bisa dibuat di tahun kabisat');
          }
        }
      }
    }, 
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER
  }, {sequelize});
  
  Movie.associate = function(models) {
    Movie.belongsTo(models.ProductionHouse);
    Movie.belongsToMany(models.Cast, {through: models.MovieCast});
    // associations can be defined here
  };
  return Movie;
};
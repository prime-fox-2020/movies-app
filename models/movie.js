'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model

  class Movie extends Model {

  }

  Movie.init({
    name: DataTypes.STRING,
    released_year: { type: DataTypes.INTEGER,
    validate: {
        isLeapYear(value){
          if(value % 4 === 0){
            throw new Error('badluck year')
          }
        }
      }
    },
    
    genre: DataTypes.STRING,
    productionHouseId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {sequelize});

  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse,{ foreignKey: 'productionHouseId' })
    Movie.belongsToMany(models.Cast, { 
      through: models.MovieCast});
    Movie.hasMany(models.MovieCast)
  };
  return Movie;
};
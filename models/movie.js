'use strict';
module.exports = (sequelize, DataTypes) => { 
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Movie extends Model{}
  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type :DataTypes.INTEGER,
      validate: {
        isKabisat(value){
          if(value % 4 !== 0){
            throw new Error('Bukan Tahun Kabisat!');
          }else if(value % 100 !== 0){

          }else if(value % 400 !==0){
            throw new Error('Bukan Tahun Kabisat!')

          }
        }
      }
    },
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER    
  },{sequelize})
  // const Movie = sequelize.define('Movie', {
  //   name: DataTypes.STRING,
  //   released_year: DataTypes.INTEGER,
  //   genre: DataTypes.STRING,
  //   ProductionHouseId: DataTypes.INTEGER
  // }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    Movie.belongsToMany(models.Cast, { through: models.Cast_Movie })
  };
  return Movie;
};
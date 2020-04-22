'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Movie extends Model {
    isKabisat(){

    }
  }

  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type: DataTypes.INTEGER,
      validate:{
        isKabisat(){
         if(this.released_year % 400 == 0){
          throw new err ("ini tahun kabisat, dilarang membuat film")
        } else if(this.released_year % 100 == 0){
          throw new err ('ini tahun kabisat, dilarang membuat film')
        } 
        // else{
        //   console.log(this.released_year)
        // }
      }
      }
    },
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {sequelize});


  // const Movie = sequelize.define('Movie', {
  //   name: DataTypes.STRING,
  //   released_year: DataTypes.INTEGER,
  //   genre: DataTypes.STRING
  // }, {});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    Movie.belongsToMany(models.Cast,{through: models.MovieCast})
  };
  return Movie;
};
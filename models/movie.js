'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Movie extends Model{}
  
Movie.init({
    name: {
      type: DataTypes.STRING,
      validate :{
        notEmpty:{
          msg : 'Name nya diisi dong'
        }
      }
      
    },
    released_year: {
      type: DataTypes.INTEGER,
    validate:{
      isKabisat(value){
        if(value % 400 === 0 || value % 400 !== 0 && value % 100 !== 0 && value % 4 === 0){
          throw new Error('Maaf ya tahunnya jangan kabisat')
        }
      }
    }},
    genre:{
      type: DataTypes.STRING,
      validate :{
        notEmpty:{
          msg : 'Genre lu apa'
        }
      }
      
    },
    ProductionHouseId: DataTypes.INTEGER,
    rating: {
      type: DataTypes.INTEGER,
     
      
    }
    
  }, {sequelize});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)

    Movie.belongsToMany(models.Cast,{through:models.MovieCast});
  };
  return Movie;
};
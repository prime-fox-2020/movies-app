'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Movies extends Model {}
  
  Movies.init({
    name: DataTypes.STRING,
    released_year:{
      type: DataTypes.INTEGER,
      validate: {
        kabisat(value) {
          if(value % 4 == 0 || value % 400 == 0){
            throw new Error('tahun kabisat, lebih baik jangan')
          }
        }
      }
    },
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER
  }, { sequelize });


  Movies.associate = function(models) {
    // associations can be defined here
    Movies.belongsTo(models.ProductionHouse)
    Movies.belongsToMany(models.Cast,{through:models.MovieCast})
  };
  return Movies;
};
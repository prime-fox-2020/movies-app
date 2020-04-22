'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  
  class Movies extends Model {}

  Movies.init({
    name: DataTypes.STRING,
    released_year: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty : {
          msg: "Released year tidak boleh kosong"
        },
        isKabisat(value) {
          if ((value % 4 == 0 && value % 100 != 0) || (value % 4 == 0 && value % 100 == 0 && value % 400 == 0)) {
            throw new Error('Tidak bisa add atau edit movies yang release pada tahun kabisat')
          }
        }
      }
    },
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER,
    rating: {
      type: DataTypes.INTEGER,
      validate : {
        min: {
          args: [1],
          msg: "Minimal rating 1"
        },                  
        max: {
          args: [10],
          msg: "Maximal rating 10"
        },
        notEmpty: {
          msg: "Rating tidak boleh kosong"
        }
      }
    } 
  }, {sequelize});
  Movies.associate = function(models) {
    // associations can be defined here
    Movies.belongsTo(models.ProductionHouse)
    Movies.belongsToMany(models.Cast, {
      through: models.MovieCast, 
      foreignKey: 'MovieId'
    });
    Movies.hasMany(models.MovieCast)

  };
  return Movies;
};
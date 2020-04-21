'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model     = Sequelize.Model
  class Movie extends Model{}
  Movie.init({
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg: 'Nama harus diisi'
        }
      }
    },
    released_year: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isKabisat(value){
          if(value === undefined || value === 0){
            throw new Error('Released Year harus diisi')
          }else if(value % 400 === 0){
            throw new Error('Ini tahun kabisat. Inget Ramalannya')
          }else if(value % 400 !== 0 && value % 100 !==0 && value % 4 === 0){
            throw new Error('Ini tahun kabisat. Inget Ramalannya')
          }
        }
      }
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notSelect(value){
          if(value === "Choose...") throw new Error('Genre Harus diisi')
        }
      }
    },
    ProductionHouseId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notSelect(value){
          if(value === "---SELECT---") throw new Error('Production House harus diisi')
        }
      }
    }
  }, {sequelize});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    Movie.belongsToMany(models.Cast, { through: models.MovieCast })
  };
  return Movie;
};
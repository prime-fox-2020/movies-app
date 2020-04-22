'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Movie extends Model { }

  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type: DataTypes.INTEGER,
      validate: {
        isKabisat (value) {
          let cekKabisat = false
          if (value % 400 == 0) {
            cekKabisat = true
          } else{
            if (value % 100 != 0 && value % 4 == 0) {
              cekKabisat = true
            }
          }

          if (cekKabisat) {
            throw new Error('Tahun ini merupakan tahun kabisat mohon menunggu untuk merilis movie')
          }
        }
      }
    },
    genre: DataTypes.STRING,
    ProductionHouseId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, { sequelize });

  Movie.associate = function (models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse)
    Movie.belongsToMany(models.Cast, { through: models.MovieCast })
  };
  return Movie;
};
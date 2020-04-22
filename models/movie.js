'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Movie extends Model { }

  Movie.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Input Movie Name'
        }
      }
    },
    released_year: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Input released year'
        },
        max: {
          args: 2020,
          msg: 'Invalid year'
        },
        min: {
          args: 1500,
          msg: 'Invalid year'
        },
        isKabisat(value) {
          if (value !== '' && value >= 1500 && value <= 2020) {
            if ((value % 400 == 0) || (value % 4 == 0 && value % 100 !== 0)) {
              throw new Error('Film tidak bisa dibuat di tahun kabisat');
            }
          }
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Choose genre'
        }
      }
    },
    ProductionHouseId: DataTypes.INTEGER
  }, {
    // validate: {
    //   isKabisat() {
    //     console.log(this.released_year);
    //     if ((this.released_year % 400 == 0) || (this.released_year % 4 == 0 && this.released_year % 100 !== 0)) {
    //       throw new Error('Film tidak bisa dibuat di tahun kabisat');
    //     }
    //   }
    // },
    sequelize
  });

  Movie.associate = function (models) {
    Movie.belongsTo(models.ProductionHouse);
    Movie.belongsToMany(models.Cast, { through: models.MovieCast });
    // associations can be defined here
  };
  return Movie;
};
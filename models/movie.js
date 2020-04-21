'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Movie extends Model{};

  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type: DataTypes.INTEGER,
      validate: {
        isLeap(year) {
          if (year % 400 == 0) {
            throw new Error('Cannot add Movie in this year');
          } else if (year % 400 != 0 && year % 100 != 0 && year % 4 == 0) {
            throw new Error('Cannot add Movie in this year');
          }
        }
      }
    },
    genre: DataTypes.STRING,
    ProdHouseId: DataTypes.INTEGER
  }, {sequelize});
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.belongsTo(models.ProductionHouse, {foreignKey: 'ProdHouseId'});
    Movie.belongsToMany(models.Cast, { through: models.MovieCast });
  };
  return Movie;
};
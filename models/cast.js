'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Casts extends Model {
    getFullName() {
      return `${this.first_name} ${this.last_name}`
    }
  }

  Casts.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {sequelize})

  Casts.associate = function (models) {
    // associations can be defined here
    Casts.belongsToMany(models.Movies, { 
      through: models.MovieCasts})
    // Casts.hasMany(models.MovieCast);
  };
  return Casts;
};
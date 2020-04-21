'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Cast extends Model {
    getFullName(){
      return `${this.first_name} ${this.last_name}`;
    }
  }

  Cast.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {sequelize});

  Cast.associate = function(models) {
    Cast.hasMany(models.MovieCast);
  };
  return Cast;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Cast extends Model {

    getFullName() {
      return this.first_name + ' ' + this.last_name
    }
  }

  Cast.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    last_name: DataTypes.STRING,
    phone_number: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        len: [9, 12],
      }
    },
    birth_year: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
        max: new Date().getFullYear(),
        min: 1900
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    hooks: {
      afterValidate: (cast, options) => {
        if (!cast.last_name) cast.last_name = cast.first_name
      }
    },
    sequelize});

  Cast.associate = function(models) {
    // associations can be defined here
    Cast.belongsToMany(models.Movie, {through: models.MovieCast})
    Cast.hasMany(models.MovieCast)
  };

  return Cast;
};
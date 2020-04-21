'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Cast extends Model { }

  Cast.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        if (!instance.last_name) {
          instance.last_name = instance.first_name;
        }
      },
      beforeUpdate: (instance, options) => {
        if (!instance.last_name) {
          instance.last_name = instance.first_name;
        }
      }
    },
    sequelize
  });
  Cast.associate = function (models) {
    // associations can be defined here
    Cast.belongsToMany(models.Movie, { through: models.MovieCast })
  };
  return Cast;
};
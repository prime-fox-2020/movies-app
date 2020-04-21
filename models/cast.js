'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cast = sequelize.define('Cast', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {});
  Cast.associate = function(models) {
    // associations can be defined here
  };
  return Cast;
};
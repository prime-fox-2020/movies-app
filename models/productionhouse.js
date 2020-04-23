'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class ProductionHouse extends Model{}

  ProductionHouse.init({
    name: DataTypes.STRING,
    headquarter: DataTypes.STRING
  }, { sequelize });
  ProductionHouse.associate = function(models) {
    // associations can be defined here
    ProductionHouse.hasMany(models.Movie)
  };
  return ProductionHouse;
};
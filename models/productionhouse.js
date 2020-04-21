'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  
  class ProductionHouse extends Model {}

  ProductionHouse.init({
    nameProdHouse: DataTypes.STRING,
    headquarters: DataTypes.STRING
  }, {sequelize});
  ProductionHouse.associate = function(models) {
    ProductionHouse.hasMany(models.Movie);
  };
  return ProductionHouse;
};
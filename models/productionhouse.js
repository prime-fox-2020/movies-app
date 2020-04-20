'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class ProductionHouse extends Model {}

  ProductionHouse.init({
    name_prodHouse: DataTypes.STRING,
    headquarters: DataTypes.STRING
  }, {sequelize});
  
  // const ProductionHouse = sequelize.define('ProductionHouse', {
  //   name_prodHouse: DataTypes.STRING,
  //   headquarters: DataTypes.STRING
  // }, {});
  ProductionHouse.associate = function(models) {
    ProductionHouse.hasOne(models.Movie);
    // associations can be defined here
  };
  return ProductionHouse;
};
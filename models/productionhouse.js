'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class ProductionHouse extends Model{}

  ProductionHouse.init({
    prodHouse_name: DataTypes.STRING,
    headquarters: DataTypes.STRING
  },{sequelize})
  // const ProductionHouse = sequelize.define('ProductionHouse', {
  //   prodHouse_name: DataTypes.STRING,
  //   headquarters: DataTypes.STRING
  // }, {});
  ProductionHouse.associate = function(models) {
    // associations can be defined here
    ProductionHouse.hasMany(models.Movie)
  };
  return ProductionHouse;
};
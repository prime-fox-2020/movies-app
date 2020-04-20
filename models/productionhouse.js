'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class ProductionHouse extends Model {}

  ProductionHouse.init({
    name_prodHouse: DataTypes.STRING,
    headquarters: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {sequelize});


  // const ProductionHouse = sequelize.define('ProductionHouse', {
  //   name_prodHouse: DataTypes.STRING,
  //   headquarters: DataTypes.STRING,
  //   MovieId: DataTypes.INTEGER
  // }, {});
  ProductionHouse.associate = function(models) {
    // associations can be defined here
    ProductionHouse.hasMany(models.Movie)
  };
  return ProductionHouse;
};
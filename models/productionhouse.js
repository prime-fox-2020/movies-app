'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class ProductionHouse extends Model {}

  ProductionHouse.init({
    name_prodHouse: DataTypes.STRING,
    headquarter: DataTypes.STRING
  }, {sequelize});

  ProductionHouse.associate = function(models) {
    ProductionHouse.hasMany(models.Movie);
  };
  return ProductionHouse;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class ProductionHouses extends Model {}

  ProductionHouses.init({
    name_prodHouse: DataTypes.STRING,
    headquarters: DataTypes.STRING
  }, { sequelize });

  ProductionHouses.associate = function(models) {
    // ProductionHouses.hasMany(models.Movie)
    // associations can be defined here
  };
  return ProductionHouses;
};

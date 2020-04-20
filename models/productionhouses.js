'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model

  class ProductionHouses extends Model {

  }

  ProductionHouses.init({
    name_prodHouse: DataTypes.STRING,
    headquarters: DataTypes.STRING
  },{sequelize});


  ProductionHouses.associate = function(models) {
    // associations can be defined here
    // ProductionHouses.hasOne(models.Movies)
    ProductionHouses.hasMany(models.Movies)
    //pake nama tabel
  };
  return ProductionHouses;
};
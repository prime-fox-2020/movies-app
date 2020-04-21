'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Cast extends Model{
    fullName(){
      return `${this.first_name} ${this.last_name}`
    }

  }
  Cast.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  },{sequelize})

  Cast.beforeCreate((cast,options)=>{
    if(!cast.last_name){
      cast.last_name = cast.first_name
    }

  })
  // const Cast = sequelize.define('Cast', {
    
  // }, {});
  Cast.associate = function(models) {
    Cast.belongsToMany(models.Movie, { through: models.Cast_Movie })
    // associations can be defined here

  };
  return Cast;
};
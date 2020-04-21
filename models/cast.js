'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Cast extends Model{
    getFullName(){
      return `${this.first_name} ${this.last_name}`
    }
  }
  Cast.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate(cast, options){
        if(cast.last_name === undefined || cast.last_name === "") cast.last_name = cast.first_name
      },
      beforeBulkUpdate(cast, options){
        if(cast.attributes.last_name === undefined || cast.attributes.last_name === "") cast.attributes.last_name = cast.attributes.first_name
      }
    },sequelize});
  Cast.associate = function(models) {
    // associations can be defined here
    Cast.belongsToMany(models.Movie, { through: models.MovieCast })
  };
  return Cast;
};
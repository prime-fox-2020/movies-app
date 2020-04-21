'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Cast extends Model {
    getFullName() {
      return this.first_name + ' ' + this.last_name
    }
  }

  Cast.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, { sequelize })

  Cast.addHook('beforeCreate', (cast, options) => {
    if(!cast.last_name){
      cast.last_name = cast.first_name
    }
  });
  
  Cast.associate = function(models) {
    // associations can be defined here
    Cast.belongsToMany(models.Movie, { through: 'MovieCasts' });
  };
  return Cast;
};
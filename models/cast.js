'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Cast extends Model {
     getFullName() {
       return `${this.first_name} ${this.last_name}`
     }
  }

  Cast.init( {
    first_name: {
      type : Sequelize.STRING,
      validate : {
        notEmpty : {
          msg: 'name is required'
        }
      }
    },
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, { sequelize });
  
  Cast.addHook('beforeCreate', (instance, options) => {
    if(instance.last_name === ''){
      instance.last_name = instance.first_name
    }
  })

  Cast.associate = function(models) {
    // associations can be defined here
    //Cast.hasMany(models.MovieCast)
    Cast.belongsToMany(models.Movie, {through : models.MovieCast})
  };
  
  return Cast;
};
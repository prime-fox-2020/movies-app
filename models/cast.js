'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  
 class Cast extends Model{

  fullname(){
    return this.first_name + ' ' + this.last_name
  }
    
 }

  Cast.init({
    first_name: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg : `First Name Harus Diisi bray`
        }
      }
    },
    last_name: DataTypes.STRING,
    phone_number: { 
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg : `Phone Number Harus Diisi`
        }
      }
    },
    birth_year: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg : `Birth Year Harus Diisi bray`
        }
      }
    },
    gender: DataTypes.STRING
  }, {sequelize});

  Cast.beforeCreate((instance,option)=>{
    if (instance.dataValues.last_name.length == 0){
      instance.dataValues.last_name = instance.dataValues.first_name
    }
  })


  Cast.associate = function(models) {
    // associations can be defined here
    // Cast.hasMany(models.Movie)
    Cast.belongsToMany(models.Movie, {through: models.MovieCast})
  };
  return Cast;
};
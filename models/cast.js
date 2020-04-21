'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize=sequelize.Sequelize
  const Model=Sequelize.Model

  class Cast extends Model{
    fullName(){
      console.log(this.last_name)
      return `${this.first_name} ${this.last_name}`
    }

    static Name(){
      return Cast.findAll()
    }
  }

  Cast.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    rating: DataTypes.STRING
  }, {sequelize});

  Cast.beforeCreate((instance,options)=>{
    if(!instance.last_name){
      instance.last_name=instance.first_name
    }
  })

  Cast.associate = function(models) {
    // associations can be defined here
    Cast.belongsToMany(models.Movie,{through:models.MovieCast})
  };

  return Cast;
};
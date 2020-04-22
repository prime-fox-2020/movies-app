'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Cast extends Model { //validate by instance 
    get fullname(){
      return `${this.first_name} ${this.last_name}`
    }
  }

  Cast.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, { sequelize});

  Cast.beforeCreate( (instance, option) => {            //validate by hooks 1
    if(!instance.last_name) {instance.last_name = instance.first_name}
  })
//   Cast.addHook('beforeCreate', (instance, option) => { //validate by hooks 2
//     if(!instance.last_name) {instance.last_name = instance.first_name}
//   })

  Cast.associate = function(models) {
    // associations can be defined here
    
    Cast.belongsToMany(models.Movie, { through: models.MovieCast })

  };
  return Cast;
};

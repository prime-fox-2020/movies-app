'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  class Cast extends Model {
    fullName(){
      return this.first_name+' '+this.last_name;
    }
  }
  Cast.init({
    first_name: {
      type: DataTypes.STRING,
      // allowNull: {msg:"Nama gak boleh kosong"},
      // validate: {

      // }
    },
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        if (!instance.dataValues.last_name) {instance.last_name = instance.first_name;}
      }
    }, 
    // validate: {
    //   allowNull: false
    // },
    sequelize});
  
  Cast.associate = function(models) {
    Cast.belongsToMany(models.Movie, {through:models.MovieCast})
    // Cast.belongsTo(models.MovieCast)
  };
  return Cast;
};
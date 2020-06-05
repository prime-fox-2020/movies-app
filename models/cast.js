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
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First Name cannot be Empty'
        }
      }
    },
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate:{
        isValid(value){
          if(value <= 0) throw new Error('Birth Year cannot be Empty')
        }
      }
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
      validate : {
        notNull: {
          msg: 'Gender cannot be Empty'
        }
      }
    }
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
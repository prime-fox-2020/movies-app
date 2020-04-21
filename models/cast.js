'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Cast extends Model {
    getFullName(){
      return `${this.first_name} ${this.last_name}`;
    }
  }
  
  Cast.init({
    first_name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg : 'Fill in your first name!'
        }
      }
    },
    last_name: DataTypes.STRING,
    phone_number: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg : 'Phone Number is required'
        },
        len: {
          args: [11,14],
          msg: 'Enter phone number correctly'
        }
      }
    },
    birth_year: {
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: {
          msg : 'Birth Year is required'
        }
      }
    },
    gender: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg : 'Choose your gender!  '
        }
      }
    },
  }, {sequelize});

  Cast.beforeCreate((instance, option) => {
    if(!instance.last_name) {
      instance.last_name = instance.first_name
    }
  })

  Cast.associate = function(models) {
    // associations can be defined here
    Cast.belongsToMany(models.Movie, {through: models.MovieCast})
  };
  return Cast;
};
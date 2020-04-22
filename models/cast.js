'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Cast extends Model {
    fullName() {
      return `${this.first_name} ${this.last_name}`;
    }
  }

  Cast.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Input First Name'
        }
      }
    },
    last_name: DataTypes.STRING,
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Input phone number'
        }
      }
    },
    birth_year: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Input Birth Year'
        },
        min: {
          args: 1500,
          msg: 'Invalid year'
        },
        max: {
          args: 2019,
          msg: 'Invalid year'
        }
      }
    }, 
    gender: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Choose gender'
        }
      }
    } 
  }, {
    hooks: {
      beforeCreate: (cast) => {
        if (cast.last_name == '') cast.last_name = cast.first_name;
      },
      beforeUpdate: (cast) => {
        if (cast.last_name == '') cast.last_name = cast.first_name;
      }
    }
    , sequelize
  });

  Cast.associate = function (models) {
    Cast.belongsToMany(models.Movie, { through: models.MovieCast });
    // associations can be defined here
  };
  return Cast;
};
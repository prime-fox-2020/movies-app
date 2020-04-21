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
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {sequelize,
    hooks: {
      beforeCreate: (cast, options) => {
        if (!cast.last_name) {
          cast.last_name = cast.first_name;
          console.log(!cast.last_name);
        }
      },
      beforeUpdate: (cast, options) => {
        if (!cast.last_name) {
          cast.last_name = cast.first_name;
        }
      }
    }
  
  });

  

  Cast.associate = function(models) {
    // associations can be defined here
    Cast.belongsToMany(models.Movie, { through: models.MovieCast });
  };
  return Cast;
};
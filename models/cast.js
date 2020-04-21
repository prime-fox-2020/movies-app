'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class Cast extends Model {
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }

  Cast.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    birthYear: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (cast, options) => {
        if(cast.lastName.trim() === '') {
          cast.lastName = cast.firstName;
        }
      }
    }
  });
  Cast.associate = function(models) {
    Cast.belongsToMany(models.Movie, {through: models.MovieCast});
    Cast.hasMany(models.MovieCast);
  };
  return Cast;
};
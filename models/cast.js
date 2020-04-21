'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Cast extends Model {
    getFullName() {
      return this.first_name + ' ' + this.last_name
    }

  }

  Cast.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {sequelize});

  Cast.beforeCreate((cast, options) => {
    if (cast.last_name == '') {
      console.log("====sebelum create======");
      cast.last_name = cast.first_name
      console.log("====sebelum create======");
    }
  });

  Cast.associate = function(models) {
    // associations can be defined here
    Cast.belongsToMany(models.Movies, {through: models.MovieCast});
  };
  return Cast;
};
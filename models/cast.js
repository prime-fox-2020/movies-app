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
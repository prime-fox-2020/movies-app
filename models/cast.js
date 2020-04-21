'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cast extends Model {
    getFullName () {
      return this.first_name + ' ' + this.last_name
    }
  }
  Cast.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    sequelize
  });
  Cast.addHook('beforeCreate', (data, option) => {
    console.log(data.last_name)
    if (data.last_name.length < 1) {
      console.log('=====================')
      console.log('masuk')
      console.log('=====================')
      let lastN = data.first_name
      data.last_name = lastN
      // console.log(data)
      // return data;
    } else {
      return data;
    }
  })
  Cast.associate = function(models) {
    // associations can be defined here
    Cast.belongsToMany(models.Movie, {through: models.MovieCast})
  };
  return Cast;
};
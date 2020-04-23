'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model

  class MovieCast extends Model{

  }
  
  MovieCast.init({
    MovieId: DataTypes.INTEGER,
    CastId: DataTypes.INTEGER,
    role: { type: DataTypes.STRING,
      validate: {
          isOkay(value){
            if(value === ""){
              throw new Error('role tidak boleh kosong')
            }
          }
        }
      }
  }, {sequelize});
  MovieCast.associate = function(models) {
    // associations can be defined here
    MovieCast.belongsTo(models.Cast,{ foreignKey: 'CastId' });
    MovieCast.belongsTo(models.Movie,{ foreignKey: 'MovieId' });
  };
  return MovieCast;
};
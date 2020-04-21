'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        return queryInterface.bulkInsert('MovieCasts', [
        {
          MovieId : 1,
          CastId : 1, 
          role: 'Aktor Utama',
          createdAt: new Date(),
          updatedAt : new Date()
        },{
          MovieId : 1,
          CastId : 2, 
          role: 'Aktris Utama',
          createdAt: new Date(),
          updatedAt : new Date()
        },{
          MovieId : 2,
          CastId :  1,
          role: 'Pemeran Pembantu Pria',
          createdAt: new Date(),
          updatedAt : new Date()
        },{
          MovieId : 2,
          CastId : 3,
          role: 'Pemeran Pembantu Wanita',
          createdAt: new Date(),
          updatedAt : new Date()
        },], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('MovieCasts', null, {});
  }
};

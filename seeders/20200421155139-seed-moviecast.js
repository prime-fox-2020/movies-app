'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('MovieCasts', [
      {
        CastId: 1,
        MovieId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'utama'
      },
      {
        CastId: 4,
        MovieId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'pembantu'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('MovieCasts', null, {});
  }
};

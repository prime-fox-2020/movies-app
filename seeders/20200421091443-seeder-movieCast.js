'use strict';

/**
 * MOVIECAST
 * id  MovieId  CastId  role
 * 1   1        1       lead
 * 2   1        2       support
 * 3   2        1       lead
 * 4   2        2       support
 * 5   3        1       lead
 * 6   3        2       support
 * 7   4        1       lead
 * 8   4        2       support
 * 9   5        1       lead
 * 10  5        2       support
 * 
 */

module.exports = {
  up: (queryInterface, Sequelize) => {
    // return queryInterface.bulkInsert('MovieCasts', 
    // [
    //   {
    //     MovieId: 1,
    //     CastId: 2,
    //     role: 'gunman',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    // ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

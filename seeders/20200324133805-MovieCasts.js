'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MovieCasts', 
    [
      {
        MovieId: 1,
        CastId: 1,
        role: "supporting cast",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        MovieId: 1,
        CastId: 2,
        role: "asian lead",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        MovieId: 1,
        CastId: 3,
        role: "rear cast",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
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

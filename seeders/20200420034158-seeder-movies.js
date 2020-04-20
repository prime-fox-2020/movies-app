'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Movies', [
      {
        name: 'Mr.Bean',
        released_year: 2000,
        genre: 'comedy',
        ProductionHouseId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Avengers',
        released_year: 2001,
        genre: 'action',
        ProductionHouseId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jaws',
        released_year: 2002,
        genre: 'horror',
        ProductionHouseId: 3,
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
    return queryInterface.bulkDelete('Movies', null, {});

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

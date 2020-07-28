'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Movies', [
      {
        name: 'Mr.Bean',
        released_year: 2000,
        genre: 'Comedy',
        ProductionHouseId: 1,
        rating: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Avengers',
        released_year: 2001,
        genre: 'Action',
        ProductionHouseId: 2,
        rating: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jaws',
        released_year: 2002,
        genre: 'Horror',
        ProductionHouseId: 3,
        rating: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cintaku Kepentok Sudoku',
        released_year: 2020,
        genre: 'Comedy',
        ProductionHouseId: 3,
        rating: 10,
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

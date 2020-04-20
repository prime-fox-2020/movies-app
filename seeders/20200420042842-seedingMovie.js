'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Movies', 
    [
      {
      name: 'Inside Out',
      released_year: 2014,
      genre: 'animation',
      ProductionHouseId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Shawsank',
      released_year: 1994,
      genre: 'drama',
      ProductionHouseId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'SAW',
      released_year: 2015,
      genre: 'thriller',
      ProductionHouseId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
      },
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

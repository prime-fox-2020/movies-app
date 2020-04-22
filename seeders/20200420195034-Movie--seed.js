'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Movies', [
    {
      name: 'American Pie',
      released_year: 2008,
      genre: 'Comedy',
      ProductionHouseId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Scary Stories',
      released_year: 2007,
      genre: 'Horror',
      ProductionHouseId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Epic Stories',
      released_year: 2009,
      genre: 'Action',
      ProductionHouseId: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sad Stories',
      released_year: 2009,
      genre: 'Drama',
      ProductionHouseId: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Kids Stories',
      released_year: 2009,
      genre: 'Animation',
      ProductionHouseId: 11,
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

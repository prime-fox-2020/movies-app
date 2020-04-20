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

   return queryInterface.bulkInsert('Movies', [
  {
    name: 'Aladdin',
    released_year: 1992,
    genre: 'Animation',
    ProductionHouseId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Tarzan',
    released_year: 1999,
    genre: 'Adventure',
    ProductionHouseId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Up',
    released_year: 2009,
    genre: 'Animation',
    ProductionHouseId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Cars',
    released_year: 2006,
    genre: 'Animation',
    ProductionHouseId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Gone with the Wind',
    released_year: 1939,
    genre: 'Romance',
    ProductionHouseId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'North by Northwest',
    released_year: 1959,
    genre: 'Mystery',
    ProductionHouseId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Back to the future',
    released_year: 1985,
    genre: 'Sci-fi',
    ProductionHouseId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Jurassic Park',
    released_year: 1993,
    genre: 'Action',
    ProductionHouseId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Roman Holiday',
    released_year: 1953,
    genre: 'Romance',
    ProductionHouseId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    name: 'Interstellar',
    released_year: 2014,
    genre: 'Sci-fi',
    ProductionHouseId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
     return queryInterface.bulkDelete('Movies', null, {});
  }
};

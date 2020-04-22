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
   return queryInterface.bulkInsert('Movies', [{
    name: 'Titanic',
    released_year: 1990,
    genre:'Drama',
    ProductionHouseId: 1,
    createdAt:new Date(),
    updatedAt:new Date()
  }, {
    name: 'Titanic 2',
    released_year: 1999,
    genre:'Drama',
    ProductionHouseId: 2,
    createdAt:new Date(),
    updatedAt:new Date()
  }, {
    name: 'Awas Ada Sule',
    released_year: 2008,
    genre:'Comedy',
    createdAt:new Date(),
    updatedAt:new Date()
  }], {});
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

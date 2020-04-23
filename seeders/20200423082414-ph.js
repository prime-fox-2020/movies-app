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

    return queryInterface.bulkInsert('ProductionHouses', [
      {name: 'Walt Disney', headquarter: 'Burbank, California', createdAt: new Date(), updatedAt: new Date()}, 
      {name: 'Pixar', headquarter: 'Emmerville, California', createdAt: new Date(), updatedAt: new Date()}, 
      {name: 'Warner Bros', headquarter: 'Lost Angeles, California', createdAt: new Date(), updatedAt: new Date()}, 
      {name: 'Universal Pictures', headquarter: 'Universal City, California', createdAt: new Date(), updatedAt: new Date()}, 
      {name: 'Paramount Pictures', headquarter: 'Los Angeles, California', createdAt: new Date(), updatedAt: new Date()} 
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('ProductionHouses', null, {})
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductionHouses', 
    [
      {
      name_prodHouse: 'Walt Disney',
      headquarters: 'Burbank, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name_prodHouse: 'Pixar',
      headquarters: 'Emeryville, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name_prodHouse: 'Warner Bros',
      headquarters: 'Los Angeles, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name_prodHouse: 'Universal Pictures',
      headquarters: 'Universal City, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name_prodHouse: 'Paramount Pictures',
      headquarters: 'Los Angeles, California, United States',
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
    return queryInterface.bulkDelete('ProductionHouses', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

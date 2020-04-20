'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductionHouses', [{
      prodHouse_name : 'Walt Disney Studios',
      headquarters : 'Burbank, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      prodHouse_name : 'Pixar',
      headquarters : 'Emeryville, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      prodHouse_name : 'Warner Bros',
      headquarters : 'Burbank, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      prodHouse_name : 'Universal Pictures',
      headquarters : 'Universal City, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      prodHouse_name : 'Paramount Pictures',
      headquarters : 'Los Angeles, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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
    return queryInterface.bulkDelete('ProductionHouse', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

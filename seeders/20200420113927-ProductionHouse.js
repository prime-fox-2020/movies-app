'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductionHouses', [
      {
        name_ProdHouse: 'Walt Disney Studios',
        headquarters: "Burbank, California, United States",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_ProdHouse: 'Pixar',
        headquarters: "Emeryville, California, United States",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_ProdHouse: 'Warner Bros',
        headquarters: "Los Angeles, California, United States",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_ProdHouse: 'Universal Pictures',
        headquarters: "Universal City, California, United States",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_ProdHouse: 'Paramount Pictures',
        headquarters: "Los angeles, California, United States",
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductionHouses', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};

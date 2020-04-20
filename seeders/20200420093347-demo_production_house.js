'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    const prodHouse = [
      {
        name_prodHouse: 'Walt Disney Studios',
        headquarters: 'Burbank, Californis, United States',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_prodHouse: 'Pxar',
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
    ]
      return queryInterface.bulkInsert('ProductionHouses', prodHouse, {});
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('ProductionHouses', null, {});
  }
};

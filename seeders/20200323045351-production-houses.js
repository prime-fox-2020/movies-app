'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductionHouses', [{
      nameProdHouse: 'Walt Disney Studios',
      headquarters: 'Burbank, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nameProdHouse: 'Pixar',
      headquarters: 'Emeryville, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nameProdHouse: 'Warner Bros',
      headquarters: 'Los Angeles, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nameProdHouse: 'Universal Pictures',
      headquarters: 'Universal City, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      nameProdHouse: 'Paramount Pictures',
      headquarters: 'Los Angeles, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductionHouses', null, {});
  }
};

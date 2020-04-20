'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductionHouses', [
    {
      name_prodHouse: 'Walt Disney Studio',
      headquarter: 'Burbank, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name_prodHouse: 'Pixar',
      headquarter: 'Emeryville, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name_prodHouse: 'Warner Bros',
      headquarter: 'Los Angeles, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name_prodHouse: 'Universal Pictures',
      headquarter: 'Universal City, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name_prodHouse: 'Paramount Pictures',
      headquarter: 'Los Angeles, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductionHouses', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductionHouses', 
    [
      {
        name_prodHouse: 'Walt Disney Studios',
        headquarters: 'Burbank, California, UnitedStates',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_prodHouse: 'Pixar',
        headquarters: 'Emeryville, California, UnitedStates',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_prodHouse: 'Warner Bros',
        headquarters: 'Los Angeles, California, UnitedStates',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_prodHouse: 'Universal Pictures',
        headquarters: 'Universal City, California, UnitedStates',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_prodHouse: 'Paramaount Pictures',
        headquarters: 'Los Angeles, California, UnitedStates',
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

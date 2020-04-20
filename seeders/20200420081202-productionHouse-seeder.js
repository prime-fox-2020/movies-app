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
    {
      name_prodHouse: 'Walt Disney Studios',
      headquarter: 'Burbank, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name_prodHouse: 'Pixar',
      headquarter: 'Emeryville, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name_prodHouse: 'Warner Bros',
      headquarter: 'Los Angeles, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name_prodHouse: 'Universal Pictures',
      headquarter: 'Universal City, California, United States',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name_prodHouse: 'Paramount Pictures',
      headquarter: 'Los Angeles, California, United States',
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
     return queryInterface.bulkDelete('ProductionHouse', null, {});
    }
};

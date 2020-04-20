'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Movies', [{
      name: 'Harry Potter 2',
      released_year: 2000,
      genre: 'Horor',
      ProductionHouseId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  {
    name: 'Harry Potter3',
    released_year: 2002,
    genre: 'Horor',
    ProductionHouseId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, 
{
  name: 'Avebgers',
  released_year: 2010,
  genre: 'Action',
  ProductionHouseId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
}], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Movies', null, {});
  }
};

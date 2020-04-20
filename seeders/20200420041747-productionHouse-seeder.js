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
   let data = [
     {
      name_prodHouse: "Walt Disney House",
      headquarters: "Burbank, California, United States",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name_prodHouse: "Pixar",
      headquarters: "Emeryville, California, United States",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name_prodHouse: "Warner Bros",
      headquarters: "Los Angeles, California, United States",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name_prodHouse: "Universal Pictures",
      headquarters: "Universal City, California, United States",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      name_prodHouse: "Paramount Pictures",
      headquarters: "Los Angeles, California, United States",
      createdAt: new Date(),
      updatedAt: new Date()
     }
   ]
   return queryInterface.bulkInsert('ProductionHouses', data, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('ProductionHouses', null, {truncate:true, restartIdentity:true}, {})
  }
};

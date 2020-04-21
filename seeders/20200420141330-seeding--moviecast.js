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

      return queryInterface.bulkInsert('MovieCasts', [{
      MovieId:1,
      CastId:1,
      role:'Main',    
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      MovieId:1,
      CastId:2,
      role:'Main',    
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      MovieId:1,
      CastId:3,
      role:'Main',     
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      MovieId:1,
      CastId:1, 
      role:'Protagonis',    
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      MovieId:2,
      CastId:1,
      role:'Antagonis',    
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      MovieId:3,
      CastId:1,
      role:'Stuntman',    
      createdAt:new Date(),
      updatedAt:new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

   return queryInterface.bulkDelete('MovieCasts', null, {});
  }
};

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
   return queryInterface.bulkInsert('Movies', [{
    name: 'Cintaku Kependok Sudoku',
    released_year:'2016',
    genre:'comedy',
    createdAt:new Date(),
    updatedAt:new Date()
  },{
    name: 'Ratapan di depan Mac Mini',
    released_year:'2014',
    genre:'drama',
    createdAt:new Date(),
    updatedAt:new Date()
  },{
    name: 'Boogle 2, The Haunting Anchor',
    released_year:'2011',
    genre:'horror',
    createdAt:new Date(),
    updatedAt:new Date()
  },{
    name: 'Heroku wa Heromu da',
    released_year:'2008',
    genre:'animasi',
    createdAt:new Date(),
    updatedAt:new Date()
  },{
    name: 'Taubat Instruktur Karena Tugas Tak Dibuat',
    released_year:'2000',
    genre:'religi',
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
   return queryInterface.bulkDelete('Movies', null, {});
  }
};

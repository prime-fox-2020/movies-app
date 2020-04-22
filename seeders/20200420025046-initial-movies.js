'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Movies', [
      {
        name: "Cintaku Kepentok Sudoku",
        released_year: "2016",
        genre: "comedy",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Azab Instruktur Karena Mendzalimi Student",
        released_year: "2000",
        genre: "religious",
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: "Mysteri Gedung Aquarius",
        released_year: "1995",
        genre: "horror",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
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
    return queryInterface.bulkDelete('Movies', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

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
      title: DataTypes.STRING,
      released_year: DataTypes.INTEGER,
      genre: DataTypes.STRING,
      ProductionHouseId: DataTypes.INTEGER
    */
    return queryInterface.bulkInsert('Movies', [
      {
        title: 'Cintaku Kepentok Sudoku',
        released_year: 2016,
        genre: 'comedy',
        ProductionHouseId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Ratapan di Depan Mac Mini',
        released_year: 2014,
        genre: 'drama',
        ProductionHouseId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Boogle 2, The Haunting Anchor',
        released_year: 2011,
        genre: 'horror',
        ProductionHouseId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Heroku wa Heromu da',
        released_year: 2008,
        genre: 'animation',
        ProductionHouseId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Taubat Karena Tugas Tak Dibuat',
        released_year: 2000,
        genre: 'religious',
        ProductionHouseId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Movies', null, {})
  }
};

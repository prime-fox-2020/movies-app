'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Movies', 'rating', Sequelize.INTEGER, { after: 'genre' });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Movies', 'rating');
  }
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Movies', 'rating', Sequelize.INTEGER);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Movies', 'rating');
  }
};

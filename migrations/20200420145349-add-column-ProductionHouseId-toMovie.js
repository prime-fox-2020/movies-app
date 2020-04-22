'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Movies', 'ProductionHouseId', Sequelize.INTEGER, { after: 'genre' });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Movies', 'ProductionHouseId');
  }
};

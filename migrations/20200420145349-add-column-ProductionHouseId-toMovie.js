'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn('movies', 'ProductionHouseId', Sequelize.INTEGER, { after: 'genre' });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('movies', 'ProductionHouseId');
  }
};

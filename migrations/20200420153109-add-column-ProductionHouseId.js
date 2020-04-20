'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Movies', 'ProductionHouseId', Sequelize.INTEGER, {
      before: "createdAt"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Movies', 'ProductionHouseId');
  }
};
